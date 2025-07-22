import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import {
  
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  const handleRegistroClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLoginClick = () => {
    setShowModal(false);
    navigate('/login');
  };

  window.addEventListener("scroll", scrollHandler);

  return (
    <>
      <Navbar
        expanded={expand}
        fixed="top"
        expand="md"
        className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            {/*<img src={logo} className="img-fluid logo" alt="brand" />*/}
            <h3 style={{color: "#006a9d"}}>Logo</h3>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => {
              updateExpanded(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Inicio
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/registro"
                  onClick={handleRegistroClick}
                >
                  <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> Registrá tu artículo
                </Nav.Link>
              </Nav.Item>
            {/*
            
          
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/project"
                  onClick={() => updateExpanded(false)}
                >
                  <CgFileDocument
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  ¿Quienes somos?
                </Nav.Link>
              </Nav.Item>
  */}
              {user ? (
                <>
                  <Nav.Item className="fork-btn">
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="primary" id="dropdown-user" style={{ fontWeight: "bold", background: "#006a9d", border: "none" }}>
                        <AiOutlineUser style={{ marginBottom: "2px" }} /> {user.nombre} {user.apellido}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/perfil")} style={{ color: "black" }}>
                          <AiOutlineUser style={{ fontSize: "1.2em" }} /> Mi perfil
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} style={{ color: "black" }}>
                          <AiOutlineLogout style={{ fontSize: "1.2em" }} /> Cerrar sesión
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item className="fork-btn">
                  <Button
                    onClick={() => navigate("/login")}
                    className="fork-btn-inner"
                  >
                    <AiOutlineUser style={{ fontSize: "1.2em" }} />{" "}
                    Iniciar sesión
                  </Button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión requerido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Para registrar un producto debes iniciar sesión primero.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLoginClick}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
