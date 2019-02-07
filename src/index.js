import 'normalize.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import createStore from './store'

const store = createStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
