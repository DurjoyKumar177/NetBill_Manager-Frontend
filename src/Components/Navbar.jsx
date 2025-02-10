import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from "../assets/profile_placeholder.jpg";
import netBillLogo from "../assets/NetBill.png"; 

const Navbar = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      setAuthenticated(true);
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/profile/update/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePic(data.profile_pic);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!isProfileOpen);
    setNotificationOpen(false);
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    setProfileOpen(false);
  };

  const logoutUser = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/accounts/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("token");
    setAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/">
              <img className="h-8 w-8 rounded-full" src={netBillLogo} alt="logo" />
            </a>
            <a href="/" className="text-lg font-bold text-white">NetBill Manager</a>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <a href="/Home" className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white">
              Home
            </a>
            <a href="/announcements" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
              Announcements
            </a>
            {isAuthenticated && (
              <>
                <a href="/complains" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
                  My Complains
                </a>
                <a href="/payments" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
                  Payments
                </a>
                <a href="/broadband" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
                  My Broadband
                </a>
              </>
            )}
            <a href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
              Contact Us
            </a>
            <a href="/tutorials" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
              Tutorials
            </a>
          </div>

          {/* Authentication & Profile */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <a href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
                  Login
                </a>
                <a href="/register" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-gray-100">
                  Register
                </a>
              </div>
            ) : (
              <div className="relative">
                {/* Notification Bell */}
                <button onClick={toggleNotification} className="text-white hover:text-gray-200 focus:outline-none">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.477 7 10v4.159c0 .538-.214 1.055-.595 1.436L5 17h5m5 0a3.001 3.001 0 11-6 0m6 0H9" />
                  </svg>
                </button>
                {isNotificationOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-white py-2 px-4 shadow-lg">
                    <p className="text-sm text-gray-700">Notification feature is coming soon.</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown */}
            {isAuthenticated && (
              <div className="relative ml-3">
                <button onClick={toggleProfileMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none hover:ring-2 hover:ring-gray-500">
                  <img className="h-8 w-8 rounded-full" 
                    src={profilePic ? profilePic : profilePlaceholder} 
                    alt="User Profile" 
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="/History" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">History</a>
                    <button onClick={logoutUser} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
