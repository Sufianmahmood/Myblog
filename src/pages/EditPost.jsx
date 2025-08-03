import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    appwriteService
      .getPost(slug)
      .then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.error("EditPost.jsx :: getPost error", err);
        navigate('/');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Loading post...</h2>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-red-500">Post not found.</p>
    </div>
  );
}

export default EditPost;
