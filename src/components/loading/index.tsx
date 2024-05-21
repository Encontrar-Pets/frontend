import React from 'react';
import { useLoading } from 'context/loadingContext';

const LoadingComponent = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-10 h-10 border-4 border-tertiary border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;
