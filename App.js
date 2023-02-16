import React, { useEffect } from 'react';
import App from './src/routes/routes';
import { DataProvider } from './src/hooks/data';
import { BackHandler } from 'react-native';

export default function Main() {
  useEffect(() => {
    BackHandler.addEventListener('backPress', () => true)
    return () => BackHandler.removeEventListener('backPress', () => true)
  }, []);
  
  return (
    <DataProvider>
        <App/>
    </DataProvider>
  );
}
