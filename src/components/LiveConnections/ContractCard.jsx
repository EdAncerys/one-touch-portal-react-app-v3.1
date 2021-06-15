import React, { useContext } from "react";
import { AppContext } from "../../App";
import { Card, Table, Button } from "react-bootstrap";

import { colors } from "../../config/colors";

export default function CustomerCard({ setFindContract, filterContract }) {
  const { manageAppContext } = useContext(AppContext);
  const pageData = manageAppContext.pageData;

  return (
    <div style={styles.container}>
      <Card bg="Light" text="dark" style={{ width: "100%" }} className="mb-2">
        <Card.Header>
          <div>Contract List</div>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Provider</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((customer, index) => {
                let broadbandData = "";
                let data = customer.oneTouchBroadband;
                if (data) broadbandData = customer.oneTouchBroadband;
                let customerData = customer.oneTouchCustomer;
                let notFound = customerData.length === 0;

                let bgColor = "";
                let contractStartDay = "";
                if (!!customer.length)
                  contractStartDay = broadbandData.contractStartDay;

                let contractEndDay;
                let contractVisibility = "";
                let contractStatus = "";

                // contract expiration day
                const today = new Date();
                if (contractStartDay)
                  contractEndDay = new Date(broadbandData.contractEndDay);
                const sixMonthsFromNow = new Date();
                sixMonthsFromNow.setMonth(today.getMonth() + 6);

                if (contractEndDay < today && contractStartDay) {
                  bgColor = colors.bgSTOP;
                  contractStatus = "expired";
                }
                if (
                  contractEndDay < sixMonthsFromNow &&
                  contractEndDay > today
                ) {
                  bgColor = colors.bgSET;
                  contractStatus = "lessThenSixMonth";
                }
                if (contractEndDay > sixMonthsFromNow) {
                  bgColor = colors.bgGO;
                  contractStatus = "moreThenSixMonth";
                }
                if (!contractStartDay) {
                  bgColor = colors.bgPENDING;
                  contractStatus = "pending";
                }

                if (filterContract !== contractStatus && filterContract)
                  contractVisibility = "hidden";

                return (
                  <tr
                    style={{ background: bgColor }}
                    className={contractVisibility}
                    key={customer._id.toString()}
                  >
                    <td key={customer._id.toString() + "a"}>{index + 1}</td>
                    <td key={customer._id.toString() + "b"}>
                      <div key={index + 1}>
                        {customerData.companyName}
                        {notFound && `Customer not found!`}
                      </div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {customerData.companyName}
                      </div>
                    </td>
                    <td key={customer._id.toString() + "c"}>
                      <div key={index + 1}>
                        <div>
                          {customerData.thoroughfare_number === "null"
                            ? ""
                            : customerData.thoroughfare_number}{" "}
                          {customerData.premises_name === "null"
                            ? ""
                            : customerData.premises_name}{" "}
                          {customerData.sub_premises === "null"
                            ? ""
                            : customerData.sub_premises}{" "}
                          {customerData.thoroughfare_name === "null"
                            ? ""
                            : customerData.thoroughfare_name}{" "}
                          {customerData.county}
                        </div>
                        {notFound && `Customer not found!`}
                      </div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {customerData.postcode}
                      </div>
                    </td>
                    <td key={customer._id.toString() + "d"}>
                      <div key={index + 1}>{broadbandData.provider}</div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {broadbandData.technology}
                      </div>
                    </td>
                    <td key={customer._id.toString() + "e"} style={styles.btn}>
                      <Button
                        onClick={() => setFindContract(customer._id)}
                        id={customer._id}
                        size="sm"
                        className="shadow-none"
                      >
                        Contract Info
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  bottomRow: {
    fontSize: "12px",
    color: colors.darkGrey,
  },
  btn: {
    textAlign: "center",
    margin: "auto",
    padding: "10px",
  },
};
