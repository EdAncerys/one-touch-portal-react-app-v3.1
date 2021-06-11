import React, { useContext } from 'react';
import { AppContext } from '../../App';

import AddressPicker from '../AddCustomer/AddressPicker';
import NDGBanner from '../NDGBanner';
import EthernetConnection from '../../img/oneTouch/Ethernet-Connection.png';
import BroadbandConnection from '../../img/oneTouch/Broadband-Connection.png';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);

  const height = '350px';
  const className = 'd-inline-block align-top index-icon';

  return (
    <>
      <div style={styles.container} className="features-flex-wrap">
        <div style={styles.wrapper}>
          <img
            onClick={() => manageAppContext.setPage('build-in-progress')}
            src={BroadbandConnection}
            height={height}
            className={className}
            alt={BroadbandConnection}
          />
          <div style={styles.addressPicker}>
            <AddressPicker />
          </div>
        </div>

        <img
          onClick={() => manageAppContext.setPage('build-in-progress')}
          src={EthernetConnection}
          height={height}
          className={className}
          alt={EthernetConnection}
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
  wrapper: {
    display: 'grid',
    gridTemplateRow: '350px 1fr',
  },
  addressPicker: {
    // position: 'relative',
    // zIndex: '5',
    marginBottom: '100px',
  },
};
