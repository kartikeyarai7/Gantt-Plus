import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Actions/userActions';
import logo from '../data/logo-gd.png';

const Navigation = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar expand='lg' variant='dark' className='p-2 color'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt='Scheduler' className='im'></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {userInfo && userInfo.username && (
                <Nav.Link as={Link} to='/resources'>
                  Resources
                </Nav.Link>
              )}

              {userInfo && userInfo.username && (
                <Nav.Link as={Link} to='/jobs'>
                  Jobs
                </Nav.Link>
              )}

              {userInfo && userInfo.username && (
                <NavDropdown title='Schedule' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/project-schedule'>Project-Wise</NavDropdown.Item>
                  <NavDropdown.Item href='/resource-schedule'> Resource-Wise </NavDropdown.Item>
                  <NavDropdown.Item href='/activity-calendar-bps'> Activity Calendar-BPS </NavDropdown.Item>
                  <NavDropdown.Item href='/activity-calendar-bds'> Activity Calendar-BDS </NavDropdown.Item>
                </NavDropdown>
              )}

              {userInfo && userInfo.username && (
                <Nav.Link as={Link} to='/report'>
                  Reports
                </Nav.Link>
              )}

              {userInfo ? (
                <>
                  <NavDropdown title={`${userInfo.username}`} id='basic-nav-dropdown'>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
