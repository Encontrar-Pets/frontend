import React from 'react';
import {LoadingProvider} from 'context/loadingContext';
import LoadingComponent from 'components/loading';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import {useToast} from 'hooks/use-toast';

export function App() {
  const Toast = useToast();
  return (
    <React.StrictMode>
      <LoadingProvider>
        <Toast.Component />
        <LoadingComponent />
        <Routes />
      </LoadingProvider>
    </React.StrictMode>
  );
}
