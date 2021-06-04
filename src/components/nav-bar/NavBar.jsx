import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import OneTouchLogo from '../../img/oneTouch/One-Touch-Logo.png';

export default function NavBar({ props }) {
  const { manageAppContext } = useContext(AppContext);

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
                onClick={() => manageAppContext.setPage('address-book')}
              >
                Address Book
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('manage-contracts')}
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
                onClick={() => manageAppContext.setPage('broadband-accounts')}
              >
                Broadband Accounts
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('add-broadband')}
              >
                Add Broadband
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Admin">
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('broadband-orders')}
                className="admin-nav"
              >
                Broadband Orders
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('user-address-book')}
                className="admin-nav"
              >
                User Address Book
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('account-overview')}
              >
                Account Overview
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('raise-ticket')}
              >
                Raise Ticket
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => manageAppContext.setPage('reseller-customers')}
              >
                Reseller Customers
              </NavDropdown.Item>
            </NavDropdown>
            <Button
              onClick={() => manageAppContext.setPage('logout')}
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
