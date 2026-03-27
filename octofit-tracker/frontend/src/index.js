import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { resolveApiBaseUrl, resolveCodespaceName } from './api';

const codespaceName = resolveCodespaceName();
const backendBaseUrl = resolveApiBaseUrl();

console.log('[OctoFit] REACT_APP_CODESPACE_NAME:', codespaceName || '(not set)');
console.log('[OctoFit] Backend API base URL:', backendBaseUrl);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
