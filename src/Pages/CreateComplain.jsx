import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateComplain = () => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/complains/categories/", {
                    headers: { "Authorization": `Token ${token}` },
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        selectedCategories.forEach((categoryId) => formData.append("category_ids", categoryId));
        Array.from(files).forEach((file) => formData.append("files", file));

        try {
            const response = await fetch("http://127.0.0.1:8000/api/complains/", {
                method: "POST",
                headers: { "Authorization": `Token ${token}` },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Complain submitted successfully! Redirecting...", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
                setTimeout(() => navigate("/complains"), 1000);
            } else {
                toast.error(result.detail || "Error submitting complain", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a Complain</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label font-semibold">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Body</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} rows="4"
                        className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none" required></textarea>
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Categories</label>
                    <select multiple value={selectedCategories} onChange={(e) =>
                        setSelectedCategories([...e.target.selectedOptions].map(o => o.value))
                    } className="select select-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none">
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Attachments</label>
                    <input type="file" multiple onChange={(e) => setFiles(e.target.files)}
                        className="file-input file-input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <button type="submit" className="btn btn-primary w-full hover:bg-blue-700 transition-all">Submit</button>
            </form>
        </div>
    );
};

export default CreateComplain;
