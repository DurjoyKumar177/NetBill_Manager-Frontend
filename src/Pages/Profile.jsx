import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
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
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-2xl border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.profile_pic}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md transform hover:scale-110 transition-transform"
          />
          <h2 className="mt-3 text-2xl font-bold text-gray-800">{profile.first_name} {profile.last_name}</h2>
          <p className="text-gray-500">@{profile.email}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">📞 Contact Info</h3>
            <p><span className="font-medium">Phone:</span> {profile.phone_number}</p>
            <p><span className="font-medium">Location:</span> {profile.location}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">🏠 Address Details</h3>
            <p><span className="font-medium">Local Area:</span> {profile.additional_info.local_area}</p>
            <p><span className="font-medium">Road No:</span> {profile.additional_info.road_number}</p>
            <p><span className="font-medium">Building:</span> {profile.additional_info.building_name}</p>
            <p><span className="font-medium">Room No:</span> {profile.additional_info.room_no}</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">📶 Internet Package Details</h3>
          <p><span className="font-medium">ISP Username:</span> {profile.package_info.isp_username}</p>
          <p><span className="font-medium">Customer ID:</span> {profile.package_info.customer_id}</p>
          <p><span className="font-medium">Package No:</span> {profile.package_info.package_number}</p>
          <p><span className="font-medium">Monthly Payment:</span> ${profile.package_info.monthly_payment}</p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => navigate("/update_profile")}
          >
            ✏️ Update Profile
          </button>
          <button
            className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => navigate("/change_password")}
          >
            🔑 Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;