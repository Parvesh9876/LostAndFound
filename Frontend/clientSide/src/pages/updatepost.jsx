
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('Token');

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/postbyid/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const post = res.data.post;
        setDescription(post.description);
        setCurrentImage(post.imageUrl); // base64 string
        setLoading(false);
      } catch (err) {
        setError('Failed to load post.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById('image').value = '';
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    try {
      await axios.put(`http://localhost:3000/updatepost/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post updated successfully!');
      navigate('/posts');
    } catch (err) {
      console.error(err);
      alert('Update failed!');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" style={{ color: '#4a6fa5' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .update-post-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
          }
          .update-post-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem;
            border-bottom: none;
          }
          .update-post-header h2 {
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .description-input .form-control {
            padding-left: 45px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
            min-height: 150px;
            font-size: 1rem;
          }
          .description-input .input-icon {
            position: absolute;
            top: 15px;
            left: 15px;
            color: var(--primary-color);
            font-size: 1.2rem;
          }
          .current-image-container {
            display: flex;
            justify-content: center;
            margin-top: 0.5rem;
          }
          .current-image {
            max-width: 100%;
            max-height: 300px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .upload-area {
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            background-color: #f8fafc;
            transition: all 0.3s ease;
          }
          .upload-area:hover {
            border-color: var(--primary-color);
            background-color: rgba(74, 111, 165, 0.05);
          }
          .image-preview-container {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
          }
          .image-preview-wrapper {
            position: relative;
            max-width: 100%;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .image-preview {
            max-width: 100%;
            max-height: 300px;
            object-fit: contain;
          }
          .remove-image-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #dc3545;
            color: white;
            border: none;
            transition: all 0.3s ease;
          }
          .remove-image-btn:hover {
            background-color: #c82333;
          }
          .submit-btn {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
            transition: all 0.3s ease;
            color: white;
          }
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
            color: white;
          }
          .submit-btn:disabled {
            opacity: 0.7;
            transform: none;
          }
          @media (max-width: 768px) {
            .update-post-header {
              padding: 1.5rem;
            }
            .current-image,
            .image-preview {
              max-height: 250px;
            }
          }
          @media (max-width: 576px) {
            .update-post-header {
              padding: 1.25rem;
            }
            .update-post-header h2 {
              font-size: 1.5rem;
            }
            .current-image,
            .image-preview {
              max-height: 200px;
            }
            .submit-btn {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card update-post-card shadow-lg animate__animated animate__fadeIn">
            <div className="update-post-header">
              <h2 className="mb-0">✏️ Update Lost & Found Post</h2>
              <p>Edit the details of your post</p>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger alert-dismissible fade show animate__animated animate__fadeInDown" role="alert">
                  {error}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4 description-input position-relative">
                  <label htmlFor="description" className="form-label fw-bold">Description</label>
                  <i className="bi bi-pencil input-icon"></i>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                    aria-describedby="descriptionHelp"
                    placeholder="Describe the lost or found item..."
                  />
                  <div id="descriptionHelp" className="form-text">Provide details about the item (e.g., type, color, location).</div>
                </div>
                {currentImage && (
                  <div className="mb-4">
                    <label className="form-label fw-bold">Current Image</label>
                    <div className="current-image-container">
                      <img
                        src={`data:image/jpeg;base64,${currentImage}`}
                        alt="Current item"
                        className="current-image animate__animated animate__zoomIn"
                      />
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-bold">Replace Image (optional)</label>
                  <div className="upload-area">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="form-control d-none"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image" className="mb-0" style={{ cursor: 'pointer' }}>
                      <i className="bi bi-upload me-2"></i>
                      Click to upload a new image
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="image-preview-container mt-3">
                      <div className="image-preview-wrapper">
                        <img
                          src={imagePreview}
                          alt="Image preview"
                          className="image-preview animate__animated animate__zoomIn"
                        />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={handleRemoveImage}
                          aria-label="Remove image"
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  <div id="imageHelp" className="form-text mt-2">Upload a new image to replace the current one.</div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn submit-btn" disabled={loading}>
                    Update Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;