import { createAction, handleActions } from 'redux-actions';
import validateSquare from '../lib/validateSquare';
import { cellDefaultOptions } from '../lib/defaultOption';
import { clearProperties } from './editingdialog';
import _ from 'lodash';

const SET_GLOBAL_CLICKED = 'tablecanvas/SET_GLOBAL_CLICKED';
const MERGE_CELL = 'tablecanvas/MERGE_CELL';
const DIVIDE_CELL = 'tablecanvas/DIVIDE_CELL';
const SET_COVER = 'tablecanvas/SET_COVER';
const SET_ROWS = 'tablecanvas/SET_ROWS';
const SET_COLS = 'tablecanvas/SET_COLS';
const SET_PARTIALSUM = 'tablecanvas/SET_PARTIALSUM';

export const setGlobalClicked = createAction(
  SET_GLOBAL_CLICKED,
  payload => payload
);

export const mergeCell = createAction(MERGE_CELL, payload => payload);
export const divideCell = createAction(DIVIDE_CELL, payload => payload);
export const setCover = createAction(SET_COVER, payload => payload);

export const setRows = createAction(SET_ROWS, payload => payload);
export const setCols = createAction(SET_COLS, payload => payload);
export const setPartialSum = createAction(SET_PARTIALSUM, payload => payload);

const SET_VALUE = 'tablecanvas/SET_VALUE';
const SET_CELL = 'tablecanvas/SET_CELL';
const SET_DATABINDING = 'tablecanvas/SET_DATABINDING';
const SET_DATASELECTED = 'tablecanvas/SET_DATASELECTED';
const SET_DATARELOAD = 'tablecanvas/SET_DATARELOAD';
const CLEAR_DATABINDING = 'tablecanvas/CLEAR_DATABINDING';
const CLEAR_ALL = 'tablecanvas/CLEAR_ALL';
export const setValue = createAction(SET_VALUE, payload => payload);
export const setCell = createAction(SET_CELL, payload => payload);
export const setDataBinding = createAction(SET_DATABINDING, payload => payload);
export const setDataSelected = createAction(
  SET_DATASELECTED,
  payload => payload
);
export const setDataReload = createAction(SET_DATARELOAD);
export const clearDataBinding = createAction(CLEAR_DATABINDING);
export const clearAll = createAction(CLEAR_ALL);

/*
  globalClicked (클릭된 cell)
    {
      cell(set),
      cols(map),
      rows(map),
    }
    
  cell (나뉘어 있는 cell의 정보)
    [
      id,
      cols[],
      rows[],
    ]
  
  cover (cols, rows의 정보)
    {
      columnHeader
      [
        {
          title,
          ? width,
          children[],
        },
      ],
      rowHeader
        [
          ...
        ]
      partialSum
        {
          cols[],
          rows[],
        },
    }
*/

export const makeShrinkBody = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover },
    editingdialog: { zoom }
  } = getState();

  const borderHeight = cover.rowHeader[0].children.length;

  let revisedCell = [...cell];
  const revisedCover = { ...cover };
  const revisedCellId = cellId;
  const revisedGlobalClicked = {
    rows: new Map(),
    cols: new Map(),
    cell: new Set()
  };

  revisedCell = revisedCell.filter(cell => cell.rows[0] < borderHeight);
  revisedCover.rowHeader.splice(1, 1);
  const revisedPartialSum = refreshPartialSum({
    ...revisedCover,
    zoom
  });

  dispatch(
    setValue({
      cover: {
        ...revisedCover,
        partialSum: revisedPartialSum
      },
      cell: revisedCell,
      cellId: revisedCellId,
      globalClicked: revisedGlobalClicked
    })
  );
};

export const makeFullBody = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover },
    editingdialog: { zoom }
  } = getState();

  let revisedCellId = cellId;
  let revisedCell = [...cell];
  const revisedCover = { ...cover };

  const headerHeight = cover.rowHeader[0].children.length;

  const bodyCell = revisedCell.map(cel => ({
    ...cel,
    id: ++revisedCellId,
    rows: cel.rows.map(row => row + headerHeight)
  }));

  revisedCell = [...revisedCell, ...bodyCell];
  revisedCover.rowHeader.push({
    ..._.cloneDeep(revisedCover.rowHeader[0]),
    title: 'Body'
  });
  const revisedPartialSum = refreshPartialSum({
    ...revisedCover,
    zoom
  });

  const revisedGlobalClicked = {
    rows: new Map(),
    cols: new Map(),
    cell: new Set()
  };

  dispatch(
    setValue({
      cover: {
        ...revisedCover,
        partialSum: revisedPartialSum
      },
      cell: revisedCell,
      cellId: revisedCellId,
      globalClicked: revisedGlobalClicked
    })
  );
};

