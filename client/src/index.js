import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store,persistor} from './component/Redux/store.js';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { SocketProvider } from './component/Redux/SocketProvider.js';
disableReactDevTools();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <SocketProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
    </Provider>
      </SocketProvider>
  </React.StrictMode>
);

