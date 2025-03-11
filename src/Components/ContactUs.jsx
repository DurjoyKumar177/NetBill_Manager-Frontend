import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa"; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Custom success toast
  const showSuccess = () =>
    toast.success(
      <div className="flex items-center">
        <FaCheckCircle className="text-green-500 mr-2" />
        <span>
          <strong>Message Sent!</strong> Thank you for reaching out. We'll get back to you as soon as possible. We're excited to hear from you!
        </span>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  // Custom error toast
  const showError = (error) =>
    toast.error(
      <div className="flex items-center">
        <FaCheckCircle className="text-red-500 mr-2" />
        <span>{error}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  const handleContact = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("https://net-bill-manager.vercel.app/api/contact/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response && response.status === 201) {  // Ensure response is received and status code is 201
        showSuccess();
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      // More detailed error handling
      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      showError(errorMessage);
    }
  };

  return (
    <section className="p-10 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Side: Office Address & Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">Reach out to us for any inquiries or assistance.</p>

          {/* Office Address */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Kanchput, Sonargaon, Narayangonj</h3>
            <p className="text-gray-600 mt-2">6 Gongapur Road, Narayangonj, Bangladesh</p>
          </div>

          {/* Contact Info */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
            <p className="text-gray-600 mt-2">📞 Phone: +01521738141</p>
            <p className="text-gray-600 mt-2">📧 Email: confidencecable@company.com</p>
            <p className="text-gray-600 mt-2">🌍 Website: www.dktechnology.com</p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
          <form className="space-y-4" onSubmit={handleContact}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Choose Subject"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
      <ToastContainer />  {/* Make sure ToastContainer is included here */}
    </section>
  );
};

export default ContactUs;
