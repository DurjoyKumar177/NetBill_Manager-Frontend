import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import profilePlaceholder from "../assets/profile_placeholder.jpg";
import netBillLogo from "../assets/NetBill.png";

const Navbar = memo(() => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ profilePic: null, userType: null });
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      setAuthenticated(true);
      fetchUserData();
    } else {
      setAuthenticated(false);
      setUserData({ profilePic: null, userType: null });
    }
  }, []);

  // Fetch user profile and type
  const fetchUserData = useCallback(async () => {
    try {
      const [profileResponse, userTypeResponse] = await Promise.all([
        fetch("https://net-bill-manager.vercel.app/api/accounts/profile/update/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }),
        fetch("https://net-bill-manager.vercel.app/api/accounts/user-type/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (profileResponse.ok && userTypeResponse.ok) {
        const profileData = await profileResponse.json();
        const userTypeData = await userTypeResponse.json();
        setUserData({ profilePic: profileData.profile_pic, userType: userTypeData.user_type });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
      if (isNotificationOpen && !event.target.closest(".notification-dropdown")) {
        setNotificationOpen(false);
      }
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isNotificationOpen, isMobileMenuOpen]);

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setProfileOpen(!isProfileOpen);
    setNotificationOpen(false);
  };

  // Toggle notification menu
  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    setProfileOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await fetch("https://net-bill-manager.vercel.app/api/accounts/auth/logout/", {
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
    navigate("/");
  };

  // Helper function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/">
              <img className="h-8 w-8 rounded-full" src={netBillLogo} alt="logo" />
            </a>
            <a href="/" className="text-lg font-bold text-white">NetBill Manager</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden sm:flex space-x-4">
            <a
              href="/Home"
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isActive("/Home") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
              }`}
            >
              Home
            </a>
            <a
              href="/announcements"
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isActive("/announcements") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
              }`}
            >
              Announcements
            </a>
            {isAuthenticated && userData.userType === "staff" ? (
              <>
                <a
                  href="/complains"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/complains") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                  }`}
                >
                  User Complains
                </a>
                <a
                  href="/payments"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/payments") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                  }`}
                >
                  Collections
                </a>
              </>
            ) : isAuthenticated && userData.userType === "user" ? (
              <>
                <a
                  href="/complains"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/complains") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                  }`}
                >
                  My Complains
                </a>
                <a
                  href="/payments"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/payments") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                  }`}
                >
                  Payments
                </a>
              </>
            ) : null}
            <a
              href="/contact"
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isActive("/contact") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
              }`}
            >
              Contact Us
            </a>
            <a
              href="/tutorials"
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isActive("/tutorials") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
              }`}
            >
              Tutorials
            </a>
          </div>

          {/* Authentication & Profile (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <a
                  href="/login"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/login") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                  }`}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/register") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                  }`}
                >
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
                  <div className="notification-dropdown absolute right-0 z-10 mt-2 w-64 rounded-md bg-white py-2 px-4 shadow-lg">
                    <p className="text-sm text-gray-700">Notification feature is coming soon.</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown */}
            {isAuthenticated && (
              <div className="relative ml-3 profile-dropdown">
                <button onClick={toggleProfileMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none hover:ring-2 hover:ring-gray-500">
                  <img className="h-8 w-8 rounded-full" 
                    src={userData.profilePic ? userData.profilePic : profilePlaceholder} 
                    alt="User Profile" 
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    {userData.userType === "staff" ? (
                      <a href="/History" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Collections</a>
                    ) : (
                      <>
                        <a href="/History" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">History</a>
                        <a href="/broadband" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Broadband</a>
                      </>
                    )}
                    <button onClick={logoutUser} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu (Hidden by default) */}
        {isMobileMenuOpen && (
          <div className="mobile-menu sm:hidden bg-blue-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/Home"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/Home") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                }`}
              >
                Home
              </a>
              <a
                href="/announcements"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/announcements") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                }`}
              >
                Announcements
              </a>
              {isAuthenticated && userData.userType === "staff" ? (
                <>
                  <a
                    href="/complains"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/complains") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    User Complains
                  </a>
                  <a
                    href="/payments"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/payments") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    Collections
                  </a>
                </>
              ) : isAuthenticated && userData.userType === "user" ? (
                <>
                  <a
                    href="/complains"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/complains") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    My Complains
                  </a>
                  <a
                    href="/payments"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/payments") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    Payments
                  </a>
                </>
              ) : null}
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/contact") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                }`}
              >
                Contact Us
              </a>
              <a
                href="/tutorials"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/tutorials") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                }`}
              >
                Tutorials
              </a>
              {!isAuthenticated ? (
                <>
                  <a
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/login") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/register") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    Register
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive("/profile") ? "bg-blue-500 text-white" : "text-white hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 hover:text-gray-100"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Navbar;