import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/accounts/auth/password/change/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ new_password1: newPassword1, new_password2: newPassword2 }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully.");
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        setError(data?.new_password1?.[0] || "Failed to change password.");
      }
    } catch (err) {
      setError("Network error, please try again");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-12 px-6 lg:px-8">
      <div className="sm:w-full sm:max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Change Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Enter your new password below.</p>

        {message && <div className="mt-4 bg-green-500 text-white text-center py-2 px-4 rounded-md shadow">{message}</div>}
        {error && <div className="mt-4 bg-red-500 text-white text-center py-2 px-4 rounded-md shadow">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter new password"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm new password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
