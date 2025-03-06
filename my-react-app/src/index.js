import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Analytics />
      <App />
    </I18nextProvider>
  </React.StrictMode>
);