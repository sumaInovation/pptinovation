import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

import './index.css';
import App from './App';
import { WebSocketProvider } from './Context/WebSocketContext'; // Import WebSocket provider


import { UserProvider } from "./Context/UserContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Waraping websocket provider */}
    <WebSocketProvider>
      <UserProvider>
       
            <App />
        
      </UserProvider>
    </WebSocketProvider>

  </React.StrictMode>
);


