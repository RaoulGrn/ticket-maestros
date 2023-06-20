import React, {useState} from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../util/AuthContext'; // Step 1
import './PublicNavbar.css'

const MyComponent = () => {
    const { logout } = useAuthContext(); // Step 2
    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleClose1 = () => setModalShow1(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Navbar collapseOnSelect className={"public-navbarz mb-6 vh-100"} expand="lg" style={{ backgroundImage: 'linear-gradient( black,#0c0c0c)' }} variant="dark">
                <Container>
                    <Link to="/" >
                        <Navbar.Brand className={"fs-1 fw-light"}>Ticket Maestro's</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav>
                            <Nav.Link href="#" onClick={() => setModalShow(true)}>
                                <span className={'spans-two'}>Register</span>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#" onClick={() => setModalShow1(true)}>
                                <span className={'spans-one'}>Login</span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginModal show={modalShow1} handleClose={handleClose1} />
            <RegisterModal show={modalShow} handleClose={handleClose} />
        </>
    );
};

export default MyComponent;