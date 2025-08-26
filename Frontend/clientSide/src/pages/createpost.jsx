import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card, ProgressBar } from 'react-bootstrap';
import { FiUpload, FiImage, FiEdit2, FiX, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Createpost.css';

const MAX_IMAGE_SIZE_MB = 5;

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024;

      if (!isValidType) {
        return setMessage({ text: 'Only JPG and PNG formats are supported.', type: 'danger' });
      }
      if (!isValidSize) {
        return setMessage({ text: 'Image size should be less than 5MB.', type: 'danger' });
      }

      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage({ text: '', type: '' });
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage({ text: 'Please login to create a post.', type: 'danger' });
      setIsSubmitting(false);
      return;
    }

    if (!imageFile) {
      setMessage({ text: 'Please select an image to upload.', type: 'danger' });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('description', description.trim());
    formData.append('image', imageFile);

    try {
      const res = await axios.post('http://localhost:3000/newpost', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      setMessage({
        text: res.data.message || 'Post created successfully!',
        type: 'success',
      });

      setTimeout(() => {
        navigate('/posts');
      }, 1500);
    } catch (error) {
      console.error('Post creation failed:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to create post.',
        type: 'danger',
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Container className="create-post-page py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="create-post-card shadow-lg">
          <Card.Header className="create-post-header text-center">
            <h2>Create New Post</h2>
            <p className="text-muted">Share your lost or found item with the community</p>
          </Card.Header>

          <Card.Body>
            {message.text && (
              <Alert variant={message.type} className="mb-4">
                {message.type === 'success' && <FiCheckCircle className="me-2" />}
                {message.text}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="description" className="mb-4">
                <Form.Label>Description</Form.Label>
                <div className="description-input">
                  <FiEdit2 className="input-icon" />
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="What did you lose or find? Mention location & details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="image" className="mb-4">
                <Form.Label>Upload Image</Form.Label>
                {previewUrl ? (
                  <div className="image-preview-container">
                    <div className="image-preview-wrapper">
                      <img src={previewUrl} alt="Preview" className="image-preview" />
                      <Button
                        variant="danger"
                        size="sm"
                        className="remove-image-btn"
                        onClick={handleRemoveImage}
                        aria-label="Remove image"
                      >
                        <FiX />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="upload-area text-center"
                    onClick={() => fileInputRef.current.click()}
                    role="button"
                    aria-label="Upload Image"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') fileInputRef.current.click();
                    }}
                  >
                    <FiUpload size={48} className="mb-3" />
                    <p>Click to upload or drag and drop your image</p>
                    <p className="text-muted">Supported formats: JPG, PNG | Max size: 5MB</p>
                    <Form.Control
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png"
                      className="d-none"
                      required
                    />
                  </div>
                )}
              </Form.Group>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <ProgressBar
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="mb-4"
                  animated
                />
              )}

              <div className="d-flex justify-content-end">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    aria-label="Submit post"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Posting...
                      </>
                    ) : (
                      <>
                        <FiImage className="me-2" />
                        Create Post
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default CreatePost;
