import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { validateEmail } from '../AuthIndex/validateEmail';

import PortalUserComponent from './PortalUserComponent';
import UserAccountInfoCard from '../MyAccount/UserAccountInfoCard';
import MyAccountUpdateForm from '../MyAccount/MyAccountUpdateForm';

export default function PortalUsers({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findUser, setFindUser] = useState(false);
  const [filterUser, setFilterUser] = useState(false);
  const [updateAccount, setUpdateAccount] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  let pageData = manageAppContext.pageData;
  const setPageData = manageAppContext.setPageData;
  const page = manageAppContext.page;

  useEffect(() => {
    portalUsers();
  }, [page]); // eslint-disable-line

  useEffect(() => {
    console.log(findUser);
    if (updateAccount) fillFromData();
  }, [updateAccount]); // eslint-disable-line

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
  async function fillFromData() {
    if (findUser)
      pageData = manageAppContext.pageData.filter(
        (user) => user._id === findUser
      )[0].oneTouchSuperUser;

    document.getElementById('fName').value = pageData.fName
      ? pageData.fName
      : '';
    document.getElementById('lName').value = pageData.lName
      ? pageData.lName
      : '';
    document.getElementById('email').value = pageData.email
      ? pageData.email
      : '';
    document.getElementById('phoneNumber').value = pageData.phoneNumber
      ? pageData.phoneNumber
      : '';
    document.getElementById('companyName').value = pageData.companyName
      ? pageData.companyName
      : '';
    document.getElementById('productType').value = pageData.productType
      ? pageData.productType
      : '';
    document.getElementById('companyEmail').value = pageData.companyEmail
      ? pageData.companyEmail
      : '';
    document.getElementById('companyPhoneNumber').value =
      pageData.companyPhoneNumber ? pageData.companyPhoneNumber : '';
  }
  async function updateUserAccount() {
    setSpinner(true);

    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const companyName = document.getElementById('companyName').value;
    const productType = document.getElementById('productType').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyPhoneNumber =
      document.getElementById('companyPhoneNumber').value;

    if (!validateEmail(email) || !validateEmail(companyEmail)) {
      setSpinner(false);
      const msg = `Provided email not valid`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    if (
      !fName ||
      !lName ||
      !email ||
      !phoneNumber ||
      !companyName ||
      !productType ||
      !companyEmail ||
      !companyPhoneNumber ||
      !selectedAddress
    ) {
      setSpinner(false);
      const msg = `Please complete all required fields`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    try {
      const id = findUser;
      const URL = '/.netlify/functions/mongoDB';

      const county = selectedAddress['county'];
      const district_id = selectedAddress['district_id'];
      const locality = selectedAddress['locality'];
      const nad_key = selectedAddress['nad_key'];
      const post_town = selectedAddress['post_town'];
      const postcode = selectedAddress['postcode'];
      const premises_name = selectedAddress['premises_name'];
      const sub_premises = selectedAddress['sub_premises'];
      const thoroughfare_name = selectedAddress['thoroughfare_name'];
      const thoroughfare_number = selectedAddress['thoroughfare_number'];

      const body = {
        oneTouchPath: 'updateUserAccount',
        id,
        fName,
        lName,
        email,
        phoneNumber,
        companyName,
        productType,
        companyEmail,
        companyPhoneNumber,
        county,
        district_id,
        locality,
        nad_key,
        post_town,
        postcode,
        premises_name,
        sub_premises,
        thoroughfare_name,
        thoroughfare_number,
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
        console.log(data);
        return;
      }

      setSpinner(false);
      console.log(data);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      const updateUser = pageData.map((user) => {
        if (user._id === findUser) user = data.superUser[0];

        return user;
      });
      setPageData(updateUser);
      setUpdateAccount(false);
    } catch (err) {
      console.log(err);
    }
  }
  async function updateUserStatus(userApproved) {
    setSpinner(true);

    try {
      const id = findUser;
      const URL = '/.netlify/functions/mongoDB';

      const body = {
        oneTouchPath: 'updateUserStatus',
        userApproved,
        id,
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
        console.log(data);
        return;
      }

      setSpinner(false);
      console.log(data);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      const updateUser = pageData.map((user) => {
        if (user._id === findUser) user = data.superUser[0];

        return user;
      });
      setPageData(updateUser);
      setUpdateAccount(false);
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
      {findUser && !updateAccount && (
        <UserAccountInfoCard
          findUser={findUser}
          setFindUser={setFindUser}
          setSelectedAddress={setSelectedAddress}
          setUpdateAccount={setUpdateAccount}
          updateUserStatus={updateUserStatus}
        />
      )}
      {pageData && updateAccount && (
        <MyAccountUpdateForm
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          updateUserAccount={updateUserAccount}
          setUpdateAccount={setUpdateAccount}
        />
      )}
    </>
  );
}
