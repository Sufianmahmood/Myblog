import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result && Array.isArray(result.documents)) {
        setPosts(result.documents);
      } else {
        setPosts([]);
      }
    });
  }, []);

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-700">
            No posts found. Please login to view posts.
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
