import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';

import RaiseTicketComponent from './RaiseTicketComponent';
import TicketInfoCard from './TicketInfoCard';

export default function RaiseTicket({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [id, setID] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [filterTicket, setFilterTicket] = useState(false);

  console.log(id);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const setPageData = manageAppContext.setPageData;
  const page = manageAppContext.page;

  useEffect(() => {
    freshDeskTickets();
  }, [page]); // eslint-disable-line

  useEffect(() => {
    if (id) findTicket();
  }, [id]); // eslint-disable-line

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
      setPageData(data.freshDeskTickets);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function findTicket() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/freshDesk';

    try {
      const body = {
        oneTouchPath: 'findTicket',
        access_token,
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
        setTicket(false);
        console.log(data);
        return;
      }

      setSpinner(false);
      setTicket(data.ticket);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
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
      {pageData && !id && (
        <RaiseTicketComponent
          setID={setID}
          filterTicket={filterTicket}
          setFilterTicket={setFilterTicket}
        />
      )}
      {ticket && (
        <TicketInfoCard ticket={ticket} setID={setID} setTicket={setTicket} />
      )}
    </>
  );
}
