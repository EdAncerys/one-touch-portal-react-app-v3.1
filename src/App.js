import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import NavBar from './components/NavBar/NavBar';
import ErrorMsg from './components/ErrorMsg';
import AuthIndex from './components/AuthIndex/AuthIndex';
import Index from './components/Index/Index';
import Docs from './components/docs/Docs';
import MyAccount from './components/MyAccount/MyAccount';
import RaiseTicket from './components/RaiseTicket/RaiseTicket';
import UserManagement from './components/UserManagement/UserManagement';
import LiveConnections from './components/LiveConnections/LiveConnections';
import BroadbandOrders from './components/BroadbandOrders/BroadbandOrders';
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
    setPageData(false);
  }, [page]);

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
        <div className="oneTouchBodyWrapper Oswald">
          {alert && <ErrorMsg color={alert.color} msg={alert.msg} />}
          {!accessToken && <AuthIndex />}

          {accessToken && (
            <div>
              <NavBar />

              {page === 'index' && <Index />}
              {page === 'build-in-progress' && <BuildInProgress />}
              {page === 'docs' && <Docs />}
              {page === 'my-account' && <MyAccount />}
              {page === 'rase-ticket' && <RaiseTicket />}
              {page === 'user-management' && <UserManagement />}
              {page === 'live-connections' && <LiveConnections />}
              {page === 'broadband-orders' && <BroadbandOrders />}
            </div>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}
