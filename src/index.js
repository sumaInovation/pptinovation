import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="39253442113-0vh548enso8si0f1pjg27cbensc6qpba.apps.googleusercontent.com">
  <App />
  </GoogleOAuthProvider>
    </React.StrictMode>
);


