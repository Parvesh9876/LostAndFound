// Imports remain the same...
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const token = localStorage.getItem('Token');

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateName = (name) =>
    /^[a-zA-Z\s]{2,50}$/.test(name);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(formData.name)) {
      return setMessage({ text: 'Please enter a valid name.', type: 'danger' });
    }

    if (!validateEmail(formData.email)) {
      return setMessage({ text: 'Invalid email address.', type: 'danger' });
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/contact', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to send message.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
            --bg-light: #f8fafc;
          }
          .contact-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            max-width: 800px;
            margin: 0 auto;
          }
          .contact-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem;
          }
          .contact-header h3 {
            font-weight: 700;
          }
          .input-icon {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
            font-size: 1.2rem;
            color: var(--primary-color);
          }
          .contact-input .form-control {
            padding-left: 45px;
            border-radius: 8px;
            font-size: 1rem;
          }
          .contact-input textarea.form-control {
            min-height: 150px;
          }
          .submit-btn,
          .back-btn {
            border-radius: 8px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .submit-btn {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
          }
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
          }
          .submit-btn:disabled {
            opacity: 0.7;
          }
          .back-btn {
            background: white;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
          }
          .back-btn:hover {
            background-color: #f1f1f1;
          }
          .contact-info {
            background: var(--bg-light);
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.08);
          }
          .social-icon {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin-right: 0.5rem;
            transition: transform 0.3s;
          }
          .social-icon:hover {
            color: var(--secondary-color);
            transform: scale(1.2);
          }
          @media (max-width: 576px) {
            .submit-btn {
              width: 100%;
            }
          }
        `}
      </style>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Button
            className="back-btn mb-4 animate__animated animate__fadeIn"
            onClick={() => navigate('/posts')}
            aria-label="Back to posts"
          >
            <i className="bi bi-arrow-left me-2"></i> Back to Posts
          </Button>

          <Card className="contact-card shadow-lg animate__animated animate__fadeIn">
            <div className="contact-header">
              <h3>📬 Contact Us</h3>
              <p>We'd love to hear from you!</p>
            </div>
            <Card.Body className="p-4">
              {message.text && (
                <div aria-live="polite">
                  <Alert
                    variant={message.type}
                    className="animate__animated animate__fadeInDown"
                    dismissible
                    onClose={() => setMessage({ text: '', type: '' })}
                  >
                    {message.type === 'success' ? (
                      <i className="bi bi-check-circle me-2"></i>
                    ) : (
                      <i className="bi bi-exclamation-circle me-2"></i>
                    )}
                    {message.text}
                  </Alert>
                </div>
              )}

              <Row>
                <Col md={6} className="mb-4">
                  <Form onSubmit={handleSubmit} noValidate>
                    {['name', 'email', 'message'].map((field, i) => (
                      <Form.Group key={i} className="mb-3 contact-input position-relative">
                        <Form.Label htmlFor={field}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Form.Label>
                        <i className={`bi bi-${field === 'name' ? 'person' : field === 'email' ? 'envelope' : 'chat-text'} input-icon`}></i>
                        <Form.Control
                          id={field}
                          name={field}
                          type={field === 'message' ? undefined : field}
                          as={field === 'message' ? 'textarea' : 'input'}
                          rows={field === 'message' ? 5 : undefined}
                          placeholder={
                            field === 'message' ? 'Write your message here' : `Enter your ${field}`
                          }
                          value={formData[field]}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    ))}
                    <div className="d-grid">
                      <Button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Col>

                <Col md={6}>
                  <div className="contact-info">
                    <h5 style={{ color: 'var(--primary-color)' }}>Contact Info</h5>
                    <p>
                      <i className="bi bi-envelope me-2"></i>
                      <a href="mailto:support@lostandfound.com">support@lostandfound.com</a>
                    </p>
                    <p>
                      <i className="bi bi-telephone me-2"></i>
                      <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </p>
                    <p>
                      <i className="bi bi-geo-alt me-2"></i>
                      123 Lost & Found Street, City, Country
                    </p>
                    <div className="d-flex mt-2">
                      {['twitter-x', 'facebook', 'instagram'].map((icon, idx) => (
                        <a
                          key={idx}
                          href={`https://${icon.split('-')[0]}.com`}
                          className="social-icon"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit us on ${icon}`}
                        >
                          <i className={`bi bi-${icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
