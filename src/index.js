import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from '../src/container/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import setAuthorizationToken from './utils/setAuthorizationToken';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const rootEL = document.getElementById('root');

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
}

render(
  <Provider store={store}>
    <Router>
      <App
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </Router>
  </Provider>,
  rootEL
);

serviceWorker.unregister();