// const compareRange = (targetRange, findRange) => {
//   if (
//     findRange[0] <= targetRange[0] &&
//     targetRange[targetRange.length - 1] <= findRange[findRange.length - 1]
//   ) {
//     return true;
//   }
//   return false;
// };

// const deleteCell = (findedCell, revisedCell) =>
//   revisedCell.filter(rCell => findedCell.every(dCell => rCell.id !== dCell));

// const pushCell = (findedCell, revisedCell, headerHeight, revisedCellId) => {
//   const filteredCell = revisedCell.filter(rCell =>
//     findedCell.some(pCell => rCell.id === pCell)
//   );

//   console.dir(revisedCell);
  
//   filteredCell.forEach(cell => {
//     revisedCell.push({
//       ...cell,
//       id: ++revisedCellId,
//       rows: cell.rows.map(val => val + headerHeight)
//     });
//   });

//   return {
//     revisedCell,
//     revisedCellId
//   };
// };

// const findCellByRange = (cell, range) => {
//   const findedCell = [];

//   cell.forEach(cel => {
//     const { cols, rows } = cel;
//     if (compareRange(cols, range.cols) && compareRange(rows, range.rows)) {
//       findedCell.push(cel.id);
//     }
//   });

//   return findedCell;
// };

// const findCellByRangeAndDelete = (revisedCell, targetRange) =>
//   deleteCell(findCellByRange(revisedCell, targetRange), revisedCell);
// const findCellByRangeAndPush = (revisedCell, originRange, headerHeight, revisedCellId) =>
//   pushCell(findCellByRange(revisedCell, originRange), revisedCell, headerHeight, revisedCellId);

// const synchronizeArea = (revisedGlobalClicked, revisedCell, revisedCellId, cover) => {
//   const headerHeight = cover.rowHeader[0].children.length;
//   const originRange = {
//     cols: [...revisedGlobalClicked.cols.keys()].sort((a, b) => a - b),
//     rows: [...revisedGlobalClicked.rows.keys()].sort((a, b) => a - b)
//   };
//   const targetRange = {
//     cols: [...revisedGlobalClicked.cols.keys()].sort((a, b) => a - b),
//     rows: [...revisedGlobalClicked.rows.keys()]
//       .sort((a, b) => a - b)
//       .map(val => val + headerHeight)
//   };

//   revisedCell = findCellByRangeAndDelete(revisedCell, targetRange);
//   const result = findCellByRangeAndPush(revisedCell, originRange, headerHeight, revisedCellId);
  
//   return result;
// };

export const mergeCellThunk = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover, globalClicked },
  } = getState();

  const revisedGlobalClicked = { ...globalClicked };
  let revisedCell = [...cell];
  let revisedCellId = cellId;
  if (
    revisedGlobalClicked &&
    validateSquare(revisedGlobalClicked, revisedCell, cover)
  ) {
    revisedGlobalClicked.cell.forEach(id => {
      const index = revisedCell.findIndex(element => element.id === id);
      if (index >= 0) revisedCell.splice(index, 1);
    });

    revisedCell.push({
      id: ++revisedCellId,
      cols: [...revisedGlobalClicked.cols.keys()].sort((a, b) => a - b),
      rows: [...revisedGlobalClicked.rows.keys()].sort((a, b) => a - b),
      ...cellDefaultOptions
    });

    revisedGlobalClicked.cell = new Set([revisedCellId]);

    // if (headerOnly) {

    // } else {
    //   //  synchronize header & body
    //   ({ revisedCell, revisedCellId } = synchronizeArea(revisedGlobalClicked, revisedCell, revisedCellId, cover));
    // }

    dispatch(
      mergeCell({
        cell: revisedCell,
        cellId: revisedCellId,
        globalClicked: revisedGlobalClicked
      })
    );

    dispatch(clearProperties());

    return;
  }

  console.dir('mergeCell Error');
  return;
};

