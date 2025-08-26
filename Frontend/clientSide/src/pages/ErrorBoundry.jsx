
import React, { Component } from 'react';
import { Alert, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <style>
            {`
              :root {
                --primary-color: #4a6fa5;
                --secondary-color: #6b89c9;
              }
              .error-alert {
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                color: #dc3545;
                font-weight: 500;
              }
              .error-button {
                padding: 0.5rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border: none;
                box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
                transition: all 0.3s ease;
                color: white;
              }
              .error-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
                color: white;
              }
            `}
          </style>
          <Alert variant="danger" className="error-alert text-center animate__animated animate__fadeIn">
            <i className="bi bi-exclamation-circle me-2"></i>
            Something went wrong: {this.state.errorMessage}
            <div className="mt-3">
              <Button
                className="error-button"
                onClick={() => window.location.reload()}
                aria-label="Reload the page"
              >
                Reload Page
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
