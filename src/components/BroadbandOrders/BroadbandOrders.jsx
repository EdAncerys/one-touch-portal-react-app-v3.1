import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";

import LiveContractComponent from "../LiveConnections/LiveContractComponent";
import ContractInfoCard from "../LiveConnections/ContractInfoCard";

export default function BroadbandOrders({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findContract, setFindContract] = useState(false);
  const [filterContract, setFilterContract] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const page = manageAppContext.page;

  useEffect(() => {
    liveConnections();
  }, [page]); // eslint-disable-line

  async function liveConnections() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = "/.netlify/functions/mongoDB";

    try {
      const body = {
        oneTouchPath: "liveConnections",
        role: "admin",
        access_token,
      };
      console.log(body);

      const config = {
        method: "POST",
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        setSpinner(false);
        manageAppContext.setAlert({ color: "warning", msg: data.msg });
        manageAppContext.setPageData([]);
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
        <LiveContractComponent
          setFindContract={setFindContract}
          filterContract={filterContract}
          setFilterContract={setFilterContract}
        />
      )}
      {findContract && (
        <ContractInfoCard
          findContract={findContract}
          setFindContract={setFindContract}
        />
      )}
    </>
  );
}
