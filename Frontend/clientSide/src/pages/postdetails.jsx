import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FiSearch, FiPlusCircle, FiUser, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      const Token = localStorage.getItem('Token');

      if (!Token) {
        setError('Please login to view posts.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/showpost', {
          headers: { Authorization: `Bearer ${Token}` }
        });

        setPosts(res.data || []);
        setFilteredPosts(res.data || []);
      } catch (err) {
        setError(
          err.response?.status === 401
            ? 'Unauthorized. Invalid or expired token.'
            : 'Failed to fetch posts. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = posts.filter(post => {
      const matchesSearch =
        post.postedBy?.toLowerCase().includes(lowerSearch) ||
        post.description?.toLowerCase().includes(lowerSearch);
      const matchesCategory =
        selectedCategory === 'all' || post.category?.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📢 Lost and Found Posts
      </motion.h2>

      {/* Filter Controls */}
      <Row className="mb-4 align-items-center g-3">
        <Col md={4}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="position-absolute top-50 end-0 me-3 translate-middle-y text-muted" />
          </div>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="documents">Documents</option>
            <option value="jewelry">Jewelry</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button as={Link} to="/create-post" variant="success">
              <FiPlusCircle className="me-2" />
              Create New Post
            </Button>
          </motion.div>
        </Col>
      </Row>

      {/* Loading and Errors */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3">Loading posts...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          <FiAlertTriangle className="me-2" />
          {error}
        </Alert>
      )}

      {!loading && filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FiInfo size={48} className="text-muted mb-3" />
          <h4>No posts found</h4>
          <p className="text-muted">
            {searchTerm || selectedCategory !== 'all'
              ? 'Try changing your search or filter.'
              : 'No posts available right now.'}
          </p>
        </motion.div>
      )}

      {/* Posts Grid */}
      <Row className="g-4">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <Col key={post._id} xs={12} sm={6} lg={4}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/post/${post._id}`} className="text-decoration-none text-dark">
                  <Card className="shadow-sm h-100">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                      <div className="d-flex align-items-center">
                        {post.userImage ? (
                          <img
                            src={`data:image/jpeg;base64,${post.userImage}`}
                            alt="User"
                            className="rounded-circle me-2"
                            style={{ width: 36, height: 36, objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2" style={{ width: 36, height: 36 }}>
                            <FiUser />
                          </div>
                        )}
                        <strong>{post.postedBy}</strong>
                      </div>
                      {post.category && (
                        <span className="badge bg-primary text-capitalize">{post.category}</span>
                      )}
                    </Card.Header>

                    {post.imageUrl ? (
                      <Card.Img
                        variant="top"
                        src={`data:image/jpeg;base64,${post.imageUrl}`}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          height: '200px',
                          background: '#f0f0f0',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontStyle: 'italic'
                        }}
                      >
                        No Image Available
                      </div>
                    )}

                    <Card.Body>
                      <Card.Text>
                        {post.description?.length > 100
                          ? `${post.description.slice(0, 100)}...`
                          : post.description}
                      </Card.Text>
                    </Card.Body>

                    <Card.Footer className="text-muted small text-end">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Card.Footer>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </AnimatePresence>
      </Row>
    </Container>
  );
};

export default ShowPost;
