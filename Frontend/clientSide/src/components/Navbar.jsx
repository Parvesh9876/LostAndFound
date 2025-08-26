import React from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle, BsBoxSeam, BsSearch, BsHouseDoor } from "react-icons/bs";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import "./Navbar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="app-navbar">
      <Container>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <span className="logo-icon">🔍</span>
            <span className="logo-text">Lost & Found</span>
          </Navbar.Brand>
        </motion.div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Nav.Link as={Link} to="/" className="nav-link">
                <BsHouseDoor className="nav-icon" />
                Home
              </Nav.Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Nav.Link as={Link} to="/posts" className="nav-link">
                <BsBoxSeam className="nav-icon" />
                Report Lost
              </Nav.Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Nav.Link as={Link} to="/report-found" className="nav-link">
                <BsSearch className="nav-icon" />
                Report Found
              </Nav.Link>
            </motion.div>
            
            {isLoggedIn && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Nav.Link as={Link} to="/mylist" className="nav-link">
                  <BsBoxSeam className="nav-icon" />
                  My Items
                </Nav.Link>
              </motion.div>
            )}
          </Nav>

          <div className="navbar-actions">
            {isLoggedIn ? (
              <Dropdown align="end">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Dropdown.Toggle variant="link" className="user-dropdown">
                    <BsPersonCircle size={24} className="user-icon" />
                  </Dropdown.Toggle>
                </motion.div>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item as={Link} to="/profile" className="dropdown-item">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider className="dropdown-divider" />
                  <Dropdown.Item 
                    onClick={handleLogout} 
                    className="dropdown-item logout-item"
                  >
                    <FiLogOut className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="primary" 
                  onClick={handleLogin}
                  className="login-button"
                >
                  <FiLogIn className="me-2" />
                  Login
                </Button>
              </motion.div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;