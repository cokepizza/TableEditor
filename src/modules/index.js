import { combineReducers } from 'redux';
import helpbox from './helpbox';
import tablecanvas from './tablecanvas';
import editingdialog from './editingdialog';

const rootReducer = combineReducers({
  editingdialog,
  helpbox,
  tablecanvas
});

export default rootReducer;
