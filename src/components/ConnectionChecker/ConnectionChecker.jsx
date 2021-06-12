import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';

import AddressPicker from '../AddCustomer/AddressPicker';
import NDGBanner from '../NDGBanner';
import EthernetConnection from '../../img/oneTouch/Ethernet-Connection.png';
import BroadbandConnection from '../../img/oneTouch/Broadband-Connection.png';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(false);

  const height = '350px';
  const className = 'd-inline-block align-top';

  return (
    <>
      <div style={styles.container} className="features-flex-wrap">
        <div style={styles.wrapper}>
          <div style={styles.addressPicker}>
            <AddressPicker
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
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
    justifyContent: 'center',
    width: '400px',
    height: '350px',
    gridTemplateColumns: '350px',
    background: `url(${BroadbandConnection})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },
  addressPicker: {
    zIndex: '2',
    marginTop: '175px',
  },
};
