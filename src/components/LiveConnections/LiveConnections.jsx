import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';

import LiveContractComponent from './LiveContractComponent';
import ContractInfoCard from './ContractInfoCard';

export default function LiveConnections({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findContract, setFindContract] = useState(false);

  const pageData = manageAppContext.pageData;

  useEffect(() => {
    if (!pageData) liveConnections();
  }, []);

  async function liveConnections() {
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
        manageAppContext.setAlert({ msg: data.msg });
        manageAppContext.setPageData(false);
        console.log(data);
        return;
      }

      manageAppContext.setPageData(data.liveConnections);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && !findContract && (
        <LiveContractComponent
          pageData={pageData}
          setFindContract={setFindContract}
        />
      )}
      {findContract && (
        <ContractInfoCard
          pageData={pageData}
          findContract={findContract}
          setFindContract={setFindContract}
        />
      )}
    </>
  );
}