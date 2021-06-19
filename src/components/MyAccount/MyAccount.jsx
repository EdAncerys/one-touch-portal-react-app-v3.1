import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';

import UserAccountInfoCard from './UserAccountInfoCard';
import MyAccountUpdateForm from './MyAccountUpdateForm';
import { validateEmail } from '../AuthIndex/validateEmail';

export default function MyAccount({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [updateAccount, setUpdateAccount] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const setPageData = manageAppContext.setPageData;
  const pageData = manageAppContext.pageData;

  useEffect(() => {
    if (!pageData) myAccount();
  }, [pageData]); // eslint-disable-line

  useEffect(() => {
    if (updateAccount) fillFromData();
  }, [updateAccount]); // eslint-disable-line

  async function fillFromData() {
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

    // if (pageData.postcode)
    //   setSelectedAddress({
    //     county: pageData.county,
    //     district_id: pageData.district,
    //     locality: pageData.locality,
    //     nad_key: pageData.nad_key,
    //     post_town: pageData.post_town,
    //     postcode: pageData.postcode,
    //     premises_name: pageData.premises_name,
    //     sub_premises: pageData.sub_premises,
    //     thoroughfare_name: pageData.thoroughfare_name,
    //     thoroughfare_number: pageData.thoroughfare_number,
    //   });
  }
  async function myAccount() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'myAccount',
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
        manageAppContext.setAlert({ msg: data.msg });
        manageAppContext.setPageData(data.msg);
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      manageAppContext.setPageData(data.oneTouchSuperUser);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function updateMyAccount() {
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
      const access_token = manageAppContext.accessToken.access_token;
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
        oneTouchPath: 'updateMyAccount',
        access_token,
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
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      setPageData(data.data);
      setUpdateAccount(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && !updateAccount && (
        <UserAccountInfoCard
          setSelectedAddress={setSelectedAddress}
          setUpdateAccount={setUpdateAccount}
        />
      )}

      {pageData && updateAccount && (
        <MyAccountUpdateForm
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          updateMyAccount={updateMyAccount}
          setUpdateAccount={setUpdateAccount}
        />
      )}
    </>
  );
}
