import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import { Header, Footer } from "./components";

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
      .catch(() => dispatch(logout()));
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div
        className="max-w-[1300px] mx-auto grid 
        grid-cols-[250px_1fr_350px] gap-5 pt-3
        max-[1100px]:grid-cols-[80px_1fr] max-[1100px]:px-2"
      >
        {/* LEFT SIDEBAR */}
        <div className="sticky top-0 h-screen">
          <Header />
        </div>

        {/* CENTER FEED */}
        <main className="border-x border-gray-200">
          <Outlet /> {/* ⬅️ Handles all child routes */}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden max-[1100px]:hidden md:block"></aside>
      </div>

      <Footer />
    </div>
  );
}

export default App;
