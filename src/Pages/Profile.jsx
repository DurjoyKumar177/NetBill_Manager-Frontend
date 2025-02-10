import { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Get token

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/profile/update/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // Use "Token" instead of "Bearer"
          },
        });

        if (response.status === 403) {
          setError("Access denied. Please log in again.");
        } else if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError(`Error fetching profile: ${response.status}`);
        }
      } catch (error) {
        setError("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-3">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-2xl">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={profile.profile_pic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-md transition-transform transform hover:scale-110"
          />
          <h2 className="mt-3 text-2xl font-bold text-gray-800">{profile.first_name} {profile.last_name}</h2>
          <p className="text-gray-500">@{profile.email}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4 text-gray-700">
          <div className="flex justify-between items-center">
            <span className="font-medium">📞 Phone:</span>
            <span>{profile.phone_number}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">📍 Location:</span>
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col space-y-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => alert("Update Profile Clicked")}
          >
            ✏️ Update Profile
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => alert("Change Password Clicked")}
          >
            🔑 Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
