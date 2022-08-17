import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MovieProvider } from './components/MovieDataContext';
import { UserDataProvider } from './components/userOrderContext';
import { GetIDProvider } from './components/GetIDContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieProvider>
      <GetIDProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </GetIDProvider>
    </MovieProvider>
  </React.StrictMode>
);

reportWebVitals();
