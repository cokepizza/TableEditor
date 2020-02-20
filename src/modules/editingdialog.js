import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

import { setCover, setCell, refreshPartialSum } from './tablecanvas';
import { filter } from '../lib/filter';

export const parentList = {
  width: 'none',
  height: 'none',
  checkbox: 'none'
};

const typeList = {
  width: 'input',
  height: 'input',
  checkbox: 'selectbox'
};

const paramList = {
  checkbox: ['true', 'false']
};

export const makePropertyObjects = obj =>
  Object.keys(obj).reduce((acc, cur) => {
    const parent = parentList[cur];

    if (!acc[parent]) {
      acc[parent] = {
        name: parent,
        visible: true,
        checked: parent === 'none' ? true : false
      };
      acc[parent].traits = [];
    }

    acc[parent].traits.push({
      name: cur,
      type: typeList[cur],
      value: obj[cur],
      param: paramList[cur]
    });

    return acc;
  }, {});

const MENU_TOGGLE = 'editingdialog/MENU_TOGGLE';
const PROPERTY_CLICK = 'editingdialog/PROPERTY_CLICK';
const INIT_PROPERTIES = 'editingdialog/INIT_PROPERTIES';
const SET_PROPERTIES = 'editingdialog/SET_PROPERTIES';
const CLEAR_PROPERTIES = 'editingdialog/CLEAR_PROPERTIES';
const HEADERONLY_TOGGLE = 'editingdialog/HEADERONLY_TOGGLE';
const CLEAR_ALL = 'editingdialog/CLEAR_ALL';
export const menuToggle = createAction(MENU_TOGGLE, requestType => requestType);
export const propertyClick = createAction(PROPERTY_CLICK, selected => selected);
export const initProperties = createAction(INIT_PROPERTIES, payload => payload);
export const setProperties = createAction(SET_PROPERTIES, payload => payload);
export const clearProperties = createAction(
  CLEAR_PROPERTIES,
  payload => payload
);
export const headerOnlyToggle = createAction(HEADERONLY_TOGGLE);
export const clearAll = createAction(CLEAR_ALL);

export const propertyFilterThunk = ({ value }) => (dispatch, getState) => {
  const {
    editingdialog: { properties }
  } = getState();

  let revisedProperties = { ...properties };
  revisedProperties = Object.keys(revisedProperties).reduce((acc, cur) => {
    const visible = cur.toLowerCase().indexOf(value.toLowerCase()) === 0;
    if (visible === cur.visible) {
      // stay reference
      return (acc = {
        ...acc,
        [cur]: revisedProperties[cur]
      });
    } else {
      return (acc = {
        ...acc,
        [cur]: {
          ...revisedProperties[cur],
          visible
        }
      });
    }
  }, {});

  dispatch(
    setProperties({
      properties: revisedProperties
    })
  );
};

const setCoverModel = ({ arr, index, value, name }) => {
  let count = 0;
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; ++i) {
    const bundle = arr[i];
    if (bundle.children) {
      const bundlelength = bundle.children.length;
      if (count + bundlelength < index + 1) {
        count += bundlelength;
      } else {
        bundle.children[index - count] = {
          ...bundle.children[index - count],
          [name]: value
        };
        return;
      }
    }
  }
};

const getCoverModel = ({ arr, index }) => {
  let count = 0;
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; ++i) {
    const bundle = arr[i];
    if (bundle.children) {
      const bundlelength = bundle.children.length;
      if (count + bundlelength < index + 1) {
        count += bundlelength;
      } else {
        return bundle.children[index - count];
      }
    }
  }
  return {};
};

export const onClickThunk = ({ type, index }) => (dispatch, getState) => {
  const {
    tablecanvas: { cover, cell, globalClicked }
  } = getState();
  let model = {};
  if (type === 'column') {
    model = filter({
      filterRule: new Set(['width']),
      target: getCoverModel({ arr: cover.columnHeader, index }),
      include: true
    });
  } else if (type === 'row') {
    model = filter({
      filterRule: new Set(['height']),
      target: getCoverModel({ arr: cover.rowHeader, index }),
      include: true
    });
  } else if (type === 'cell') {
    const targetId = [...globalClicked.cell][0];
    const target = cell.find(cell => cell.id === targetId);
    model = filter({
      filterRule: new Set(['id', 'cols', 'rows']),
      target,
      include: false
    });
  }

  const properties = makePropertyObjects(model);
  console.dir(properties);
  dispatch(
    initProperties({
      properties,
      type,
      index
    })
  );
};

