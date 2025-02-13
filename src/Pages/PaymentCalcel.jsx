import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-bold text-yellow-600">Payment Canceled!</h2>
      <p className="text-lg text-gray-700 mt-4">
        Your payment has been canceled. If this was a mistake, you can try again or return to your payment history.
      </p>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/make-payment")}
        >
          Try Again
        </button>
        <button
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
          onClick={() => navigate("/History")}
        >
          Go to Payment History
        </button>
      </div>
    </div>
  );
}

export default PaymentCancel;
