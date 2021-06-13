import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import { colors } from '../../config/colors';
import { broadbandPriceFilter } from './broadbandPriceFilter';

export default function BroadbandCard({
  setSelectedAddress,
  setResponseOk,
  setOneTouchBroadband,
  oneTouchCustomer,
}) {
  const { manageAppContext } = useContext(AppContext);

  const setPage = manageAppContext.setPage;
  const setPageData = manageAppContext.setPageData;
  const pageData = manageAppContext.pageData;
  const broadbandData = broadbandPriceFilter(pageData);
  console.log(broadbandData);

  return (
    <div style={styles.container}>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>{pageData.email} Customer List</div>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Broadband Type</th>
                <th>Price</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {broadbandData.map((broadband, index) => (
                <tr key={index.toString()}>
                  <td key={index.toString() + 'a'}>{index + 1}</td>
                  <td key={index.toString() + 'b'}>
                    <div key={index + 1}>{broadband.name}</div>
                    <div key={index + 2} style={styles.bottomRow}>
                      {broadband.provider}
                    </div>
                  </td>
                  <td key={index.toString() + 'c'}>
                    <div key={index + 1}>{broadband.price}</div>
                    <div key={index + 2} style={styles.bottomRow}>
                      {broadband.installation}
                    </div>
                  </td>
                  <td key={index.toString() + 'd'} style={styles.btn}>
                    {oneTouchCustomer && (
                      <Button
                        onClick={() =>
                          setOneTouchBroadband(broadbandData[index])
                        }
                        id={index}
                        size="sm"
                        className="shadow-none"
                      >
                        Place Order
                      </Button>
                    )}
                    {!oneTouchCustomer && (
                      <Button
                        onClick={() => setPage('add-customer')}
                        id={index}
                        size="sm"
                        variant="outline-primary"
                        className="shadow-none"
                      >
                        <div style={styles.msg}>
                          Customer profile not linked
                        </div>
                        <div>Add Customer</div>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Button
          onClick={() => {
            setResponseOk(false);
            setSelectedAddress(false);
            setPageData(false);
          }}
          variant="outline-success"
          size="m"
          className="shadow-none m-2"
        >
          Search Again
        </Button>
      </Card>
    </div>
  );
}

const styles = {
  bottomRow: {
    fontSize: '12px',
    color: colors.darkGrey,
  },
  msg: {
    fontSize: '10px',
  },
  btn: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
};
