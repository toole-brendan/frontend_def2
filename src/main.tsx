import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './theme/ThemeProvider';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/defense">
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
