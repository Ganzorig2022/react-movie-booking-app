import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MovieProvider } from './provider/MovieDataContext';
import { UserDataProvider } from './provider/userOrderContext';
import { GetIDProvider } from './provider/GetIDContext';
import { PathNameProvider } from './provider/PathNameContext';
import { LoggedInProvider } from './provider/LoggedInContext';
import { ModalToggleProvider } from './provider/ModalToggleContext';
import { LoggedUserDataProvider } from './provider/LoggedUserDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoggedInProvider>
      <LoggedUserDataProvider>
        <ModalToggleProvider>
          <MovieProvider>
            <PathNameProvider>
              <GetIDProvider>
                <UserDataProvider>
                  <App />
                </UserDataProvider>
              </GetIDProvider>
            </PathNameProvider>
          </MovieProvider>
        </ModalToggleProvider>
      </LoggedUserDataProvider>
    </LoggedInProvider>
  </React.StrictMode>
);

reportWebVitals();
