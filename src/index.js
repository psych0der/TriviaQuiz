import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history, store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './containers';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <App />
        </div>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();
