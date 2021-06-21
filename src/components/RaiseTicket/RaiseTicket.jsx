import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';

import RaiseTicketComponent from './RaiseTicketComponent';

export default function RaiseTicket({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [findTicket, setFindTicket] = useState(false);
  const [filterTicket, setFilterTicket] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const setPageData = manageAppContext.setPageData;
  const page = manageAppContext.page;

  useEffect(() => {
    console.log('hello');
    freshDeskTickets();
  }, [page]); // eslint-disable-line

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        raiseTicket();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  async function freshDeskTickets() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/freshDesk';

    try {
      const body = {
        oneTouchPath: 'freshDeskTickets',
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
        setPageData(false);
        console.log(data);
        return;
      }

      setSpinner(false);
      // setPageData(data.freshDeskTickets);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function raiseTicket() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const priority = document.querySelector('#priority').value;
    const subject = document.querySelector('#subject').value;
    const description = document.querySelector('#description').value;
    const URL = '/.netlify/functions/freshDesk';

    if (priority === '' || subject === '' || description === '') {
      setSpinner(false);
      const msg = `Please fill in all required fields!`;
      manageAppContext.setAlert({ color: 'warning', msg });
      console.log(msg);
      return;
    }

    try {
      const body = {
        oneTouchPath: 'raiseTicket',
        access_token,
        priority,
        subject,
        description,
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
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      manageAppContext.setPageData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && !findTicket && (
        <RaiseTicketComponent
          setFindTicket={setFindTicket}
          filterTicket={filterTicket}
          setFilterTicket={setFilterTicket}
        />
      )}
    </>
  );
}
