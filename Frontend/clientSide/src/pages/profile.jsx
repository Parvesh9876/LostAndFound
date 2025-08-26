import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ text: "Failed to load profile data.", type: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/profile/change-password",
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: res.data.message, type: "success" });
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to change password",
        type: "danger",
      });
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <style>{`
        :root {
          --primary: #4a6fa5;
          --secondary: #6b89c9;
        }
        .profile-card {
          border: none;
          border-radius: 14px;
          overflow: hidden;
          width: 100%;
          max-width: 500px;
        }
        .profile-header {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 2rem;
          border-bottom: none;
        }
        .profile-header h3 {
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .profile-info p {
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
        }
        .profile-info strong {
          color: var(--primary);
        }
        .password-input {
          position: relative;
        }
        .password-input .form-control {
          padding-left: 2.5rem;
        }
        .input-icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: var(--primary);
        }
        .submit-btn {
          padding: 0.75rem;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          border-radius: 10px;
          color: #fff;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }
        .back-btn {
          background-color: white;
          border: 1px solid var(--primary);
          color: var(--primary);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .back-btn:hover {
          background-color: #f0f8ff;
        }
      `}</style>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : user ? (
        <Card className="profile-card shadow-lg animate__animated animate__fadeIn">
          <div className="profile-header">
            <h3>👤 My Profile</h3>
            <small>Manage your account details</small>
          </div>
          <Card.Body className="p-4">
            <Button
              className="mb-3 back-btn"
              onClick={() => navigate("/posts")}
            >
              ← Back to Posts
            </Button>

            {message.text && (
              <Alert
                variant={message.type}
                className="animate__animated animate__fadeInDown"
                dismissible
                onClose={() => setMessage({ text: "", type: "" })}
              >
                {message.text}
              </Alert>
            )}

            <div className="profile-info mb-4">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Mobile Number:</strong> {user.mobileNumber}
              </p>
            </div>

            <hr />
            <h5 className="mb-3">🔐 Change Password</h5>
            <Form onSubmit={handlePasswordChange}>
              <Form.Group className="mb-3 password-input">
                <Form.Label htmlFor="oldPassword">Old Password</Form.Label>
                <i className="bi bi-lock input-icon"></i>
                <Form.Control
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handleChange}
                  required
                  placeholder="Current password"
                />
              </Form.Group>

              <Form.Group className="mb-4 password-input">
                <Form.Label htmlFor="newPassword">New Password</Form.Label>
                <i className="bi bi-shield-lock-fill input-icon"></i>
                <Form.Control
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="New password"
                />
              </Form.Group>

              <Button
                className="submit-btn w-100"
                type="submit"
                disabled={!passwordData.oldPassword || !passwordData.newPassword}
              >
                Update Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger">Unable to load profile data.</Alert>
      )}
    </Container>
  );
};

export default Profile;
