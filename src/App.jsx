import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import {
  Header,
  Footer,
  AuthLayout,
} from "./components";

import {
  Home,
  Login,
  Signup,
  Post,
  AddPost,
  AllPosts,
  EditPost,
} from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("App.jsx :: getCurrentUser error:", error);
        dispatch(logout());
      });
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          } />
          <Route path="/signup" element={
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          } />
          <Route path="/all-posts" element={
            <AuthLayout>
              <AllPosts />
            </AuthLayout>
          } />
          <Route path="/add-post" element={
            <AuthLayout>
              <AddPost />
            </AuthLayout>
          } />
          <Route path="/edit-post/:slug" element={
            <AuthLayout>
              <EditPost />
            </AuthLayout>
          } />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
