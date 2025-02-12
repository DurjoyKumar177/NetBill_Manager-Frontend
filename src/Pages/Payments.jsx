import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Payments() {
  const [userType, setUserType] = useState(null);
  const [bills, setBills] = useState([]);
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [collectionResponse, setCollectionResponse] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token is missing.");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/accounts/user-type/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.user_type);
        } else {
          toast.error("Failed to fetch user type.");
        }
      } catch (error) {
        toast.error("Error fetching user type.");
      }
    };

    fetchUserType();
  }, []);

  useEffect(() => {
    if (userType === "user") {
      fetchBills();
    }
  }, [userType]);

  const fetchBills = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/bills/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBills(data);
      } else {
        toast.error("Failed to fetch bills.");
      }
    } catch (error) {
      toast.error("Error fetching bills.");
    }
  };

  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bills/collections/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          customer_id: customerId,
          month,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        //  Handle API validation errors
        if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else if (data.customer_id) {
          setError(data.customer_id[0]);
        } else if (data.month) {
          setError(data.month[0]);
        } else if (data.amount) {
          setError(data.amount[0]);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        return;
      }

      // ✅ Success message with correct details
      setCollectionResponse(data);
      setSuccessMessage(
        `✅ Payment collected successfully for ${data.display_month} from ${data.user.username} (${data.user.location}). Amount: ${data.amount} TK.`
      );

      toast.success("✅ Payment collected successfully!");
      setMonth("");
      setAmount("");
      setCustomerId("");
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
       {/* ✅ Success Message at the Top */}
       {collectionResponse && (
  <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-green-600">
      ✅ Payment Collected Successfully!
    </h3>
    <p>
      <strong>Month:</strong> {collectionResponse.display_month} {/* ✅ Fixed Month Display */}
    </p>
    <p>
      <strong>Collected From:</strong> {collectionResponse.user.username}{" "}
      ({collectionResponse.user.location}) {/* ✅ Showing Username & Location */}
    </p>
    <p>
      <strong>Amount:</strong> {collectionResponse.amount} TK
    </p>
    <p>
      <strong>Collection Date:</strong>{" "}
      {new Date(collectionResponse.collection_date).toLocaleString()}
    </p>
  </div>
)}

      {/*  Display Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/*  Pay Now Button at the Top */}
      {userType === "user" && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/make-payment")}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
          >
            🚀 Pay Now
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        {userType === "staff" ? "Payment Collection" : "Pending Bills"}
      </h2>

      {/*  User View: Show Pending Bills */}
      {userType === "user" && (
        <div>
          {bills.length > 0 ? (
            <div className="space-y-4">
              {bills.map((bill) => (
                <div key={bill.id} className="p-4 bg-red-100 border border-red-400 rounded-lg shadow-md">
                  <p className="text-lg font-semibold text-red-600">
                    Bill for {bill.month}: {bill.amount} TK
                  </p>
                  <p className="text-sm text-red-500">Status: Pending</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No pending bills found.</p>
          )}
        </div>
      )}

      {/* ✅ Staff View: Payment Collection Form */}
      {userType === "staff" && (
        <form onSubmit={handleCollectionSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">Month</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              placeholder="YYYY-MM"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Customer ID</label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 text-white">
            Collect Payment
          </button>
        </form>
      )}
    </div>
  );
}

export default Payments;
