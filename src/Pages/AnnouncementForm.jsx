import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnnouncementForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [],
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Convert files to Base64 strings
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    Promise.all(selectedFiles.map((file) => convertToBase64(file)))
      .then((base64Files) => {
        setFormData({
          ...formData,
          files: base64Files, // Store Base64-encoded files
        });
      })
      .catch((error) => toast.error(`File conversion error: ${error.message}`));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://net-bill-manager.vercel.app/api/announcements/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Announcement saved successfully!");
        setFormData({
          title: "",
          content: "",
          files: [],
        });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save the announcement: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="form-control">
          <label htmlFor="title" className="label font-semibold">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Content Input */}
        <div className="form-control">
          <label htmlFor="content" className="label font-semibold">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write the announcement content..."
            className="textarea textarea-bordered w-full h-32"
          />
        </div>

        {/* File Input */}
        <div className="form-control">
          <label htmlFor="files" className="label font-semibold">Upload Files:</label>
          <input
            type="file"
            id="files"
            name="files"
            multiple
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">Save Announcement</button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
