import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Context/AuthContext';

ReactDOM.render(
    <AuthProvider> {/* Wrap your App component with AuthProvider */}
      <App />
    </AuthProvider>,
  document.getElementById('root')
);
