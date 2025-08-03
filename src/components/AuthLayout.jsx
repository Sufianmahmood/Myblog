import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

// This layout protects routes based on auth status
export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Wait for Redux auth status to load
    const timeout = setTimeout(() => {
      if (authentication && !authStatus) {
        navigate('/login', { state: { from: location }, replace: true });
      } else if (!authentication && authStatus) {
        navigate('/', { replace: true });
      }
      setCheckingAuth(false);
    }, 100); // Slight delay helps prevent flicker

    return () => clearTimeout(timeout);
  }, [authentication, authStatus, navigate, location]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
}