export const onChangeThunk = ({ value, name }) => (dispatch, getState) => {
  const {
    editingdialog: { properties }
  } = getState();

  const revisedProperties = { ...properties };
  const parent = parentList[name];
  console.dir(revisedProperties);
  console.dir(revisedProperties[parent]);

  const propIndex = revisedProperties[parent].traits.findIndex(
    obj => obj.name === name
  );
  revisedProperties[parent].traits[propIndex] = {
    ...revisedProperties[parent].traits[propIndex],
    value
  };

  dispatch(
    setProperties({
      properties: revisedProperties
    })
  );
};

export const onSubmitThunk = ({ value, name }) => (dispatch, getState) => {
  const {
    tablecanvas: { cover, cell },
    editingdialog: { selected }
  } = getState();

  console.dir(cover);
  const revisedCover = { ...cover };

  const { type, index } = selected;
  if (type === 'column') {
    setCoverModel({ arr: revisedCover.columnHeader, index, name, value });
    dispatch(
      setCover({
        cover: {
          ...revisedCover,
          partialSum: refreshPartialSum({
            columnHeader: revisedCover.columnHeader,
            rowHeader: revisedCover.rowHeader
          })
        }
      })
    );
  } else if (type === 'row') {
    setCoverModel({ arr: revisedCover.rowHeader, index, name, value });
    dispatch(
      setCover({
        cover: {
          ...revisedCover,
          partialSum: refreshPartialSum({
            columnHeader: revisedCover.columnHeader,
            rowHeader: revisedCover.rowHeader
          })
        }
      })
    );
  } else if (type === 'cell') {
    const revisedCell = [...cell];
    const targetIndex = revisedCell.findIndex(cel => cel.id === index);
    const target = revisedCell[targetIndex];
    revisedCell.splice(targetIndex, 1, {
      ...target,
      [name]: value
    });

    dispatch(
      setCell({
        cell: revisedCell
      })
    );
  }
};

const menu = {
  Inform: {
    side: 'left',
    checked: false,
    concrete: false
  },
  Contents: {
    sider: 'center',
    checked: true,
    concrete: true
  },
  Properties: {
    side: 'right',
    checked: false,
    concrete: false
  },
  DataBinding: {
    side: 'right',
    checked: false,
    concrete: false
  }
};

const actionIcon = [false, false, false, false];

const initialState = {
  menu,
  properties: null,
  selected: {
    type: null,
    index: null
  },
  actionIcon,
  headerOnly: false
};

const editingdialog = handleActions(
  {
    [MENU_TOGGLE]: (state, action) =>
      produce(state, draft => {
        draft.menu[action.payload]['checked'] =
          draft.menu[action.payload]['concrete'] ||
          !draft.menu[action.payload]['checked'];
      }),
    // [PROPERTY_FILTER]: (state, { payload }) =>
    //   produce(state, draft => {
    //     draft.properties = Object.keys(draft.properties).reduce((acc, cur) => {
    //       const visible = cur.toLowerCase().indexOf(payload.toLowerCase()) === 0;
    //       return acc = {
    //         ...acc,
    //         [cur]: {
    //           ...draft.properties[cur],
    //           visible,
    //         }
    //       }
    //     }, {});
    //   }),
    [PROPERTY_CLICK]: (state, { payload }) => {
      console.dir(payload);
      return {
        ...state,
        properties: {
          ...state.properties,
          [payload]: {
            ...state.properties[payload],
            checked: !state.properties[payload]['checked']
          }
        }
      };
    },
    [INIT_PROPERTIES]: (state, { payload: { properties, type, index } }) => ({
      ...state,
      properties,
      selected: {
        type,
        index
      }
    }),
    [SET_PROPERTIES]: (state, { payload: { properties } }) => ({
      ...state,
      properties
    }),
    [CLEAR_PROPERTIES]: state => ({
      ...state,
      properties: initialState.properties,
      selected: initialState.selected
    }),
    [HEADERONLY_TOGGLE]: state => ({
      ...state,
      headerOnly: !state.headerOnly
    }),
    [CLEAR_ALL]: state => initialState
  },
  initialState
);

export default editingdialog;
