import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import NavBar from './components/nav-bar/NavBar';
import AuthIndex from './components/AuthIndex/AuthIndex';

export const AppContext = React.createContext();

export default function App({ props }) {
  const [accessToken, setAccessToken] = useState(false);
  const [page, setPage] = useState(false);
  const [pageData, setPageData] = useState(false);

  const SESSION_STORAGE_KEY = 'oneTouchPortal.App';

  const manageAppContext = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      page,
      setPage,
      pageData,
      setPageData,
    }),
    [accessToken, page, pageData]
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

  return (
    <AppContext.Provider
      value={{
        manageAppContext,
      }}
    >
      <div className="oneTouchBodyContainer">
        <div className="oneTouchBodyWrapper">
          {!accessToken && <AuthIndex />}

          {accessToken && (
            <div>
              <NavBar />
              <div>{page}</div>
            </div>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}
