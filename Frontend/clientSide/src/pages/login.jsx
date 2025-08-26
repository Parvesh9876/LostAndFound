import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FiLogIn, FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    if (!formData.username.trim() || !formData.password.trim()) {
      setMessage({ text: 'All fields are required.', type: 'danger' });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/login', formData);
      localStorage.setItem('token', data.token);

      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });

      setTimeout(() => navigate('/posts'), 1500);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setMessage({ text: errMsg, type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <motion.div
          className="login-card shadow-lg p-4 rounded bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-header text-center mb-4">
            <motion.div
              className="login-icon mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FiLogIn size={40} />
            </motion.div>
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">Enter your credentials to continue</p>
          </div>

          {message.text && (
            <Alert variant={message.type} className="text-center">
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <div className="input-group">
                <span className="input-icon"><FiUser /></span>
                <Form.Control
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  ref={usernameRef}
                  required
                  autoComplete="username"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="password">Password</Form.Label>
              <div className="input-group">
                <span className="input-icon"><FiLock /></span>
                <Form.Control
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>
            </Form.Group>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="primary"
                className="w-100 d-flex justify-content-center align-items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Logging in...
                  </>
                ) : (
                  <>
                    Login <FiArrowRight />
                  </>
                )}
              </Button>
            </motion.div>
          </Form>

          <div className="login-footer text-center mt-4">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="signup-link fw-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;
