import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/index';
import ReduxThunk from 'redux-thunk';
import ModalBackgroundContainer from './containers/ModalBackgroundContainer';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
);

// export default (target, external) => {
//     ReactDom.render(
//         <Provider store={store}>
//             <ModalBackgroundContainer {...external} />,
//         </Provider>,
//         target,
//     );
// };

const external = {
    tableConfig: {
        cell: [
            {
                id: 0,
                cols: [0, 1, 2],
                rows: [0],
            },
            {
                id: 1,
                cols: [0],
                rows: [1],
            },
            {
                id: 2,
                cols: [1],
                rows: [1],
            },
            {
                id: 3,
                cols: [2],
                rows: [1],
            },
            {
                id: 4,
                cols: [0, 1],
                rows: [2],
            },
            {
                id: 5,
                cols: [2],
                rows: [2],
            },
            {
                id: 6,
                cols: [0, 1, 2],
                rows: [3, 4, 5],
            },
            
        ],
        cover: {
            rowHeader: [
                {
                    title: 'Header',
                    children: [
                        { height: 80 },
                        { height: 80 },
                        { height: 80 },
                    ],
                },
                {
                    title: 'Body',
                    children: [
                        { height: 80 },
                        { height: 80 },
                        { height: 80 },
                    ],
                }
            ],
            columnHeader: [
                {
                    title: '',
                    width: 120
                },
                {
                    title: 'Header',
                    children: [
                        { width: 80 },
                        { width: 80 },
                        { width: 80 },
                    ],
                }
            ],
        },
    }
};

ReactDom.render(
    <Provider store={store}>
        <ModalBackgroundContainer { ...external } />,
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
