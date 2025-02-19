import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    location: '',
    profile_pic: null,
    additional_info: {
      local_area: '',
      road_number: '',
      building_name: '',
      room_no: '',
      router_model: '',
      devices: [],
    },
    package_info: {
      package_number: '',
      customer_id: '',
      isp_username: '',
      package_password: '',
      monthly_payment: '',
      package_slip: null,
    },
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://net-bill-manager.vercel.app/api/accounts/profile/update/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`, // Include the token in the header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data); // Update state with fetched data
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (token) {
      fetchProfileData();
    } else {
      console.error('No token found in localStorage');
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handle file inputs
      setProfileData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (name.includes('.')) {
      // Handle nested objects (additional_info and package_info)
      const [parent, child] = name.split('.');
      setProfileData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append top-level fields
    formData.append('first_name', profileData.first_name);
    formData.append('last_name', profileData.last_name);
    formData.append('email', profileData.email);
    formData.append('phone_number', profileData.phone_number);
    formData.append('location', profileData.location);
    if (profileData.profile_pic instanceof File) {
      formData.append('profile_pic', profileData.profile_pic);
    }

    // Append additional_info fields as JSON string
    formData.append('additional_info', JSON.stringify(profileData.additional_info));

    // Append package_info fields as JSON string
    formData.append('package_info', JSON.stringify(profileData.package_info));

    try {
      const response = await fetch('https://net-bill-manager.vercel.app/api/accounts/profile/update/', {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`, // Include the token in the header
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        navigate('/profile');
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 transition-all hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Update Profile</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={profileData.first_name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={profileData.last_name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={profileData.phone_number}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Profile Picture</label>
              <input
                type="file"
                name="profile_pic"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Additional Info Section */}
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Additional Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Local Area</label>
              <input
                type="text"
                name="additional_info.local_area"
                value={profileData.additional_info?.local_area}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Road Number</label>
              <input
                type="text"
                name="additional_info.road_number"
                value={profileData.additional_info?.road_number}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Building Name</label>
              <input
                type="text"
                name="additional_info.building_name"
                value={profileData.additional_info?.building_name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Room No</label>
              <input
                type="text"
                name="additional_info.room_no"
                value={profileData.additional_info?.room_no}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Router Model</label>
              <input
                type="text"
                name="additional_info.router_model"
                value={profileData.additional_info?.router_model}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Devices</label>
              <input
                type="text"
                name="additional_info.devices"
                value={profileData.additional_info?.devices.join(', ')}
                onChange={(e) => {
                  const devices = e.target.value.split(',').map((device) => device.trim());
                  setProfileData((prevState) => ({
                    ...prevState,
                    additional_info: {
                      ...prevState.additional_info,
                      devices,
                    },
                  }));
                }}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Package Info Section */}
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Package Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Package Number</label>
              <input
                type="text"
                name="package_info.package_number"
                value={profileData.package_info?.package_number}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Customer ID</label>
              <input
                type="text"
                name="package_info.customer_id"
                value={profileData.package_info?.customer_id}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">ISP Username</label>
              <input
                type="text"
                name="package_info.isp_username"
                value={profileData.package_info?.isp_username}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Package Password</label>
              <input
                type="text"
                name="package_info.package_password"
                value={profileData.package_info?.package_password}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Monthly Payment</label>
              <input
                type="number"
                name="package_info.monthly_payment"
                value={profileData.package_info?.monthly_payment}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Package Slip</label>
              <input
                type="file"
                name="package_info.package_slip"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full transition-transform transform hover:scale-105 mt-8"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;