export const divideCellThunk = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, globalClicked },
  } = getState();

  let genArr = [];
  const revisedGlobalClicked = { ...globalClicked };
  let revisedCell = [...cell];
  let revisedCellId = cellId;

  revisedGlobalClicked.cell.forEach(id => {
    const index = revisedCell.findIndex(element => {
      if (element.id === id) {
        element.rows.forEach(row => {
          element.cols.forEach(col => {
            genArr.push({
              id: ++revisedCellId,
              cols: [col],
              rows: [row],
              ...cellDefaultOptions
            });
          });
        });

        return true;
      }
      return false;
    });

    if (index >= 0) revisedCell.splice(index, 1);
  });

  revisedGlobalClicked.cell = new Set([...genArr.map(genObj => genObj.id)]);
  revisedCell = [...revisedCell, ...genArr];

  // if(headerOnly) {
    
  // } else {
  //   //  synchronize header & body
  //   ({ revisedCell, revisedCellId } = synchronizeArea(revisedGlobalClicked, revisedCell, revisedCellId, cover));
  // }

  dispatch(
    divideCell({
      cell: revisedCell,
      cellId: revisedCellId,
      globalClicked: revisedGlobalClicked
    })
  );

  dispatch(clearProperties());
};

const getPartialSum = (zoom, arr, type) => {
  let sum = 0;
  let flattedArr = arr
    .flatMap(obj => {
      if (!obj.children) return [];
      return obj.children.map(child => child[type]);
    })
    .reduce((acc, cur) => {
      acc.push(sum + parseInt(parseInt(cur) * zoom));
      sum += parseInt(parseInt(cur) * zoom);
      return acc;
    }, []);

  if (type === 'height') {
    flattedArr = flattedArr.map(cel => cel + 1);
  }
  flattedArr.splice(0, 0, 0);

  return flattedArr;
};

export const refreshPartialSum = ({ columnHeader, rowHeader, zoom = 1 }) => {
  return {
    cols: getPartialSum(zoom, columnHeader, 'width'),
    rows: getPartialSum(zoom, rowHeader, 'height')
  };
};

const getRequired = (kind, cover, globalClicked) => {
  const arr = [...globalClicked[kind].keys()].sort((a, b) => a - b);
  const header =
    kind === 'cols'
      ? cover.columnHeader
      : kind === 'rows'
      ? cover.rowHeader
      : null;
  const unit = kind === 'cols' ? 'width' : kind === 'rows' ? 'height' : null;

  let prev = -100,
    surplus;
  let required = [];

  //  globalClicked중에 이어져 있는 [kind] 탐색
  arr.forEach(val => {
    if (prev < 0 || prev + surplus !== val) {
      if (prev >= 0) {
        required.push({
          prev,
          surplus
        });
      }

      prev = val;
      surplus = 1;
    } else {
      ++surplus;
    }
  });

  if (prev >= 0) {
    required.push({
      prev,
      surplus
    });
  }

  let popIndex = 0;
  let valIndex = 0;
  let sum = 0;

  header.forEach(obj => {
    if (!obj.children) {
      return obj;
    }

    obj.children.forEach(child => {
      if (popIndex < required.length) {
        const { prev, surplus } = required[popIndex];
        if (prev <= valIndex && prev + surplus > valIndex) {
          sum += parseInt(child[unit] - Math.floor(child[unit] / 2));
          if (prev + surplus === valIndex + 1) {
            required[popIndex] = {
              ...required[popIndex],
              sum
            };

            sum = 0;
            ++popIndex;
          }
        }
      }
      ++valIndex;
    });
  });

  return required;
};

const delCover = (kind, cover, required) => {
  const header =
    kind === 'cols'
      ? cover.columnHeader
      : kind === 'rows'
      ? cover.rowHeader
      : null;

  let popIndex = 0;
  let valIndex = -1;

  return header.map(obj => {
    if (!obj.children) {
      return obj;
    }
    return {
      ...obj,
      children: obj.children.filter(child => {
        ++valIndex;
        if (popIndex < required.length) {
          const { prev, surplus } = required[popIndex];
          if (prev + surplus === valIndex + 1) {
            ++popIndex;
          }
          if (prev <= valIndex && prev + surplus > valIndex) {
            return false;
          }
        }
        return true;
      })
    };
  });
};

