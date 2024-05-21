import React from 'react';
import ReactDOM from 'react-dom/client';
import { LoadingProvider } from 'context/loadingContext';
import LoadingComponent from 'components/loading';
import './index.css';

import Routes from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <LoadingComponent />
      <Routes />
    </LoadingProvider>
  </React.StrictMode>
);

