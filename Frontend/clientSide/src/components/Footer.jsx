import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // ✅ Import icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-dark text-white py-5" role="contentinfo">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .footer-section {
            background-color: #212529;
            border-top: 2px solid #e9ecef;
          }
          .footer-link {
            color: #fff;
            text-decoration: none;
            font-size: 1rem;
            transition: all 0.3s ease;
          }
          .footer-link:hover {
            color: var(--primary-color);
            transform: translateY(-2px);
          }
          .footer-icon {
            color: #fff;
            font-size: 1.5rem;
            margin: 0 0.5rem;
            transition: all 0.3s ease;
          }
          .footer-icon:hover {
            color: var(--primary-color);
            transform: scale(1.2);
          }
          .footer-title {
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          .footer-text {
            color: #f8fafc;
            font-size: 0.9rem;
          }
          .footer-contact {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
          }
          .footer-contact a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
          }
          .footer-contact a:hover {
            text-decoration: underline;
          }
          @media (max-width: 768px) {
            .footer-title {
              font-size: 1.2rem;
            }
            .footer-link, .footer-text {
              font-size: 0.85rem;
            }
            .footer-icon {
              font-size: 1.3rem;
            }
          }
          @media (max-width: 576px) {
            .footer-section {
              padding: 2rem 0;
            }
            .footer-title {
              font-size: 1.1rem;
            }
            .footer-link, .footer-text {
              font-size: 0.8rem;
            }
            .footer-icon {
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      <Container>
        <Row className="animate__animated animate__fadeInUp">
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Lost & Found</h5>
            <p className="footer-text">
              Helping you reconnect with lost items or return found treasures to their owners.
            </p>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link" aria-label="Go to Home">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/posts" className="footer-link" aria-label="Go to Posts">Posts</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="footer-link" aria-label="Go to Profile">Profile</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link" aria-label="Go to Contact">Contact</Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <div className="footer-contact">
              <p className="footer-text mb-2">
                <i className="bi bi-envelope me-2"></i>
                <a href="mailto:support@lostandfound.com" aria-label="Email support">
                  support@lostandfound.com
                </a>
              </p>
              <div className="d-flex">
                <a
                  href="https://twitter.com"
                  className="footer-icon"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a
                  href="https://facebook.com"
                  className="footer-icon"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://instagram.com"
                  className="footer-icon"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p className="footer-text mb-0">
              &copy; {currentYear} Lost & Found. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
