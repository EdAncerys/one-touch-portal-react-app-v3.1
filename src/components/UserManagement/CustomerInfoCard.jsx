import React, { useContext } from "react";
import { AppContext } from "../../App";
import { Card, Table, Button } from "react-bootstrap";

import NDGBanner from "../NDGBanner";
import { colors } from "../../config/colors";

export default function CustomerInfoCard({ findCustomer, setFindCustomer }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let data = pageData.filter((customer) => customer._id === findCustomer)[0]
    .oneTouchCustomer;
  console.log(data);

  return (
    <>
      <div className="features-align-right">
        <div style={styles.btn}>
          <Button
            onClick={() => setFindCustomer(false)}
            variant="outline-dark"
            size="sm"
          >
            <span aria-hidden="true">×</span>
          </Button>
        </div>
      </div>
      <div className="features">
        <div className="flex-container-50">
          <Card
            bg="Light"
            text="dark"
            style={{ width: "100%" }}
            className="mb-2"
          >
            <Card.Header>
              <div>Company Information</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>Company Name</td>
                    <td>{data.companyName}</td>
                  </tr>
                  <tr>
                    <td>Product Type</td>
                    <td>{data.productType}</td>
                  </tr>
                  <tr>
                    <td>Company Email</td>
                    <td>{data.companyEmail}</td>
                  </tr>
                  <tr>
                    <td>Company Phone Number</td>
                    <td>{data.companyPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Account Manager</td>
                    <td>{data.accountManager}</td>
                  </tr>
                  <tr>
                    <td>Company Registration</td>
                    <td>{data.companyRegistration}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        <div className="flex-container-50">
          <Card
            bg="Light"
            text="dark"
            style={{ width: "100%" }}
            className="mb-2"
          >
            <Card.Header>
              <div>Customer Information</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>{data.customerFName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{data.customerLName}</td>
                  </tr>
                  <tr>
                    <td>Customer Email</td>
                    <td>{data.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>Customer Phone Number</td>
                    <td>{data.customerPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Notes</td>
                    <td>{data.customerNotes}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="features-align-left ">
        <div className="flex-container-50">
          <Card
            bg="Light"
            text="dark"
            style={{ width: "100%" }}
            className="mb-2"
          >
            <Card.Header>
              <div>Site Installation Details</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>Contact Name</td>
                    <td>{data.contactFName}</td>
                  </tr>
                  <tr>
                    <td>Contact Last Name</td>
                    <td>{data.contactLName}</td>
                  </tr>
                  <tr>
                    <td>Contact Email</td>
                    <td>{data.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone Number</td>
                    <td>{data.customerPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Installation Address</td>
                    <td>
                      <div>
                        {data.thoroughfare_number === "null"
                          ? ""
                          : data.thoroughfare_number}{" "}
                        {data.premises_name === "null"
                          ? ""
                          : data.premises_name}{" "}
                        {data.sub_premises === "null" ? "" : data.sub_premises}{" "}
                        {data.thoroughfare_name === "null"
                          ? ""
                          : data.thoroughfare_name}{" "}
                        {data.county}
                      </div>
                      <div style={styles.bottomRow}>{data.postcode}</div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="features">
        <NDGBanner width="flex-container-30" />
      </div>
    </>
  );
}

const styles = {
  bottomRow: {
    fontSize: "12px",
    color: colors.darkGrey,
  },
  btn: {
    padding: "5px",
  },
};
