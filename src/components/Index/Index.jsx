import React, { useContext } from 'react';
import { AppContext } from '../../App';

import NDGBanner from '../NDGBanner';
import Cloud from '../../img/oneTouch/Cloud.png';
import ConnectionChecker from '../../img/oneTouch/Connection-Checker.png';
import LiveConnections from '../../img/oneTouch/Live-Connections.png';
import RaseTicket from '../../img/oneTouch/Rase-Ticket.png';
import UserManagement from '../../img/oneTouch/User-Management.png';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);

  const width = '150px';
  const className = 'd-inline-block align-top index-icon';

  return (
    <>
      <div style={styles.container} className="features-flex-wrap">
        <img
          onClick={() => manageAppContext.setPage('build-in-progress')}
          src={Cloud}
          width={width}
          className={className}
          alt={Cloud}
        />
        <img
          onClick={() => manageAppContext.setPage('build-in-progress')}
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
          onClick={() => manageAppContext.setPage('live-connections')}
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

      <div className="features">
        <NDGBanner width="flex-container-30" />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
};
