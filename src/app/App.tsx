import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import MainLayout from '../components/layout/MainLayout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Provider>
  );
};

export default App;
