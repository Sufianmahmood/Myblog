import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((postsResult) => {
      if (postsResult && postsResult.documents) {
        setPosts(postsResult.documents);
      }
      setLoading(false);
    }).catch((err) => {
      console.error("AllPosts.jsx :: error loading posts", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {loading ? (
            <p className="text-center w-full">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center w-full">No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
