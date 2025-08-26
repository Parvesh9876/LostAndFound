import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyItems = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("http://localhost:3000/mypost", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyPosts(response.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold text-primary">
        📌 My Lost & Found Posts
      </h2>

      <style>{`
        .custom-card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          background-color: #ffffff;
        }
        .custom-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 123, 255, 0.25);
        }
        .custom-card-img {
          height: 220px;
          object-fit: cover;
          width: 100%;
        }
        .status-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .founded {
          color: green;
          border: 1px solid green;
        }
        .not-founded {
          color: orange;
          border: 1px solid orange;
        }
      `}</style>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Fetching your posts...</p>
        </div>
      ) : myPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-5"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Posts"
            style={{ width: "120px", marginBottom: "10px" }}
          />
          <p className="text-muted">You haven’t posted anything yet.</p>
          <Link to="/create-post">
            <Button variant="outline-primary">Create Your First Post</Button>
          </Link>
        </motion.div>
      ) : (
        <Row>
          {myPosts.map((post) => (
            <Col lg={4} md={6} sm={12} key={post._id} className="mb-4">
              <Link
                to={`/post/${post._id}`}
                className="text-decoration-none text-dark"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="custom-card position-relative">
                    <Card.Img
                      variant="top"
                      src={
                        post.imageUrl
                          ? `data:image/jpeg;base64,${post.imageUrl}`
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt="Post Image"
                      className="custom-card-img"
                    />

                    <span
                      className={`status-badge ${
                        post.Founded ? "founded" : "not-founded"
                      }`}
                    >
                      {post.Founded ? "✅ Founded" : "❌ Not Yet Found"}
                    </span>

                    <Card.Body>
                      <Card.Title className="fw-semibold mb-2">
                        {post.title || "Untitled Post"}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {post.description?.length > 100
                          ? post.description.slice(0, 100) + "..."
                          : post.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-light text-muted small">
                      Posted by <strong>{post.postedBy}</strong> on{" "}
                      {formatDate(post.postedAt)}
                    </Card.Footer>
                  </Card>
                </motion.div>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyItems;
