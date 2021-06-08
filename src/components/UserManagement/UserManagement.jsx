import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';

import CustomerListComponent from './CustomerListComponent';
import CustomerInfoCard from './CustomerInfoCard';

export default function UserManagement({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findCustomer, setFindCustomer] = useState(false);

  const pageData = manageAppContext.pageData;

  useEffect(() => {
    if (!pageData) userManagement();
  }, []);

  async function userManagement() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'userManagement',
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
