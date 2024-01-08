import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import reducer, { initialState } from './Components/reducer';
import { StateProvider } from './Components/StateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);

