import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { store } from './store/store';
import App from './App';
import './index.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>

);