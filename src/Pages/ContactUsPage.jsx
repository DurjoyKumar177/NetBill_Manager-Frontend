import React, { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message for the field being changed
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null); // Reset status
    try {
      const response = await fetch(
        "YOUR_API_ENDPOINT", // Replace with your actual API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      setFormErrors({});//clear errors

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="w-4/5 md:w-3/5 lg:w-2/5 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-gray-300 transition-all duration-300 hover:shadow-3xl">
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.name && <p className="text-red-500 text-xs italic">{formErrors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
          </div>

          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-800">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={`mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                formErrors.subject ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.subject && <p className="text-red-500 text-xs italic">{formErrors.subject}</p>}
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-800">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className={`mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                formErrors.message ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {formErrors.message && <p className="text-red-500 text-xs italic">{formErrors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:border-indigo-600 border-2 shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Submission Messages */}
        {submissionStatus === "success" && (
          <div className="mt-4 text-green-500 text-center font-medium">
            ✅ Message sent successfully!
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="mt-4 text-red-500 text-center font-medium">
            ❌ An error occurred while sending the message. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;
