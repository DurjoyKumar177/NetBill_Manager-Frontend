import { useState, useEffect } from "react";

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "",
    profile_pic: null,
    additional_info: {
      local_area: "",
      road_number: "",
      building_name: "",
      room_no: "",
      router_model: "",
      devices: "",
    },
    package_info: {
      package_number: "",
      customer_id: "",
      isp_username: "",
      package_password: "",
      monthly_payment: "",
      package_slip: null,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

        if (response.ok) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e, key) => {
    setProfile((prev) => ({
      ...prev,
      [key]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
  
    const formData = new FormData();
  
    // Append regular fields
    Object.keys(profile).forEach((key) => {
      if (typeof profile[key] !== "object" || profile[key] === null) {
        formData.append(key, profile[key]);
      }
    });
  
    // Append nested fields in additional_info
    Object.keys(profile.additional_info).forEach((nestedKey) => {
      const nestedValue = profile.additional_info[nestedKey];
      if (nestedKey === "devices") {
        // Handle devices as a single string (comma-separated values)
        formData.append(`additional_info[${nestedKey}]`, nestedValue.join(","));
      } else {
        formData.append(`additional_info[${nestedKey}]`, nestedValue);
      }
    });
  
    // Append nested fields in package_info
    Object.keys(profile.package_info).forEach((nestedKey) => {
      const nestedValue = profile.package_info[nestedKey];
      if (nestedKey === "package_slip" && nestedValue) {
        // Append file only if it exists
        formData.append(`package_info[${nestedKey}]`, nestedValue);
      } else if (nestedKey !== "package_slip") {
        formData.append(`package_info[${nestedKey}]`, nestedValue);
      }
    });
  
    // Conditionally append profile_pic if it exists and is not a string (file input)
    if (profile.profile_pic && profile.profile_pic instanceof File) {
      formData.append("profile_pic", profile.profile_pic);
    }
  
    // Log the FormData to the console for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/accounts/profile/update/", {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        setSuccess("Profile updated successfully!");
      } else {
        const responseData = await response.json();
        setError(`Failed to update profile: ${JSON.stringify(responseData)}`);
      }
    } catch (error) {
      setError("An error occurred while updating profile.");
    }
  };
  
  
    
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-3">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 transition-all hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Update Profile</h2>
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" name="first_name" value={profile.first_name} onChange={handleChange} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" name="last_name" value={profile.last_name} onChange={handleChange} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Email</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Location</label>
              <input type="text" name="location" value={profile.location} onChange={handleChange} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Profile Picture</label>
              <input type="file" name="profile_pic" onChange={(e) => handleFileChange(e, "profile_pic")} className="input-file" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Additional Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Local Area</label>
              <input type="text" name="local_area" value={profile.additional_info.local_area} onChange={(e) => handleNestedChange(e, "additional_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Road Number</label>
              <input type="text" name="road_number" value={profile.additional_info.road_number} onChange={(e) => handleNestedChange(e, "additional_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Building Name</label>
              <input type="text" name="building_name" value={profile.additional_info.building_name} onChange={(e) => handleNestedChange(e, "additional_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Room No</label>
              <input type="text" name="room_no" value={profile.additional_info.room_no} onChange={(e) => handleNestedChange(e, "additional_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Router Model</label>
              <input type="text" name="router_model" value={profile.additional_info.router_model} onChange={(e) => handleNestedChange(e, "additional_info")} className="input-field" />
            </div>


            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Devices</label>
              <input type="text" name="devices" value={profile.additional_info.devices} onChange={(e) => handleNestedChange(e, "additional_info")} className="input-field" />
            </div>
          </div>

          

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Package Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Package Number</label>
              <input type="text" name="package_number" value={profile.package_info.package_number} onChange={(e) => handleNestedChange(e, "package_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Customer ID</label>
              <input type="text" name="customer_id" value={profile.package_info.customer_id} onChange={(e) => handleNestedChange(e, "package_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">ISP Username</label>
              <input type="text" name="isp_username" value={profile.package_info.isp_username} onChange={(e) => handleNestedChange(e, "package_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Package Password</label>
              <input type="text" name="package_password" value={profile.package_info.package_password} onChange={(e) => handleNestedChange(e, "package_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Monthly Payment</label>
              <input type="number" name="monthly_payment" value={profile.package_info.monthly_payment} onChange={(e) => handleNestedChange(e, "package_info")} className="input-field" />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">Package Slip</label>
              <input type="file" name="package_slip" onChange={(e) => handleFileChange(e, "package_slip")} className="input-file" />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full transition-transform transform hover:scale-105 mt-8">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

// Add these styles to your CSS or Tailwind config
const styles = `
  .input-field {
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #374151;
    background-color: #f9fafb;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .input-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .input-file {
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #374151;
    background-color: #f9fafb;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .input-file:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);