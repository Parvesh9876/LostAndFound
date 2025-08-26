import React, { useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaLock, FaBell } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const Home = () => {
  const navigate = useNavigate();
  const loginRef = useRef(null);

  const handleGetStartedClick = () => {
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-wrapper">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .home-wrapper {
            background-color: #f8fafc;
            font-family: 'Segoe UI', sans-serif;
          }
          .hero-section {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            min-height: 100vh;
            color: white;
            position: relative;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .hero-content {
            text-align: center;
            z-index: 1;
          }
          .hero-title {
            font-weight: 700;
            font-size: 3rem;
            text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }
          .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
          }
          .hero-button {
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            padding: 0.75rem 2rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            transition: all 0.3s ease;
          }
          .hero-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
          }
          .hero-shapes {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 0;
            opacity: 0.2;
          }
          .shape-circle {
            position: absolute;
            top: 15%;
            left: 5%;
            width: 150px;
            height: 150px;
            background-color: #fff;
            border-radius: 50%;
          }
          .shape-triangle {
            position: absolute;
            bottom: 15%;
            right: 10%;
            width: 0;
            height: 0;
            border-left: 60px solid transparent;
            border-right: 60px solid transparent;
            border-bottom: 100px solid #fff;
          }
          .features-section {
            padding: 5rem 0;
            background-color: #fff;
          }
          .section-title {
            font-size: 2.5rem;
            color: var(--primary-color);
            font-weight: 700;
          }
          .feature-card {
            background-color: white;
            border-radius: 12px;
            border: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
            padding: 2rem 1.5rem;
            transition: transform 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-5px);
          }
          .feature-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          .cta-section {
            padding: 4rem 0;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
          }
          .cta-title {
            font-size: 2rem;
            font-weight: 700;
          }
          .cta-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 1.5rem;
          }
          .cta-button {
            font-weight: 600;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            background: linear-gradient(135deg, #198754, #28a745);
            border: none;
            color: white;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(25, 135, 84, 0.4);
          }

          @media (max-width: 768px) {
            .hero-title { font-size: 2.5rem; }
            .hero-subtitle { font-size: 1.25rem; }
            .section-title { font-size: 2rem; }
          }

          @media (max-width: 576px) {
            .hero-title { font-size: 2rem; }
            .hero-subtitle { font-size: 1rem; }
            .hero-button, .cta-button { width: 100%; }
            .section-title { font-size: 1.75rem; }
            .feature-icon { font-size: 2rem; }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-section animate__animated animate__fadeIn">
        <div className="hero-content">
          <h1 className="hero-title animate__fadeInDown">Rediscover What Matters</h1>
          <p className="hero-subtitle animate__fadeInUp">
            Lost something? Found something? We’re here to connect the dots.
          </p>
          <Button className="hero-button animate__zoomIn" onClick={handleGetStartedClick}>
            Get Started
          </Button>
        </div>
        <div className="hero-shapes">
          <div className="shape-circle animate__animated animate__pulse animate__infinite" />
          <div className="shape-triangle animate__animated animate__rotateIn animate__infinite animate__slower" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="section-title text-center mb-5 animate__fadeIn">Why Choose Us?</h2>
          <Row className="g-4">
            {[
              {
                icon: <FaMobileAlt className="feature-icon" />,
                title: 'Effortless Reporting',
                desc: 'Log found or lost items easily with images and details.',
              },
              {
                icon: <FaLock className="feature-icon" />,
                title: 'Trusted by All',
                desc: 'User identities are safe, verified, and protected.',
              },
              {
                icon: <FaBell className="feature-icon" />,
                title: 'Smart Notifications',
                desc: 'Receive alerts when your lost item is matched.',
              },
            ].map((item, index) => (
              <Col md={4} key={index}>
                <Card className="feature-card animate__fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card.Body>
                    {item.icon}
                    <h4 className="feature-title mt-3">{item.title}</h4>
                    <p className="feature-desc">{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-center" ref={loginRef}>
        <Container>
          <h2 className="cta-title animate__fadeIn">Join the Lost & Found Movement</h2>
          <p className="cta-subtitle animate__fadeInUp">
            Let’s bring things back to their rightful owners—together.
          </p>
          <Button className="cta-button animate__zoomIn" onClick={() => navigate('/login')}>
            Login to Report
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
