import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './store/AuthContext';
import DataProviders from './store/DataProviders';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataProviders>
        <App />
      </DataProviders>
    </AuthContextProvider>
  </React.StrictMode>
);
