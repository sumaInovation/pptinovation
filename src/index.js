import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import './index.css';
import App from './App';
import { WebSocketProvider } from './Context/WebSocketContext'; // Import WebSocket provider
import { UserProvider } from "./Context/UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Waraping websocket provider */}
    <GoogleOAuthProvider clientId="39253442113-0vh548enso8si0f1pjg27cbensc6qpba.apps.googleusercontent.com">

   
    <WebSocketProvider >
      <UserProvider>
        <App />
        
      </UserProvider>
    </WebSocketProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);


