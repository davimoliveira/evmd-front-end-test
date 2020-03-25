import React, { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import store from "./src/store";
import { CreateDatabase, LoadUsers } from './src/scripts';
import Routes from './src/routes';

export default function App() {
  const initializeDB = useCallback(async () => {
    await CreateDatabase();
  });

  useEffect(() => {
    initializeDB();
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
