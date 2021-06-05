import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import Cloud from '../../img/oneTouch/Cloud.png';
import ConnectionChecker from '../../img/oneTouch/Connection-Checker.png';
import LiveConnections from '../../img/oneTouch/Live-Connections.png';
import RaseTicket from '../../img/oneTouch/Rase-Ticket.png';
import UserManagement from '../../img/oneTouch/User-Management.png';
import ErrorMsg from '../ErrorMsg';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);

  const width = '150px';
  const className = 'd-inline-block align-top index-icon';

  return (
    <div style={styles.container} className="features-flex-wrap">
      <img
        onClick={() => manageAppContext.setPage('cloud')}
        src={Cloud}
        width={width}
        className={className}
        alt={Cloud}
      />
      <img
        onClick={() => manageAppContext.setPage('rase-ticket')}
        src={RaseTicket}
        width={width}
        className={className}
        alt={RaseTicket}
      />
      <img
        onClick={() => manageAppContext.setPage('connection-checker')}
        src={ConnectionChecker}
        width={width}
        className={className}
        alt={ConnectionChecker}
      />

      <img
        onClick={() => manageAppContext.setPage('live-connection')}
        src={LiveConnections}
        width={width}
        className={className}
        alt={LiveConnections}
      />

      <img
        onClick={() => manageAppContext.setPage('user-management')}
        src={UserManagement}
        width={width}
        className={className}
        alt={UserManagement}
      />
    </div>
  );
}

const styles = {
  container: {
    marginTop: '50px',
  },
};