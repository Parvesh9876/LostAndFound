import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Form, Button, Spinner, Alert, Card
} from 'react-bootstrap';
import {
  FiSearch, FiPlusCircle, FiUser, FiAlertTriangle, FiInfo
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Post.css';

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
        const postData = res.data || [];
        setPosts(postData);
        setFilteredPosts(postData);
      } catch (err) {
        setError(
          err.response?.status === 401
            ? 'Unauthorized. Token may be expired.'
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
    const results = posts.filter(post => {
      const matchesSearch = post.postedBy.toLowerCase().includes(lowerSearch)
        || post.description.toLowerCase().includes(lowerSearch);

      const matchesCategory = selectedCategory === 'all'
        || (post.category?.toLowerCase() === selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(results);
  }, [searchTerm, posts, selectedCategory]);

  const renderCategoryBadge = (category) => {
    const categoryColors = {
      electronics: 'primary',
      documents: 'warning',
      jewelry: 'info',
      clothing: 'success',
      other: 'secondary'
    };

    return (
      <span className={`badge bg-${categoryColors[category] || 'secondary'}`}>
        {category}
      </span>
    );
  };

  return (
    <Container className="show-post-page py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4 section-title">Lost and Found Posts</h2>

        {/* Filters */}
        <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between mb-4">
          <div className="search-box position-relative flex-grow-1">
            <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
            <Form.Control
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ps-5"
            />
          </div>

          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-auto"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="documents">Documents</option>
            <option value="jewelry">Jewelry</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </Form.Select>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button as={Link} to="/create-post" variant="primary">
              <FiPlusCircle className="me-2" /> Create New Post
            </Button>
          </motion.div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading posts...</p>
          </div>
        )}

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Alert variant="danger" className="text-center">
                <FiAlertTriangle className="me-2" /> {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Posts */}
        {!loading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-5"
          >
            <FiInfo size={48} className="text-muted mb-3" />
            <h4>No posts found</h4>
            <p className="text-muted">
              {searchTerm || selectedCategory !== 'all'
                ? "Try adjusting your search or filter criteria."
                : "There are currently no posts available."}
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
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/post/${post._id}`} className="post-card-link">
                    <Card className="h-100 post-card">
                      {/* Header */}
                      <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                        <div className="d-flex align-items-center gap-2">
                          {post.userImage ? (
                            <img
                              src={`data:image/jpeg;base64,${post.userImage}`}
                              alt="User"
                              className="rounded-circle"
                              width="35"
                              height="35"
                            />
                          ) : (
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: 35, height: 35 }}>
                              <FiUser />
                            </div>
                          )}
                          <strong className="small">{post.postedBy}</strong>
                        </div>
                        {post.category && renderCategoryBadge(post.category)}
                      </Card.Header>

                      {/* Image */}
                      <div className="post-image-container">
                        {post.imageUrl ? (
                          <Card.Img
                            variant="top"
                            src={`data:image/jpeg;base64,${post.imageUrl}`}
                            className="post-image"
                          />
                        ) : (
                          <div className="bg-light text-muted d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                            No Image Available
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <Card.Body>
                        <Card.Text className="text-muted">
                          {post.description.length > 100
                            ? `${post.description.slice(0, 100)}...`
                            : post.description}
                        </Card.Text>
                      </Card.Body>

                      {/* Footer */}
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
      </motion.div>
    </Container>
  );
};

export default ShowPost;
