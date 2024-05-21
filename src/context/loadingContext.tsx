import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  showLoading: () => { },
  hideLoading: () => { }
});

export const LoadingProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
