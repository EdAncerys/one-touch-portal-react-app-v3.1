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

  console.log(oneTouchBroadband, oneTouchCustomer);

  const pageData = manageAppContext.pageData;
  const setPageData = manageAppContext.setPageData;
  const marginOptions = '50px 5px 50px 5px';

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
        setBroadbandData(false);
        manageAppContext.setPageData(false);
        console.log(data);
        return;
      }

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
              <div style={styles.broadbandConnectionWrapper}>
                <div style={{ ...styles.addressPicker, margin: marginOptions }}>
                  <AddressPicker
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    setOneTouchCustomer={setOneTouchCustomer}
                  />
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
              <div className="ethernetConnectionWrapper">
                <div style={styles.buildInProgress}>Coming Soon</div>
                {/* <div
                  style={{ ...styles.addressPicker, margin: marginOptions }}
                ></div> */}
              </div>
              <div>
                <Button
                  // onClick={() => setAddCustomer(true)}
                  style={{ opacity: 0.4 }}
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
    justifyContent: 'center',
    gridTemplateColumns: '400px',
    gridTemplateRows: '350px auto',
  },
  broadbandConnectionWrapper: {
    background: `url(${BroadbandConnection})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    borderRadius: '15px',
  },
  ethernetConnectionWrapper: {
    background: `url(${EthernetConnection})`,
  },
  buildInProgress: {
    zIndex: '9',
    textAlign: 'center',
    fontSize: '36px',
    color: colors.danger,
    paddingTop: '200px',
  },
  addressPicker: {
    display: 'grid',
    alignItems: 'center',
    zIndex: '2',
    padding: '5px',
    background: colors.lightGrey,
    border: `1px solid ${colors.mint}`,
    borderRadius: '10px',
    height: '150px',
  },
};
