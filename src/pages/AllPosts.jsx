import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((postsResult) => {
        if (postsResult && postsResult.documents) {
          setPosts(postsResult.documents);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("AllPosts.jsx :: error loading posts", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full py-6 flex justify-center">
      <Container>
        <div className="max-w-xl mx-auto">

          {loading ? (
            <p className="text-center">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center">No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="mb-4">
                <PostCard {...post} />
              </div>
            ))
          )}

        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
