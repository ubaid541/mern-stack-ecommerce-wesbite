import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/CustomerAuthContext';
import { CartContextProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
         <App />
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
