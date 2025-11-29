import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

import { 
  FaHome, 
  FaPlusCircle, 
  FaListUl, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus,
  FaUserCircle       // ✅ Profile Icon
} from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menu = [
    { name: "Home", slug: "/", icon: <FaHome />, show: true },
    { name: "Login", slug: "/login", icon: <FaSignInAlt />, show: !authStatus },
    { name: "Sign Up", slug: "/signup", icon: <FaUserPlus />, show: !authStatus },
    { name: "All Posts", slug: "/all-posts", icon: <FaListUl />, show: authStatus },
    { name: "Add Post", slug: "/add-post", icon: <FaPlusCircle />, show: authStatus },
    
    // ✅ NEW: Profile Button (only for logged in users)
    { name: "Profile", slug: "/profile", icon: <FaUserCircle />, show: authStatus },
  ];

  return (
    <aside className="h-screen sticky top-0 flex flex-col p-4">

      {/* LOGO */}
      <h1 
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-blue-500 cursor-pointer mb-7 px-3"
      >
        MyBlog
      </h1>

      {/* MENU ITEMS */}
      <div className="space-y-3">
        {menu
          .filter((item) => item.show)
          .map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.slug)}
              className="
                flex items-center gap-4 text-xl 
                px-5 py-3 rounded-full cursor-pointer 
                hover:bg-blue-100 hover:text-blue-500 
                transition-all w-full
              "
            >
              {item.icon}
              <span className="max-[1100px]:hidden">{item.name}</span>
            </button>
          ))}

        {/* LOGOUT BUTTON */}
        {authStatus && (
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-4 text-xl 
              px-5 py-3 rounded-full cursor-pointer 
              hover:bg-red-100 hover:text-red-500 
              transition-all w-full
            "
          >
            <FaSignOutAlt />
            <span className="max-[1100px]:hidden">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default Header;
