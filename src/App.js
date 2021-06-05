import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import NavBar from './components/nav-bar/NavBar';
import ErrorMsg from './components/ErrorMsg';
import AuthIndex from './components/AuthIndex/AuthIndex';
import Index from './components/index/Index';
import Docs from './components/docs/Docs';
import BuildInProgress from './components/BuildInProgress/BuildInProgress';

export const AppContext = React.createContext();

export default function App({ props }) {
  const [accessToken, setAccessToken] = useState(false);
  const [page, setPage] = useState(false);
  const [alert, setAlert] = useState(false);
  const [pageData, setPageData] = useState(false);

  const SESSION_STORAGE_KEY = 'oneTouchPortal.App';

  const manageAppContext = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      page,
      setPage,
      alert,
      setAlert,
      pageData,
      setPageData,
    }),
    [accessToken, page, alert, pageData]
  );

  useEffect(() => {
    const data = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const userSession = JSON.parse(data);
    if (userSession) setAccessToken(userSession.accessToken);
    if (userSession) setPage(userSession.page);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(manageAppContext)
    );
  }, [manageAppContext]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <AppContext.Provider
      value={{
        manageAppContext,
      }}
    >
      <div className="oneTouchBodyContainer">
        <div className="oneTouchBodyWrapper">
          {alert && <ErrorMsg color={alert.color} msg={alert.msg} />}
          {!accessToken && <AuthIndex />}

          {accessToken && (
            <div>
              <NavBar />
              {page === 'index' && <Index />}
              {page === 'build-in-progress' && <BuildInProgress />}
              {page === 'docs' && <Docs />}
            </div>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}
