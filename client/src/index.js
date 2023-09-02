import React from 'react';
import ReactDOM from 'react-dom';
import App from './utils/App';
import './components/i18nextConf';
import { Auth0Provider } from '@auth0/auth0-react';
import Cookies from 'js-cookie';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const sessionCookieName = 'auth_session';

// const cachedAuthState = Cookies.getJSON("user");
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    // domain="dev-r3tn38u16bhmersx.us.auth0.com"
    // clientId="MdUoHphNhicIMmojrXE63kZjQYO4l4mJ"
    domain="dev-18b7v8smgox1l8t6.us.auth0.com"
    clientId="5KVCXotV5srTpvDpg5WMs2Nic027J8kE"
    // cacheLocation="localstorage"
    // useRefreshTokens
    // initialState={cachedAuthState}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
