import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';

import PortalUserComponent from './PortalUserComponent';
import UserAccountInfoCard from '../MyAccount/UserAccountInfoCard';

export default function PortalUsers({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findUser, setFindUser] = useState(false);
  const [filterUser, setFilterUser] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const page = manageAppContext.page;

  console.log(findUser);

  useEffect(() => {
    portalUsers();
  }, [page]); // eslint-disable-line

  async function portalUsers() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'portalUsers',
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
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setPageData(data.superUser);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && !findUser && (
        <PortalUserComponent
          setFindUser={setFindUser}
          filterUser={filterUser}
          setFilterUser={setFilterUser}
        />
      )}
      {findUser && (
        <UserAccountInfoCard findUser={findUser} setFindUser={setFindUser} />
      )}
    </>
  );
}
