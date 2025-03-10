import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { package: pkg } = location.state;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [alert, setAlert] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5);

  const token = localStorage.getItem("token");
  const isAuthorized = !!token;

  useEffect(() => {
    if (alert) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setTimeout(() => navigate("/"), 5000);
      return () => clearInterval(timer);
    }
  }, [alert, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({
      type: "success",
      message:
        "Form submitted successfully!\nWe will reach you as soon as possible.",
    });
  };

  const handleConfirmation = () => {
    setAlert({
      type: "info",
      message:
        "Thanks for your response.\nWe will provide you necessary credentials for your package as soon as possible.\nPlease update your profile after getting credentials.",
    });
  };

  return (
    <div className="bg-base-200 p-6 relative">
      {alert && (
        <div
          className={`alert alert-${alert.type} shadow-lg text-xl whitespace-pre-line p-6 fixed top-5 left-1/2 transform -translate-x-1/2 z-50 max-w-lg text-center rounded-lg bg-opacity-90 bg-white border border-gray-300`}
        >
          <span>{alert.message}</span>
          
          <button
            onClick={() => navigate("/")}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-300 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-4xl font-extrabold text-gray-800">{pkg.name}</h3>
          <p className="mt-4 text-gray-600 text-lg">{pkg.description}</p>
        </div>
        <div className="flex flex-col ">
          <span className="text-5xl font-extrabold text-blue-600">
            ৳{pkg.price}
          </span>
          <span className="text-lg text-gray-500">/ month</span>
          <p className="mt-1 text-lg text-gray-500">
            or ৳{pkg.yearlyPrice} / year
          </p>
        </div>
        <div className="mt-8">
          <h4 className="text-2xl font-bold text-gray-700">Key Features:</h4>
          <ul className="mt-4 space-y-3 text-lg text-gray-700">
            <li>
              ✅ Speed: {pkg.speed} - Enjoy ultra-fast browsing and seamless
              streaming.
            </li>
            <li>
              ✅ Data Limit: Unlimited - No restrictions, use as much as you
              need.
            </li>
            <li>
              ✅ 24/7 Dedicated Customer Support - Always ready to assist you.
            </li>
            <li>
              ✅ IP Type: Real IP with Static Option - Secure and reliable
              connection.
            </li>
            <li>✅ IPv6 Available - Future-proof your internet experience.</li>
            <li>✅ Low Latency - Optimized for gaming and high-speed tasks.</li>
            <li>✅ Free Router Installation - Hassle-free setup included.</li>
            <li>✅ Parental Control - Keep your family safe online.</li>
            <li>✅ Uptime Guarantee: 99.9% - Ensuring a stable connection.</li>
            <li>
              ✅ Flexible Payment Options - Multiple methods for your
              convenience.
            </li>
          </ul>
        </div>
        {isAuthorized ? (
          <button
            onClick={handleConfirmation}
            className="mt-8 w-full bg-blue-600 text-white text-lg font-semibold py-4 rounded-xl transition duration-300 hover:bg-white hover:text-blue-600 hover:border-blue-600 border"
          >
            Confirm Subscription
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <p className="mb-6 text-lg text-gray-700 text-center">
              Welcome to our service. Please complete the form and submit it. We
              will reach you as soon as possible.
            </p>
            <div className="space-y-5">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-lg font-semibold py-4 rounded-xl transition duration-300 hover:bg-white hover:text-blue-600 hover:border-blue-600 border"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;
