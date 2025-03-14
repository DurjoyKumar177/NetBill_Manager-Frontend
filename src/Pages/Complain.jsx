import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Complaints = () => {
  const [userType, setUserType] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [replies, setReplies] = useState({});
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [loading, setLoading] = useState(true); // loading
  const [userNames, setUserNames] = useState({}); // Store user names
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Token ${token}` };

  useEffect(() => {
    axios.get("https://net-bill-manager.vercel.app/api/accounts/user-type/", { headers })
      .then(res => setUserType(res.data.user_type))
      .catch(err => console.error("Error fetching user type", err));

    axios.get("https://net-bill-manager.vercel.app/api/complains/", { headers })
      .then(res => {
        setComplaints(res.data.reverse());
        setLoading(false); // Set loading to false after fetching complaints

        // Fetch user names for each complaint
        res.data.forEach(complain => {
          axios.get(`https://net-bill-manager.vercel.app/api/accounts/profile/${complain.user}/`, { headers })
            .then(res => {
              setUserNames(prev => ({ ...prev, [complain.user]: res.data.name || "Unknown User" }));
            })
            .catch(err => {
              console.error("Error fetching user name", err);
              setUserNames(prev => ({ ...prev, [complain.user]: "Unknown User" }));
            });
        });
      })
      .catch(err => {
        console.error("Error fetching complaints", err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const fetchReplies = (complainId) => {
    if (expandedReplies[complainId]) {
      setExpandedReplies(prev => ({ ...prev, [complainId]: false }));
    } else {
      axios.get(`https://net-bill-manager.vercel.app/api/complains/${complainId}/replies/`, { headers })
        .then(res => {
          setReplies(prev => ({ ...prev, [complainId]: res.data }));
          setExpandedReplies(prev => ({ ...prev, [complainId]: true }));
        })
        .catch(err => console.error("Error fetching replies", err));
    }
  };

  const handleReplySubmit = (complainId) => {
    axios.post(`https://net-bill-manager.vercel.app/api/complains/${complainId}/reply/`, {
      complain: complainId,
      message: replyMessage,
    }, { headers })
      .then(() => {
        setReplyMessage("");
        fetchReplies(complainId); // Refresh replies after submitting
      })
      .catch(err => console.error("Error submitting reply", err));
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-4/5 md:w-3/5 lg:w-2/3 bg-gray-50 p-6 rounded-lg shadow-lg">
        <div>
          {userType === "user" && (
            <div className="text-center mb-4">
              <button 
                className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-blue-500" 
                onClick={() => navigate("/create-complain")}
              >
                Create Complaint
              </button>
            </div>
          )}
        </div>
        {/* Update heading based on user type */}
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {userType === "staff" ? "User Complaints" : "My Complaints"}
        </h2>
        {loading ? ( // Show loader while loading
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
          </div>
        ) : complaints.length === 0 ? (
          <p className="text-center">No complaints found.</p>
        ) : (
          complaints.map(complain => (
            <div 
              key={complain.id} 
              className="border border-gray-300 p-4 rounded bg-white shadow-lg hover:shadow-xl transition-shadow mb-4"
            >
              
              <div className="text-sm text-gray-500 mb-2">
                Created at: {new Date(complain.created_at).toLocaleDateString()} {/* Show only date */}
              </div>

              {/* Complaint title and body */}
              <h3 className="text-xl font-semibold text-gray-800">{complain.title}</h3>
              <p className="text-gray-600 mb-2 whitespace-pre-line">{complain.body}</p>

              {/* Attachments - Conditionally render images */}
              {complain.attachments.length > 0 && (
                <div className={`grid ${complain.attachments.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-2 mt-2`}>
                  {complain.attachments.slice(0, 2).map((attachment) => (
                    attachment.file.endsWith(".mp4") ? (
                      <video key={attachment.id} className="w-full rounded" controls>
                        <source src={attachment.file} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img 
                        key={attachment.id} 
                        src={attachment.file} 
                        alt="attachment" 
                        className="w-full h-40 md:h-48 rounded object-cover cursor-pointer" 
                        onClick={() => window.open(attachment.file, "_blank")}
                      />
                    )
                  ))}
                </div>
              )}

              {/* Buttons for replies */}
              <div className="flex justify-center mt-2">
                <button 
                  className="btn btn-outline btn-sm text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition" 
                  onClick={() => fetchReplies(complain.id)}
                >
                  {expandedReplies[complain.id] ? "Hide Replies" : "Show Replies"}
                </button>
                {userType === "staff" && (
                  <button 
                    className="btn btn-primary btn-sm ml-2" 
                    onClick={() => setSelectedComplaint(selectedComplaint === complain.id ? null : complain.id)}
                  >
                    {selectedComplaint === complain.id ? "Cancel" : "Reply"}
                  </button>
                )}
              </div>

              {/* Reply input */}
              {selectedComplaint === complain.id && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => handleReplySubmit(complain.id)}
                  >
                    Submit Reply
                  </button>
                </div>
              )}

              {/* Replies section */}
              {expandedReplies[complain.id] && replies[complain.id] && (
                <div className="mt-2 border-t pt-2">
                  {replies[complain.id].length === 0 ? (
                    <p className="text-gray-500 text-center">No replies yet.</p>
                  ) : (
                    replies[complain.id].map(reply => (
                      <div key={reply.id} className="border p-2 rounded mt-2 bg-gray-100">
                        <p className="text-gray-700 whitespace-pre-line">{reply.message}</p>
                        <span className="text-sm text-gray-500">{new Date(reply.created_at).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complaints;