import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { UserProvider } from './Context/userContext.js';
import reducer, { initialState } from './Context/Reducers/UserReducer.js';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider initialState={initialState} reducer={reducer}>
      <App />
    </UserProvider>
);

