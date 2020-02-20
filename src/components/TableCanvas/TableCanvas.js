import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  Fragment
} from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';

import './TableCanvas.scss';
import TableCell from '../TableCell/TableCell';
import TableHeader from '../TableHeader/TableHeader';
import { onClickThunk } from '../../modules/editingdialog';

const ColWrapper = styled.p`
  display: flex;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  margin: 0px;
  cursor: default;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-left: 1px solid black;
  box-sizing: border-box;
`;

const RowWrapper = styled.p`
  display: flex;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  margin: 0px;
  cursor: default;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
  box-sizing: border-box;
  height: auto;
`;


const TableCanvas = ({
  cover,
  cell,
  onClick,
  globalClicked,
  updateGlobalClicked
}) => {
  const dispatch = useDispatch();
  let colCount = 0;
  let rowCount = 0;

  const clickedRef = useRef({
    rows: new Map(),
    cols: new Map(),
    cell: new Set()
  });

  const draggableRef = useRef({
    point: {
      id: null,
      rows: [],
      cols: []
    },
    dragged: false
  });

  const hoveredRef = useRef({
    rows: new Set(),
    cols: new Set()
  });

  const cellRef = useRef(cell);
  const coverRef = useRef(cover);
  const idCacheRef = useRef(null);

  const [, setHovered] = useState(hoveredRef.current);
  const [, setClicked] = useState(clickedRef.current);
  const [, setDraggable] = useState(draggableRef.current);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (globalClicked) {
      clickedRef.current = globalClicked;
      setClicked(clickedRef.current);
    }
  }, [globalClicked]);

  useEffect(() => {
    cellRef.current = cell;
    coverRef.current = cover;
    // clickedRef.current = clicked;
    // console.dir(clickedRef.current);
    // draggableRef.current = draggable;
    // hoveredRef.current = hovered;
    forceUpdate();
  }, [cell, cover, forceUpdate]);

  const onMouseOver = useCallback((e, rows, cols) => {
    hoveredRef.current = {
      rows: new Set(rows),
      cols: new Set(cols)
    };
    setHovered(hoveredRef.current);
  }, []);

  const onMouseLeave = useCallback(() => {
    hoveredRef.current = {
      rows: new Set(),
      cols: new Set()
    };
    setHovered(hoveredRef.current);
  }, []);

  const includeCell = useCallback((rows, cols, id) => {
    setClicked(prevState => {
      const revisedRows = new Map(prevState.rows);
      const revisedCols = new Map(prevState.cols);
      const revisedCell = new Set(prevState.cell);

      rows.forEach(row => {
        if (revisedRows.has(row)) {
          revisedRows.set(row, revisedRows.get(row) + 1);
        } else {
          revisedRows.set(row, 1);
        }
      });

      cols.forEach(col => {
        if (revisedCols.has(col)) {
          revisedCols.set(col, revisedCols.get(col) + 1);
        } else {
          revisedCols.set(col, 1);
        }
      });

      revisedCell.add(id);
      const nextState = {
        rows: revisedRows,
        cols: revisedCols,
        cell: revisedCell
      };

      clickedRef.current = nextState;
      if (updateGlobalClicked) {
        updateGlobalClicked(nextState);
      }

      return clickedRef.current;
    });
  }, [updateGlobalClicked]);

  const excludeCell = useCallback((rows, cols, id) => {
    setClicked(prevState => {
      const revisedRows = new Map(prevState.rows);
      const revisedCols = new Map(prevState.cols);
      const revisedCell = new Set(prevState.cell);
      rows.forEach(row => {
        const diff = revisedRows.get(row) - 1;
        if (diff > 0) {
          revisedRows.set(row, diff);
        } else {
          revisedRows.delete(row);
        }
      });

      cols.forEach(col => {
        const diff = revisedCols.get(col) - 1;
        if (diff > 0) {
          revisedCols.set(col, diff);
        } else {
          revisedCols.delete(col);
        }
      });

      revisedCell.delete(id);
      const nextState = {
        rows: revisedRows,
        cols: revisedCols,
        cell: revisedCell
      };
      clickedRef.current = nextState;

      if (updateGlobalClicked) {
        updateGlobalClicked(nextState);
      }

      return clickedRef.current;
    });
  }, [updateGlobalClicked]);

  const onMouseDown = useCallback((e, rows, cols, id) => {
    draggableRef.current = {
      point: {
        id,
        rows,
        cols
      },
      dragged: true
    };
    setDraggable(draggableRef.current);

    if (e.ctrlKey) {
      if (clickedRef.current.cell.has(id)) {
        excludeCell(rows, cols, id);
      } else {
        includeCell(rows, cols, id);
      }
      return;
    }

    setClicked(() => {
      const mappedRow = new Map();
      const mappedCol = new Map();
      rows.forEach(row => mappedRow.set(row, 1));
      cols.forEach(col => mappedCol.set(col, 1));
      const nextState = {
        rows: mappedRow,
        cols: mappedCol,
        cell: new Set([id])
      };
      clickedRef.current = nextState;
      if (updateGlobalClicked) {
        updateGlobalClicked(nextState);
      }
      return clickedRef.current;
    });
  }, [excludeCell, includeCell, updateGlobalClicked]);

  const cellBundler = useCallback((
    rowsMin,
    rowsMax,
    colsMin,
    colsMax,
    cachedClickedRef
  ) => {
    const beforeSignature = JSON.stringify([...cachedClickedRef.cell]);

    cellRef.current.forEach(cel => {
      const celRowsMin = cel.rows[0];
      const celRowsMax = cel.rows[cel.rows.length - 1];
      const celColsMin = cel.cols[0];
      const celColsMax = cel.cols[cel.cols.length - 1];
      if (
        rowsMin > celRowsMax ||
        rowsMax < celRowsMin ||
        colsMin > celColsMax ||
        colsMax < celColsMin
      ) {
        const { cell, rows, cols } = cachedClickedRef;
        if (cachedClickedRef.cell.has(cel.id)) {
          excludeCell(cel.rows, cel.cols, cel.id);

          //  update cachedClickedRef
          cel.rows.forEach(row => {
            const diff = rows.get(row) - 1;
            if (diff > 0) {
              rows.set(row, diff);
            } else {
              rows.delete(row);
            }
          });

          cel.cols.forEach(col => {
            const diff = cols.get(col) - 1;
            if (diff > 0) {
              cols.set(col, diff);
            } else {
              cols.delete(col);
            }
          });

          cell.delete(cel.id);
        }
      } else {
        const { cell, rows, cols } = cachedClickedRef;
        if (!cachedClickedRef.cell.has(cel.id)) {
          includeCell(cel.rows, cel.cols, cel.id);

          //  update cachedClickedRef
          cel.rows.forEach(row => {
            if (rows.has(row)) {
              rows.set(row, rows.get(row) + 1);
            } else {
              rows.set(row, 1);
            }
          });

          cel.cols.forEach(col => {
            if (cols.has(col)) {
              cols.set(col, cols.get(col) + 1);
            } else {
              cols.set(col, 1);
            }
          });

          cell.add(cel.id);
        }
      }
    });

    const rowsKey = [...cachedClickedRef.rows.keys()].sort((a, b) => a - b);
    const colsKey = [...cachedClickedRef.cols.keys()].sort((a, b) => a - b);
    const afterSignature = JSON.stringify([...cachedClickedRef.cell]);

    if (beforeSignature !== afterSignature) {
      cellBundler(
        rowsKey[0],
        rowsKey[rowsKey.length - 1],
        colsKey[0],
        colsKey[colsKey.length - 1],
        cachedClickedRef
      );
    }
  }, [excludeCell, includeCell]);

  const onMouseMove = useCallback((e, rows, cols, id) => {
    if (
      idCacheRef.current !== id &&
      draggableRef.current.dragged &&
      !e.ctrlKey
    ) {
      idCacheRef.current = id;

      const originRows = draggableRef.current.point.rows;
      const originCols = draggableRef.current.point.cols;
      const rowsMin = Math.min(originRows[0], rows[0]);
      const rowsMax = Math.max(
        originRows[originRows.length - 1],
        rows[rows.length - 1]
      );
      const colsMin = Math.min(originCols[0], cols[0]);
      const colsMax = Math.max(
        originCols[originCols.length - 1],
        cols[cols.length - 1]
      );

      const cachedClickedRef = _.cloneDeep(clickedRef.current);
      cellBundler(rowsMin, rowsMax, colsMin, colsMax, cachedClickedRef);
    }
  }, [cellBundler]);

  const onMouseUp = useCallback(() => {
    draggableRef.current = {
      point: {
        id: null,
        rows: [],
        cols: []
      },
      dragged: false
    };
    setDraggable(draggableRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  });

  const onMouseUpInsideCell = useCallback(
    index => {
      if (clickedRef.current.cell.size === 1) {
        dispatch(
          onClickThunk({
            type: 'cell',
            index
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <div className="TableCanvas">
      <div className="ColHeader">
        {coverRef.current.columnHeader &&
          coverRef.current.columnHeader.map(section => (
            <div
              key={`colHeader_${section.title ? section.title : ''}`}
              className="ColWrapperBetween"
              style={{ width: section.width ? section.width + 'px' : 'auto' }}
            >
              {!section.children ||
                (section.children && section.children.length > 0 && (
                  <ColWrapper 
                    style={section.children ? {} : { borderLeft: '0px' }}
                  >
                    {section.title}
                  </ColWrapper>
                ))}
              {section.children ? (
                <div
                  style={{
                    display: 'flex',
                    height: '50%'
                  }}
                >
                  {section.children.map((col, index) => {
                    let state = 'none';
                    if (clickedRef.current.cols.has(colCount)) {
                      state = 'clicked';
                    } else if (hoveredRef.current.cols.has(colCount)) {
                      state = 'hovered';
                    }
                    return (
                      <TableHeader
                        key={`col_${index}`}
                        col
                        width={col.width + 'px'}
                        index={colCount}
                        onClick={onClick.bind(null, ['column', colCount])}
                        state={state}
                      >
                        col {colCount++}
                      </TableHeader>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}
      </div>
      <div className="CanvasWrapper">
        <div className="RowHeader">
          {coverRef.current.rowHeader &&
            coverRef.current.rowHeader.map(section => (
              <Fragment key={`rowHeader_${section.title ? section.title : ''}`}>
                {!section.children ||
                  (section.children && section.children.length > 0 && (
                    <div
                      className="RowWrapperBetween"
                      style={{
                        height: section.height ? section.height + 'px' : 'auto',
                        width: '120px'
                      }}
                    >
                      <RowWrapper
                        style={rowCount > 0 ? {} : { borderTop: '0px' }}
                      >
                        {section.title}
                      </RowWrapper>
                      {section.children ? (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%'
                          }}
                        >
                          {section.children.map((row, index) => {
                            let state = 'none';
                            if (clickedRef.current.rows.has(rowCount)) {
                              state = 'clicked';
                            } else if (hoveredRef.current.rows.has(rowCount)) {
                              state = 'hovered';
                            }
                            return (
                              <TableHeader
                                key={`row_${index}`}
                                row
                                height={row.height + 'px'}
                                onClick={onClick.bind(null, ['row', rowCount])}
                                index={rowCount}
                                state={state}
                              >
                                row {rowCount++}
                              </TableHeader>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  ))}
              </Fragment>
            ))}
        </div>
        <div className="DivCanvas" onMouseLeave={onMouseLeave}>
          {cellRef.current &&
            cellRef.current.map(div => {
              const width =
                coverRef.current.partialSum.cols[
                  div.cols[div.cols.length - 1] + 1
                ] -
                coverRef.current.partialSum.cols[div.cols[0]] -
                1;

              const height =
                coverRef.current.partialSum.rows[
                  div.rows[div.rows.length - 1] + 1
                ] -
                coverRef.current.partialSum.rows[div.rows[0]] -
                1;

              let state = 'none';
              if (clickedRef.current.cell.has(div.id)) {
                state = 'clicked';
              }

              return (
                <TableCell
                  key={`cell_${div.id}`}
                  top={coverRef.current.partialSum.rows[div.rows[0]]}
                  left={coverRef.current.partialSum.cols[div.cols[0]]}
                  width={width}
                  height={height}
                  state={state}
                  div={div}
                  onMouseOver={e => onMouseOver(e, div.rows, div.cols)}
                  onMouseDown={e => onMouseDown(e, div.rows, div.cols, div.id)}
                  onMouseMove={e => onMouseMove(e, div.rows, div.cols, div.id)}
                  onMouseUp={e => onMouseUpInsideCell(div.id)}
                  cellIndex={div.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TableCanvas;
