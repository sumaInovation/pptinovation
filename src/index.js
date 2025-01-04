import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

import './index.css';
import App from './App';
import { WebSocketProvider } from './Components/Common/WebSocketContext'; // Import WebSocket provider
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleAuthProvider } from './Components/Common/GoogleAuthContext'; // Import the context provider
const root = ReactDOM.createRoot(document.getElementById('root'));
const clientID="39253442113-0vh548enso8si0f1pjg27cbensc6qpba.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    {/* Waraping websocket provider */}
    <WebSocketProvider>
      <GoogleOAuthProvider clientId={clientID}>
       <GoogleAuthProvider>
       <App />
    </GoogleAuthProvider>
    </GoogleOAuthProvider>
    </WebSocketProvider>
    
  </React.StrictMode>
);


