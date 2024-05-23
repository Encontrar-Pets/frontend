import {ReactElement} from 'react';
import {ToastContainer, toast} from 'react-toastify';

let successToast: (message: string) => void;
let errorToast: (message: string) => void;
let warningToast: (message: string) => void;
let errorTostComponent: (message: () => ReactElement) => void;
let warningTostComponent: (message: () => ReactElement) => void;

function Toaster() {
  successToast = function successToastFunction(message: string) {
    toast.success(message);
  };

  errorToast = function errorToastFunction(message: string) {
    toast.error(message);
  };

  errorTostComponent = function errorToastFunction(message: () => ReactElement) {
    toast.error(message());
  };

  warningToast = function warningToastFunction(message: string) {
    toast.warning(message);
  };

  warningTostComponent = function errorToastFunction(message: () => ReactElement) {
    toast.warning(message());
  };

  return <ToastContainer position="top-center" />;
}

export function useToast() {
  return {
    Component: Toaster,
    showErrorToast: (message: string) => errorToast(message),
    showSuccessToast: (message: string) => successToast(message),
    showWarningToast: (message: string) => warningToast(message),
    showErrorElementToast: (message: () => ReactElement) => errorTostComponent(message),
    showWarningElementToast: (message: () => ReactElement) => warningTostComponent(message),
  };
}
