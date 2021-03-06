import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";

import CustomerListComponent from "./CustomerListComponent";
import CustomerInfoCard from "./CustomerInfoCard";

export default function UserManagement({
  setCustomerInfo,
  setOneTouchCustomer,
}) {
  const { manageAppContext } = useContext(AppContext);
  const [findCustomer, setFindCustomer] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const page = manageAppContext.page;
  const setPage = manageAppContext.setPage;

  useEffect(() => {
    userManagement();
  }, [page]); // eslint-disable-line

  useEffect(() => {
    if (setCustomerInfo) setCustomerInfo(!!findCustomer);
  }, [findCustomer]); // eslint-disable-line

  async function userManagement() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = "/.netlify/functions/mongoDB";

    try {
      const body = {
        oneTouchPath: "userManagement",
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
        manageAppContext.setPageData(false);
        setPage("add-customer");
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: "success", msg: data.msg });
      manageAppContext.setPageData(data.customerList);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && !findCustomer && (
        <CustomerListComponent
          setFindCustomer={setFindCustomer}
          setOneTouchCustomer={setOneTouchCustomer}
        />
      )}
      {findCustomer && (
        <CustomerInfoCard
          findCustomer={findCustomer}
          setFindCustomer={setFindCustomer}
        />
      )}
    </>
  );
}
