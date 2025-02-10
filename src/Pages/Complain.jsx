import React, { useState } from 'react';
import {
    FaThumbsUp,
    FaRegComment,
    FaHeart,
    FaLaugh,
    FaSurprise,
    FaSadTear,
    FaAngry,
} from 'react-icons/fa';

const REACTIONS = [
    { icon: <FaThumbsUp className="text-blue-500" />, label: 'Like' },
    { icon: <FaHeart className="text-red-500" />, label: 'Love' },
    { icon: <FaLaugh className="text-yellow-500" />, label: 'Haha' },
    { icon: <FaSurprise className="text-orange-500" />, label: 'Wow' },
    { icon: <FaSadTear className="text-blue-400" />, label: 'Sad' },
    { icon: <FaAngry className="text-red-600" />, label: 'Angry' },
];

const Complain = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        details: '',
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const [reactions, setReactions] = useState({});
    const [showReactions, setShowReactions] = useState(null);
    const [comments, setComments] = useState({});
    const [newComments, setNewComments] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear any previous error for this field
        setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.subject) errors.subject = 'Subject is required';
        if (!formData.details) errors.details = 'Details are required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setMessage('');
        setIsSubmitting(true); // Disable the button

        try {
            const response = await fetch('http://127.0.0.1:8000/api/complains/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to submit complaint. Please try again.';
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message; // Use backend error message
                    }
                } catch (parseError) {
                    console.error("Error parsing error response:", parseError);
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            setMessage('Complaint submitted successfully!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                details: '',
            });
            setFormErrors({}); // Clear any previous errors
        } catch (error) {
            setMessage(error.message || 'Failed to submit complaint. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false); // Enable the button
        }
    };

    const handleReaction = (postId, reaction) => {
        setReactions(prevReactions => ({
            ...prevReactions,
            [postId]: reaction,
        }));
        setShowReactions(null);
    };

    const handleToggleComments = (postId) => {
        setComments(prevComments => ({
            ...prevComments,
            [postId]: !prevComments[postId],
        }));
    };

    const handleCommentChange = (postId, text) => {
        setNewComments(prevNewComments => ({
            ...prevNewComments,
            [postId]: text,
        }));
    };

    const handleAddComment = (postId) => {
        if (!newComments[postId]) return;

        setComments(prevComments => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), newComments[postId]],
        }));
        setNewComments(prevNewComments => ({ ...prevNewComments, [postId]: '' }));
    };

    return (
        <div className="max-w-2xl mx-auto mt-4">
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-lg font-semibold mb-4">Submit a Complaint</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            required
                        />
                        {formErrors.name && <p className="text-red-500 text-xs italic">{formErrors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            required
                        />
                        {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            required
                        />
                        {formErrors.subject && <p className="text-red-500 text-xs italic">{formErrors.subject}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                            Complaint Details
                        </label>
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${formErrors.details ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 h-32`} // Increased height
                            required
                        />
                        {formErrors.details && <p className="text-red-500 text-xs italic">{formErrors.details}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-green-500">{message}</p>}
            </div>

            {/* Example of Reactions and Comments Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mt-3 border-t pt-2 text-gray-600 text-sm">
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 hover:text-blue-500"
                            onClick={() => setShowReactions('examplePostId')}
                        >
                            {reactions['examplePostId'] ? (
                                reactions['examplePostId'].icon
                            ) : (
                                <FaThumbsUp />
                            )}
                            <span>
                                {reactions['examplePostId']
                                    ? reactions['examplePostId'].label
                                    : 'Like'}
                            </span>
                        </button>
                        {showReactions === 'examplePostId' && (
                            <div className="absolute -top-10 left-0 flex space-x-2 bg-white shadow-md p-2 rounded-lg">
                                {REACTIONS.map((r, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleReaction('examplePostId', r)}
                                        aria-label={`React with ${r.label}`}
                                    >
                                        {r.icon}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className="flex items-center space-x-1 hover:text-blue-500"
                        onClick={() => handleToggleComments('examplePostId')}
                    >
                        <FaRegComment />
                        <span>Comment</span>
                    </button>
                </div>

                {comments['examplePostId'] && (
                    <div className="mt-3">
                        {comments['examplePostId'].map((comment, index) => (
                            <p key={index} className="text-sm text-gray-600 border-b pb-1">
                                {comment}
                            </p>
                        ))}
                        <div className="flex mt-2">
                            <input
                                type="text"
                                value={newComments['examplePostId'] || ''}
                                onChange={(e) =>
                                    handleCommentChange('examplePostId', e.target.value)
                                }
                                placeholder="Write a comment..."
                                className="border rounded-md p-1 flex-1"
                            />
                            <button
                                onClick={() => handleAddComment('examplePostId')}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Complain;