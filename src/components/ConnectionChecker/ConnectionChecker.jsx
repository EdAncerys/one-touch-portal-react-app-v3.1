import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import AddressPicker from '../AddCustomer/AddressPicker';
import NDGBanner from '../NDGBanner';
import EthernetConnection from '../../img/oneTouch/Ethernet-Connection.png';
import BroadbandConnection from '../../img/oneTouch/Broadband-Connection.png';
import { colors } from '../../config/colors';
import BroadbandCard from './BroadbandCard';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [responseOk, setResponseOk] = useState(false);
  const [oneTouchBroadband, setOneTouchBroadband] = useState(false);
  const [oneTouchCustomer, setOneTouchCustomer] = useState(false);

  console.log(oneTouchBroadband);
  console.log(oneTouchCustomer);

  const pageData = manageAppContext.pageData;
  const marginOptions = responseOk
    ? '50px 5px 100px 5px'
    : '150px 5px 100px 5px';

  useEffect(() => {
    if (selectedAddress) broadbandAvailability();
  }, [selectedAddress]); // eslint-disable-line

  async function broadbandAvailability() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/icUK';

    try {
      const body = {
        oneTouchPath: 'broadbandAvailability',
        selectedAddress,
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
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        manageAppContext.setPageData(false);
        console.log(data);
        return;
      }

      manageAppContext.setPageData(data.products);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!pageData && (
        <div style={styles.container} className="features-flex-wrap">
          <div className="flex-container-40">
            <div style={styles.broadbandConnectionWrapper}>
              <div style={{ ...styles.addressPicker, margin: marginOptions }}>
                <AddressPicker
                  setResponseOk={setResponseOk}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              </div>
              <Button
                // onClick={() => {}}
                variant="outline-success"
                size="m"
                className="btn-one-touch shadow-none mt-3"
              >
                Add Customer
              </Button>
            </div>
          </div>

          <div className="flex-container-40">
            <div
              style={{
                ...styles.broadbandConnectionWrapper,
                ...styles.ethernetConnectionWrapper,
              }}
            >
              <div style={{ ...styles.addressPicker, margin: marginOptions }}>
                <div style={styles.buildInProgress}>Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {pageData && (
        <div style={styles.container} className="features">
          <div className="flex-container-100">
            <BroadbandCard
              setResponseOk={setResponseOk}
              setSelectedAddress={setSelectedAddress}
              oneTouchCustomer={oneTouchCustomer}
              setOneTouchBroadband={setOneTouchBroadband}
            />
          </div>
        </div>
      )}
      <div style={styles.ndgBanner} className="features">
        <NDGBanner width="flex-container-30" />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  broadbandConnectionWrapper: {
    display: 'grid',
    justifyContent: 'center',
    width: '400px',
    height: '350px',
    gridTemplateColumns: '1fr',
    background: `url(${BroadbandConnection})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    borderRadius: '15px',
    marginTop: '50px',
  },
  ethernetConnectionWrapper: {
    background: `url(${EthernetConnection})`,
    opacity: 0.4,
  },
  buildInProgress: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '36px',
    color: colors.danger,
    height: 0,
    overflow: 'visible',
  },
  ndgBanner: {
    marginTop: '50px',
  },
  addressPicker: {
    zIndex: '2',
    padding: '5px',
    background: colors.lightGrey,
    border: `1px solid ${colors.mint}`,
    borderRadius: '10px',
  },
};
