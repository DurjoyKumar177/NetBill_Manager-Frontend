import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        isp_username: "",
        customer_id: "",
        password: "",
        confirm_password: "",
        location: "",
        profile_pic: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profile_pic: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        if (formData.password !== formData.confirm_password) {
            setErrors({ confirm_password: "Passwords do not match" });
            return;
        }
        
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
        
        try {
            const response = await axios.post("https://net-bill-manager.vercel.app/api/accounts/register/", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Registration Successful");
            console.log(response.data);
        } catch (error) {
            console.error("Error registering user:", error);
            if (error.response) setErrors(error.response.data);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center min-h-screen p-6">
            <div className="bg-white p-8 shadow-2xl rounded-xl max-w-4xl w-full border border-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" name="username" placeholder="Username"
                        className="input-field" onChange={handleChange} required 
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}

                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="first_name" placeholder="First Name" className="input-field" onChange={handleChange} />
                        <input type="text" name="last_name" placeholder="Last Name" className="input-field" onChange={handleChange} />
                    </div>

                    <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} required />
                    <input type="text" name="phone_number" placeholder="Phone Number" className="input-field" onChange={handleChange} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="isp_username" placeholder="ISP Username" className="input-field" onChange={handleChange} />
                        <input type="text" name="customer_id" placeholder="Customer ID" className="input-field" onChange={handleChange} />
                    </div>

                    <input type="text" name="location" placeholder="Location" className="input-field" onChange={handleChange} />
                    <input type="file" name="profile_pic" className="input-field file:bg-gray-100 file:border file:border-gray-300 file:p-2 file:rounded-lg file:cursor-pointer hover:file:bg-gray-200" onChange={handleFileChange} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} required />
                        <input type="password" name="confirm_password" placeholder="Confirm Password" className="input-field" onChange={handleChange} required />
                    </div>
                    {errors.confirm_password && <p className="error-text">{errors.confirm_password}</p>}

                    <button type="submit" className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold shadow-md transform transition hover:scale-105">
                        Register
                    </button>
                </form>
            </div>

            {/* Tailwind Utility Classes */}
            <style jsx>{`
                .input-field {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: border 0.3s, box-shadow 0.3s;
                    outline: none;
                    background-color: white;
                }
                .input-field:focus {
                    border-color: #6366F1;
                    box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
                }
                .error-text {
                    color: red;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
};

export default Register;
