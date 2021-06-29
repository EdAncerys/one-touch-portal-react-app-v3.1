import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import OneTouchLogo from '../../img/oneTouch/One-Touch-Logo.png';

export default function NavBar({ props }) {
  const { manageAppContext } = useContext(AppContext);

  const admin = manageAppContext.accessToken.role;
  const page = manageAppContext.page;
  const setPageData = manageAppContext.setPageData;

  return (
    <Navbar collapseOnSelect expand="lg" className="one-touch-nav">
      <Container style={{ backgroundColor: '#BABABA' }}>
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
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: 'space-between' }}
        >
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                if (page !== 'docs') setPageData(false);
                manageAppContext.setPage('docs');
              }}
            >
              Docs
            </Nav.Link>
            <NavDropdown title="Customers">
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'user-management') setPageData(false);
                  manageAppContext.setPage('user-management');
                }}
              >
                Address Book
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'live-connections') setPageData(false);
                  manageAppContext.setPage('live-connections');
                }}
              >
                Manage Contracts
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'add-customer') setPageData(false);
                  manageAppContext.setPage('add-customer');
                }}
              >
                Add Customer
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Broadband">
              <NavDropdown.Item
                onClick={() => {
                  setPageData(false);
                  manageAppContext.setPage('live-connections');
                }}
              >
                Broadband Accounts
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'connection-checker') setPageData(false);
                  manageAppContext.setPage('connection-checker');
                }}
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
                    onClick={() => {
                      if (page !== 'broadband-orders') setPageData(false);
                      manageAppContext.setPage('broadband-orders');
                    }}
                    className="admin-nav"
                  >
                    Broadband Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      if (page !== 'user-address-book') setPageData(false);
                      manageAppContext.setPage('user-address-book');
                    }}
                    className="admin-nav"
                  >
                    User Address Book
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      if (page !== 'portal-users') setPageData(false);
                      manageAppContext.setPage('portal-users');
                    }}
                    className="admin-nav"
                  >
                    Portal Users
                  </NavDropdown.Item>
                </>
              )}
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'build-in-progress') setPageData(false);
                  manageAppContext.setPage('build-in-progress');
                }}
              >
                Account Overview
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'raise-ticket') setPageData(false);
                  manageAppContext.setPage('raise-ticket');
                }}
              >
                Raise Ticket
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  if (page !== 'build-in-progress') setPageData(false);
                  manageAppContext.setPage('build-in-progress');
                }}
              >
                Reseller Customers
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() => {
                if (page !== 'my-account') setPageData(false);
                manageAppContext.setPage('my-account');
              }}
            >
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
