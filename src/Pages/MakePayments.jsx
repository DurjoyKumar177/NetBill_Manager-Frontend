import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function MakePayments() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch bills from the backend
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) {
          toast.error("You need to be logged in to view your bills.");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/bills/", {
          headers: {
            Authorization: `Token ${token}`, // Attach the token with 'Token' instead of 'Bearer'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBills(data); // Set bills to state
        } else if (response.status === 403) {
          toast.error("You are not authorized to view the bills.");
        } else {
          toast.error("Failed to load bills.");
        }
      } catch (error) {
        toast.error("Error fetching bills.");
      }
    };

    fetchBills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If no bill is selected, show an error
    if (!selectedBill) {
      toast.error("Please select a bill.");
      return;
    }

    const token = localStorage.getItem("token"); // Get token from local storage
    if (!token) {
      toast.error("You need to be logged in to make a payment.");
      return;
    }

    // Proceed with payment submission
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bills/payments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Attach the token with 'Token' instead of 'Bearer'
        },
        body: JSON.stringify({
          bill: selectedBill,
          amount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the transaction_id in localStorage
        const transactionId = data.transaction_id;
        localStorage.setItem("transaction_id", transactionId);

        // Set a timeout to delete the transaction_id after 5 minutes (300000ms)
        setTimeout(() => {
          localStorage.removeItem("transaction_id");
        }, 300000); // 5 minutes

        // Redirect the user to the payment URL
        window.location.href = data.payment_url;
      } else if (response.status === 403) {
        toast.error("You are not authorized to make a payment.");
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error("Error while making payment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Make Payment
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Bill Dropdown */}
        <div className="mb-4">
          <label htmlFor="bill" className="block text-lg font-medium text-gray-700">
            Select Bill
          </label>
          <select
            id="bill"
            name="bill"
            value={selectedBill}
            onChange={(e) => setSelectedBill(e.target.value)}
            required
            className="input input-bordered w-full"
          >
            <option value="" disabled>Select a Bill</option>
            {bills.map((bill) => (
              <option key={bill.id} value={bill.id}>
                Bill for {bill.month} - {bill.amount} TK
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input input-bordered w-full"
            min="0.01"
            step="0.01"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-1/2 py-3 text-white"
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default MakePayments;