const addCover = (kind, cover, required) => {
  const header =
    kind === 'cols'
      ? cover.columnHeader
      : kind === 'rows'
      ? cover.rowHeader
      : null;
  const unit = kind === 'cols' ? 'width' : kind === 'rows' ? 'height' : null;

  let popIndex = 0;
  let valIndex = -1;
  return header.map(obj => {
    if (!obj.children) {
      return obj;
    }

    return {
      ...obj,
      children: obj.children.flatMap(child => {
        ++valIndex;

        if (popIndex < required.length) {
          const { prev, surplus } = required[popIndex];
          if (prev + surplus === valIndex + 1) {
            ++popIndex;
          }

          if (prev <= valIndex && prev + surplus > valIndex) {
            if (prev === valIndex) {
              let surplusArr = [];
              for (let i = 0; i < surplus - 1; ++i) {
                surplusArr.push({
                  // [unit]: Math.floor(sum / surplus)
                  [unit]: '50'
                });
              }
              surplusArr.push({
                // [unit]: sum - ((surplus-1) * Math.floor(sum / surplus)),
                [unit]: '50'
              });

              // return [ ...surplusArr, { [unit]: Math.floor(child[unit] / 2) } ];
              return [...surplusArr, child];
            }

            return child;
            // return { [unit]: Math.floor(child[unit] / 2) };
          } else {
            return child;
          }
        } else {
          return child;
        }
      })
    };
  });
};

const addCell = (kind, cell, cellId, required) => {
  let revisedCell = [...cell];

  let acc = 0;
  required.forEach(req => {
    let { prev, surplus } = req;
    prev += acc;
    acc += surplus;

    //  move location
    revisedCell = revisedCell.map(cel => {
      const vals = cel[kind];
      let sIndex = vals[0];
      let eIndex = vals[vals.length - 1];
      if (sIndex <= prev - 1 && prev <= eIndex) {
        //  merged cell
        const revisedVal = [...cel[kind]];
        for (let i = 0; i < surplus; ++i) {
          revisedVal.push(eIndex + i + 1);
        }

        return {
          ...cel,
          [kind]: revisedVal
        };
      } else {
        //  normal cell
        if (eIndex < prev) {
          return cel;
        }
        if (sIndex >= prev) {
          const revisedVal = cel[kind].map(val => val + surplus);
          return {
            ...cel,
            [kind]: revisedVal
          };
        }

        console.dir('irregular');
        return cel;
      }
    });
  });

  //  fill the empty cell
  let rowSize = -1,
    colSize = -1;
  revisedCell.forEach(cel => {
    rowSize = Math.max(rowSize, cel.rows[cel.rows.length - 1] + 1);
    colSize = Math.max(colSize, cel.cols[cel.cols.length - 1] + 1);
  });

  const visitied = [];
  for (let i = 0; i < rowSize; ++i) {
    visitied.push([]);
  }

  revisedCell.forEach(cel => {
    cel.rows.forEach(row => {
      cel.cols.forEach(col => {
        visitied[row][col] = true;
      });
    });
  });

  for (let i = 0; i < rowSize; ++i) {
    for (let j = 0; j < colSize; ++j) {
      if (!visitied[i][j]) {
        revisedCell.push({
          id: ++cellId,
          rows: [i],
          cols: [j],
          ...cellDefaultOptions
        });
      }
    }
  }

  return {
    revisedCell,
    revisedCellId: cellId
  };
};

const delCell = (kind, cell, required) => {
  let revisedCell = [...cell];

  let acc = 0;
  required.forEach(req => {
    let { prev, surplus } = req;
    prev += acc;
    acc -= surplus;

    //  delete cell && move location
    revisedCell = revisedCell
      .map(cel => {
        cel[kind] = cel[kind]
          .filter(val => {
            return !(prev <= val && val < prev + surplus);
          })
          .map(val => {
            if (prev + surplus <= val) {
              return val - surplus;
            }
            return val;
          });
        return cel;
      })
      .filter(cel => cel[kind].length > 0);
  });

  return revisedCell;
};

// const clearGlobalClicked = () => {

// }

