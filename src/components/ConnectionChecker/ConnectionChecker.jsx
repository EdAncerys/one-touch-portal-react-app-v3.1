import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../App';
import { colors } from '../../config/colors';

import AddressPicker from '../AddCustomer/AddressPicker';
import NDGBanner from '../NDGBanner';
import EthernetConnection from '../../img/oneTouch/Ethernet-Connection.png';
import BroadbandConnection from '../../img/oneTouch/Broadband-Connection.png';
import BroadbandCard from './BroadbandCard';
import BroadbandInfoCard from './BroadbandInfoCard';
import UserManagement from '../UserManagement/UserManagement';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [broadbandData, setBroadbandData] = useState(false);
  const [oneTouchCustomer, setOneTouchCustomer] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(false);
  const [oneTouchBroadband, setOneTouchBroadband] = useState(false);

  const setPageData = manageAppContext.setPageData;
  const setSpinner = manageAppContext.setSpinner;

  useEffect(() => {
    if (selectedAddress) broadbandAvailability();
  }, [selectedAddress]); // eslint-disable-line
  useEffect(() => {
    if (oneTouchCustomer) {
      setSelectedAddress(oneTouchCustomer.oneTouchCustomer);
      setAddCustomer(true);
    }
  }, [oneTouchCustomer]); // eslint-disable-line

  async function broadbandAvailability() {
    setSpinner(true);
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
        setSpinner(false);
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        setBroadbandData(false);
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      setBroadbandData(data.products);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!broadbandData && addCustomer && (
        <>
          {!customerInfo && (
            <div className="features-align-right">
              <div style={styles.btnClose}>
                <Button
                  onClick={() => {
                    setSelectedAddress(false);
                    setPageData(false);
                    setAddCustomer(false);
                  }}
                  variant="outline-dark"
                  size="sm"
                >
                  <span aria-hidden="true">×</span>
                </Button>
              </div>
            </div>
          )}
          <UserManagement
            setCustomerInfo={setCustomerInfo}
            setOneTouchCustomer={setOneTouchCustomer}
          />
        </>
      )}
      {!broadbandData && !addCustomer && (
        <div style={styles.container} className="features-flex-wrap">
          <div className="flex-container-40">
            <div style={styles.warper}>
              <div style={styles.cardContainer}>
                <div style={styles.footerOne}>
                  <div>Receive a quat 24/7</div>
                </div>
                <div style={styles.addressPicker}>
                  <AddressPicker
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    setOneTouchCustomer={setOneTouchCustomer}
                  />
                </div>
                <div style={styles.footerOne}>
                  <div>Broadband DSL/PSTN</div>
                  <div>Quick installation on all lease lines</div>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => setAddCustomer(true)}
                  variant="outline-success"
                  size="m"
                  className="btn-one-touch shadow-none mt-3"
                >
                  Add Customer
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-container-40">
            <div style={styles.warper}>
              <div style={styles.cardContainer}>
                <div style={{ ...styles.footerOne, ...styles.footerTwo }}>
                  <div>Receive a quat 24/7</div>
                </div>
                <div
                  style={{ ...styles.addressPicker, ...styles.buildInProgress }}
                >
                  Coming Soon
                </div>
                <div style={{ ...styles.footerOne, ...styles.footerTwo }}>
                  <div>Broadband DSL/PSTN</div>
                  <div>Quick installation on all lease lines</div>
                </div>
              </div>
              <div>
                <Button
                  // onClick={() => setAddCustomer(true)}
                  style={{ opacity: 0.5 }}
                  variant="outline-success"
                  size="m"
                  className="btn-one-touch shadow-none mt-3"
                >
                  Add Customer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {broadbandData && !oneTouchBroadband && (
        <div style={styles.container} className="features">
          <div className="flex-container-70">
            <BroadbandCard
              broadbandData={broadbandData}
              setAddCustomer={setAddCustomer}
              setSelectedAddress={setSelectedAddress}
              oneTouchCustomer={oneTouchCustomer}
              setBroadbandData={setBroadbandData}
              setOneTouchBroadband={setOneTouchBroadband}
            />
          </div>
        </div>
      )}
      {broadbandData && oneTouchBroadband && (
        <BroadbandInfoCard
          oneTouchCustomer={oneTouchCustomer}
          oneTouchBroadband={oneTouchBroadband}
          setOneTouchBroadband={setOneTouchBroadband}
          setOneTouchCustomer={setOneTouchCustomer}
          setAddCustomer={setAddCustomer}
          setBroadbandData={setBroadbandData}
          setSelectedAddress={setSelectedAddress}
        />
      )}
      {!addCustomer && (
        <div className="features">
          <NDGBanner width="flex-container-30" />
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  warper: {
    display: 'grid',
    gridTemplateColumns: '400px',
    gridTemplateRows: '350px auto',
  },
  cardContainer: {
    display: 'grid',
    alignItems: 'center',
    overflow: 'hidden',
    gridTemplateRows: '50px 240px 60px',
    background: colors.lightGrey,
    border: `1px solid ${colors.mint}`,
    borderRadius: '20px',
  },
  buildInProgress: {
    textAlign: 'center',
    fontSize: '36px',
    color: colors.brightBlue,
    padding: '20px',
  },
  addressPicker: {
    display: 'grid',
    margin: '5px',
    padding: '5px',
    background: colors.white,
    border: `1px solid ${colors.mint}`,
    borderRadius: '10px',
  },
  footerOne: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    background: colors.brightGreen,
  },
  footerTwo: {
    background: colors.brightBlue,
  },
};
