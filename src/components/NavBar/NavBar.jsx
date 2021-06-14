import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import OneTouchLogo from '../../img/oneTouch/One-Touch-Logo.png';

export default function NavBar({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const admin = manageAppContext.accessToken.role;

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" className="one-touch-nav">
      <Container>
        <Navbar.Brand>
          <img
            onClick={() => manageAppContext.setPage('index')}
            src={OneTouchLogo}
            height="40px"
            className="d-inline-block align-top one-touch-logo"
            alt="One Touch Portal"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => manageAppContext.setPage('docs')}>
              Docs
            </Nav.Link>
            <NavDropdown title="Customers">
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('user-management')}
              >
                Address Book
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('live-connections')}
              >
                Manage Contracts
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('add-customer')}
              >
                Add Customer
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Broadband">
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('live-connections')}
              >
                Broadband Accounts
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('connection-checker')}
              >
                Add Broadband
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Admin">
              {admin && (
                <>
                  <NavDropdown.Item
                    onClick={() => manageAppContext.setPage('broadband-orders')}
                    className="admin-nav"
                  >
                    Broadband Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() =>
                      manageAppContext.setPage('user-address-book')
                    }
                    className="admin-nav"
                  >
                    User Address Book
                  </NavDropdown.Item>
                </>
              )}
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('build-in-progress')}
              >
                Account Overview
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('build-in-progress')}
              >
                Raise Ticket
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('build-in-progress')}
              >
                Reseller Customers
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => manageAppContext.setPage('my-account')}>
              My Account
            </Nav.Link>
            <Button
              onClick={() => {
                manageAppContext.setAccessToken(false);
                manageAppContext.setPage(false);
                manageAppContext.setPageData(false);
                sessionStorage.clear();
              }}
              variant="outline-danger"
            >
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
