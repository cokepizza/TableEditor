import { refreshPartialSum } from '../modules/tablecanvas';
import { filter } from './filter';
import { cellDefaultOptions } from './defaultOption';
import _ from 'lodash';

const coverPush = ({ target, origin, title, targetKey, originKey }) => {
  target.push({
    title,
    children: Object.values(origin).map(val => ({
      [targetKey]: parseInt(
        val[originKey].substring(0, val[originKey].length - 2)
      )
    }))
  });
};

export const loader = obj => {
  //  columns로 변경 됨
  const { headerSet, columns, bodySet } = obj;

  let initCellId = -1;
  const initCover = {};

  initCover.columnHeader = [];
  initCover.rowHeader = [];
  initCover.columnHeader.push({
    title: '',
    width: 120
  });

  coverPush({
    title: 'Header',
    target: initCover.columnHeader,
    origin: columns,
    targetKey: 'width',
    originKey: 'width'
  });

  coverPush({
    title: 'Header',
    target: initCover.rowHeader,
    origin: headerSet,
    targetKey: 'height',
    originKey: 'rowHeight'
  });

  coverPush({
    title: 'Body',
    target: initCover.rowHeader,
    origin: bodySet,
    targetKey: 'height',
    originKey: 'rowHeight'
  });

  initCover.partialSum = refreshPartialSum(initCover);

  const visitied = [];
  const colLength = columns.length;
  const compoundSet = [...headerSet, ...bodySet];
  const rowLength = compoundSet.length;

  for (let i = 0; i < rowLength; ++i) {
    visitied.push([]);
  }

  const initCell = compoundSet.flatMap((row, rowIndex) => {
    const arr = row.header ? row.header : row.body;
    return arr
      .map(cell => {
        cell.colspan = cell.colspan ? cell.colspan : 1;
        cell.rowspan = cell.rowspan ? cell.rowspan : 1;

        const pushCols = [];
        const pushRows = [];

        let colIndex;
        for (colIndex = 0; colIndex < colLength; ++colIndex) {
          if (!visitied[rowIndex][colIndex]) break;
        }

        if (colIndex === colLength) return null;

        for (let i = colIndex; i < colIndex + cell.colspan; ++i) {
          pushCols.push(i);
        }
        for (let i = rowIndex; i < rowIndex + cell.rowspan; ++i) {
          pushRows.push(i);
        }

        for (let i = rowIndex; i < rowIndex + cell.rowspan; ++i) {
          for (let j = colIndex; j < colIndex + cell.colspan; ++j) {
            visitied[i][j] = true;
          }
        }

        const filteredCell = filter({
          filterRule: new Set(['colspan', 'rowspan', 'id']),
          target: cell,
          include: false
        });

        return {
          id: ++initCellId,
          cols: pushCols,
          rows: pushRows,
          _id: cell.id,
          ...cellDefaultOptions,
          ...filteredCell
        };
      })
      .filter(cell => cell !== null);
  });

  return {
    initCell,
    initCellId,
    initCover
  };
};

export const unloader = ({ cover, cell, headerOnly }) => {
  if (headerOnly) {
    const headerHeight = cover.rowHeader[0].children.length;
    const bodyCell = cell.map(cel => ({
      ...cel,
      id: 0,
      rows: cel.rows.map(row => row + headerHeight)
    }));

    cell = [...cell, ...bodyCell];
    cover.rowHeader.push({
      ..._.cloneDeep(cover.rowHeader[0]),
      title: 'Body'
    });
  }

  const getLength = arr =>
    arr
      .filter(row => row.children)
      .flatMap(row =>
        row.children.map(cell =>
          cell.height
            ? { height: cell.height + 'px' }
            : { width: cell.width + 'px' }
        )
      );

  // const getSize = arr =>
  //   arr.reduce((acc, cur) => (acc + (cur.children ? cur.children.length : 0)), 0);

  // const height = getSize(cover.rowHeader);
  // const width = getSize(cover.columnHeader);

  // console.dir(height);
  // console.dir(width);

  const compoundHeight = getLength(cover.rowHeader);
  const compoundWidth = getLength(cover.columnHeader);

  console.dir(compoundHeight);
  console.dir(compoundWidth);

  const headerHeight = cover.rowHeader[0].children.length;
  const bodyHeight = cover.rowHeader[1].children.length;

  console.dir(headerHeight);
  console.dir(bodyHeight);

  console.dir(compoundWidth);

  const headerSet = [];
  for (let i = 0; i < headerHeight; ++i) {
    headerSet.push({
      header: [],
      rowHeight: Object.values(compoundHeight[i])[0]
    });
  }

  const bodySet = [];
  for (let i = headerHeight; i < headerHeight + bodyHeight; ++i) {
    bodySet.push({
      body: [],
      rowHeight: Object.values(compoundHeight[i])[0]
    });
  }

  const revisedCell = [...cell];
  revisedCell.sort((a, b) => {
    if (a.rows[0] === b.rows[0]) {
      return a.cols[0] - b.cols[0];
    } else {
      return a.rows[0] - b.rows[0];
    }
  });

  revisedCell.forEach(cell => {
    const colspan = cell.cols.length;
    const rowspan = cell.rows.length;
    const rowIndex = cell.rows[0];
    const filteredCell = filter({
      filterRule: new Set(['rows', 'cols', 'id']),
      target: cell,
      include: false
    });

    if (filteredCell._id) {
      filteredCell.id = filteredCell._id;
      delete filteredCell._id;
    }

    if (rowIndex < headerHeight) {
      headerSet[rowIndex].header.push({
        colspan,
        rowspan,
        ...filteredCell
      });
    } else if (
      headerHeight <= rowIndex &&
      rowIndex < headerHeight + bodyHeight
    ) {
      bodySet[rowIndex - headerHeight].body.push({
        colspan,
        rowspan,
        ...filteredCell
      });
    }
  });

  return {
    columns: compoundWidth,
    headerSet,
    bodySet
  };
};
