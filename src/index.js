import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MovieProvider } from './provider/MovieDataContext';
import { UserDataProvider } from './provider/userOrderContext';
import { GetIDProvider } from './provider/GetIDContext';
import { PathNameProvider } from './provider/PathNameContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieProvider>
      <PathNameProvider>
        <GetIDProvider>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </GetIDProvider>
      </PathNameProvider>
    </MovieProvider>
  </React.StrictMode>
);

reportWebVitals();
