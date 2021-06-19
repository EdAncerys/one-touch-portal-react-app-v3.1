import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';

import PortalUserComponent from './PortalUserComponent';
import PortalUserInfoCard from './PortalUserInfoCard';

export default function PortalUsers({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findContract, setFindContract] = useState(false);
  const [filterContract, setFilterContract] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const page = manageAppContext.page;
  const setPage = manageAppContext.setPage;

  console.log(findContract);

  useEffect(() => {
    liveConnections();
  }, [page]); // eslint-disable-line

  async function liveConnections() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'liveConnections',
        access_token,
      };
      console.log(body);

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        setSpinner(false);
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        manageAppContext.setPageData([]);
        setPage('connection-checker');
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setPageData(data.contracts);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && !findContract && (
        <PortalUserComponent
          setFindContract={setFindContract}
          filterContract={filterContract}
          setFilterContract={setFilterContract}
        />
      )}
      {findContract && (
        <PortalUserInfoCard
          findContract={findContract}
          setFindContract={setFindContract}
        />
      )}
    </>
  );
}
