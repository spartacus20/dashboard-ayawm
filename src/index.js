import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { UserProvider } from './Context/userContext.js';
import { ProductProvider } from './Context/productContext.js';
import userReducer, { UserInitialState } from './Context/Reducers/UserReducer.js';
import productReducer, { ProductInitialState } from './Context/Reducers/ProductReducer';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserProvider initialState={UserInitialState} reducer={userReducer}>
    <ProductProvider initialState={ProductInitialState} reducer={productReducer}>
      <App />
    </ProductProvider>
  </UserProvider>
);

