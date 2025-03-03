import React from 'react';
import AppContainer from '../components/layout/AppContainer';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <AppContainer>
      <AppRoutes />
    </AppContainer>
  );
};

export default App;
