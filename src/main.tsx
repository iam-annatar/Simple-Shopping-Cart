import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from '@lyket/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider
        apiKey="pt_1c8f43c851e0b90b6dd8ffccc8988c"
        theme={{
          colors: {
            text: 'black white',
          },
        }}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