const refreshGlobalClicked = (revisedCell, globalClicked) => {
  let revisedGlobalClicked = { ...globalClicked };
  const cellMap = new Map();
  revisedCell.forEach(cel => {
    cellMap.set(cel.id, cel);
  });
  const rowMap = new Map();
  const colMap = new Map();
  [...revisedGlobalClicked.cell].forEach(id => {
    const { rows, cols } = cellMap.get(id);
    rows.forEach(row => {
      if (rowMap.has(row)) {
        rowMap.set(row, rowMap.get(row) + 1);
      } else {
        rowMap.set(row, 1);
      }
    });

    cols.forEach(col => {
      if (colMap.has(col)) {
        colMap.set(col, colMap.get(col) + 1);
      } else {
        colMap.set(col, 1);
      }
    });
  });

  revisedGlobalClicked = {
    ...revisedGlobalClicked,
    rows: rowMap,
    cols: colMap
  };
  return revisedGlobalClicked;
};

export const addColsThunk = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover, globalClicked },
    editingdialog: { zoom }
  } = getState();
  const kind = 'cols';

  const required = getRequired(kind, cover, globalClicked);

  const revisedCover = {
    ...cover,
    columnHeader: addCover(kind, cover, required)
  };

  const { revisedCell, revisedCellId } = addCell(kind, cell, cellId, required);
  const revisedGlobalClicked = refreshGlobalClicked(revisedCell, globalClicked);
  const revisedPartialSum = refreshPartialSum({
    ...revisedCover,
    zoom
  });

  dispatch(
    setValue({
      cover: {
        ...revisedCover,
        partialSum: revisedPartialSum
      },
      cell: revisedCell,
      cellId: revisedCellId,
      globalClicked: revisedGlobalClicked
    })
  );
};

export const addRowsThunk = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover, globalClicked },
    editingdialog: { zoom },

  } = getState();
  const kind = 'rows';

  const required = getRequired(kind, cover, globalClicked);

  const revisedCover = {
    ...cover,
    rowHeader: addCover(kind, cover, required)
  };

  const { revisedCell, revisedCellId } = addCell(kind, cell, cellId, required);

  const revisedGlobalClicked = refreshGlobalClicked(revisedCell, globalClicked);
  const revisedPartialSum = refreshPartialSum({
    ...revisedCover,
    zoom
  });

  dispatch(
    setValue({
      cover: {
        ...revisedCover,
        partialSum: revisedPartialSum
      },
      cell: revisedCell,
      cellId: revisedCellId,
      globalClicked: revisedGlobalClicked
    })
  );

  // if(headerOnly) {

  // } else {
  //   dispatch(makeShrinkBody());
  //   dispatch(makeFullBody());
  //   dispatch(setValue({ globalClicked: revisedGlobalClicked }));
  // }
};

export const delColsThunk = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover, globalClicked },
    editingdialog: { zoom }
  } = getState();
  const kind = 'cols';

  const required = getRequired(kind, cover, globalClicked);

  const revisedCover = {
    ...cover,
    columnHeader: delCover(kind, cover, required)
  };

  const revisedCell = delCell(kind, cell, required);
  const revisedGlobalClicked = {
    rows: new Map(),
    cols: new Map(),
    cell: new Set()
  };
  const revisedPartialSum = refreshPartialSum({
    ...revisedCover,
    zoom
  });

  dispatch(
    setValue({
      cover: {
        ...revisedCover,
        partialSum: revisedPartialSum
      },
      cell: revisedCell,
      cellId,
      globalClicked: revisedGlobalClicked
    })
  );
};

export const delRowsThunk = () => (dispatch, getState) => {
  const {
    tablecanvas: { cell, cellId, cover, globalClicked },
    editingdialog: { zoom }
  } = getState();
  const kind = 'rows';

  const required = getRequired(kind, cover, globalClicked);

  const revisedCover = {
    ...cover,
    rowHeader: delCover(kind, cover, required)
  };

  const revisedCell = delCell(kind, cell, required);
  const revisedGlobalClicked = {
    rows: new Map(),
    cols: new Map(),
    cell: new Set()
  };
  const revisedPartialSum = refreshPartialSum({
    ...revisedCover,
    zoom
  });

  dispatch(
    setValue({
      cover: {
        ...revisedCover,
        partialSum: revisedPartialSum
      },
      cell: revisedCell,
      cellId,
      globalClicked: revisedGlobalClicked
    })
  );
};

