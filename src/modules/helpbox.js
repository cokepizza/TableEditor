import { createAction, handleActions } from 'redux-actions';

const TEXT_WRITE = '/helpbox/TEXT_WRITE';
const TEXT_ERASE = '/helpbox/TEXT_ERASE';

export const textWrite = createAction(TEXT_WRITE, contents => contents);
export const textErase = createAction(TEXT_ERASE);

const helpText = {
  width:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  height:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  Misc:
    'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  Position:
    'It has survived not only five centuries, but also the leap into electronic typesetting,',
  Style:
    'remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
  Accessibility:
    'and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  TableCalendar:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
};

const initialState = {
  text: ''
};

const helpbox = handleActions(
  {
    [TEXT_WRITE]: (state, action) => ({
      ...state,
      text: helpText[action.payload]
    }),
    [TEXT_ERASE]: (state, action) => ({
      ...state,
      text: ''
    })
  },
  initialState
);

export default helpbox;