const coverColumnHeader = [
  {
    title: '',
    width: '120'
  },
  {
    title: 'Left',
    children: [
      {
        width: '103'
      },
      {
        width: '103'
      }
    ]
  },
  {
    title: 'Body',
    children: [
      {
        width: '148'
      }
    ]
  }
];

const coverRowHeader = [
  {
    title: 'Body',
    children: [
      {
        height: '119'
      },
      {
        height: '120'
      }
    ]
  },
  {
    title: 'Summary',
    children: [
      {
        height: '99'
      }
    ]
  }
];

//  default PartialSum
// cols: [0, 103, 206, 354],
// rows: [0, 120, 240, 339]

const initialState = {
  cover: {
    columnHeader: coverColumnHeader,
    rowHeader: coverRowHeader,
    partialSum: refreshPartialSum({
      columnHeader: coverColumnHeader,
      rowHeader: coverRowHeader
    })
  },
  cellId: 8,
  cell: [
    {
      id: 0,
      cols: [0],
      rows: [0]
    },
    {
      id: 1,
      cols: [1],
      rows: [0]
    },
    {
      id: 2,
      cols: [2],
      rows: [0]
    },
    {
      id: 3,
      cols: [0],
      rows: [1]
    },
    {
      id: 4,
      cols: [1],
      rows: [1]
    },
    {
      id: 5,
      cols: [2],
      rows: [1]
    },
    {
      id: 6,
      cols: [0],
      rows: [2]
    },
    {
      id: 7,
      cols: [1],
      rows: [2]
    },
    {
      id: 8,
      cols: [2],
      rows: [2]
    }
  ],
  dataBinding: null,
  dataSelected: null,
  dataReload: 0
};

const tablecanvas = handleActions(
  {
    [SET_GLOBAL_CLICKED]: (state, { payload: globalClicked }) => ({
      ...state,
      globalClicked
      // globalClicked: {
      //   rows: new Map([{'a' : 1}]),
      //   cols: new Map([{'b' : 1}]),
      //   cell: new Set([7,8,9])
      // }
      // globalClicked: {
      //   rows: new Map(globalClicked.rows),
      //   cols: new Map(globalClicked.cols),
      //   cell: new Set(globalClicked.cell)
      // }
    }),
    [MERGE_CELL]: (state, { payload: { cell, cellId, globalClicked } }) => ({
      ...state,
      cell,
      cellId,
      globalClicked
    }),
    [DIVIDE_CELL]: (state, { payload: { cell, cellId, globalClicked } }) => ({
      ...state,
      cell,
      cellId,
      globalClicked
    }),
    [SET_CELL]: (state, { payload: { cell } }) => ({
      ...state,
      cell
    }),
    [SET_COLS]: (state, { payload: { cols } }) => ({
      ...state,
      cover: {
        ...state.cover,
        columnHeader: cols
      }
    }),
    [SET_ROWS]: (state, { payload: { rows } }) => ({
      ...state,
      cover: {
        ...state.cover,
        rowHeader: rows
      }
    }),
    [SET_PARTIALSUM]: (state, { payload: { partialSum } }) => ({
      ...state,
      cover: {
        ...state.cover,
        partialSum
      }
    }),
    [SET_COVER]: (state, { payload: { cover } }) => ({
      ...state,
      cover
    }),
    [SET_DATABINDING]: (state, { payload: { dataBinding } }) => ({
      ...state,
      dataBinding
    }),
    [SET_DATASELECTED]: (state, { payload: { dataSelected } }) => ({
      ...state,
      dataSelected
    }),
    [SET_DATARELOAD]: state => ({
      ...state,
      dataReload: state.dataReload + 1
    }),
    [SET_VALUE]: (
      state,
      { payload: { cover, cell, cellId, globalClicked } }
    ) => ({
      ...state,
      cover: cover ? cover : state.cover,
      cell: cell ? cell: state.cell,
      cellId: cellId ? cellId : state.cellId,
      globalClicked: globalClicked ? globalClicked : state.globalClicked,
    }),
    [CLEAR_DATABINDING]: state => ({
      ...state,
      dataBinding: {}
    }),
    [CLEAR_ALL]: state => initialState
  },
  initialState
);

export default tablecanvas;
