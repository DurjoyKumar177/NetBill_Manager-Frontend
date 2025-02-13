import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, History, CreditCard } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transaction_id");
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg text-center">
      {/* Success Icon */}
      <CheckCircle className="mx-auto text-green-600 w-24 h-24" />

      {/* Success Message */}
      <h2 className="text-4xl font-bold text-green-600 mt-4 flex justify-center items-center">
        Payment Successful!
      </h2>
      <p className="text-lg text-gray-700 mt-4">Your payment was processed successfully.</p>

      {/* Display Transaction ID */}
      {transactionId && (
        <p className="text-gray-900 font-medium mt-4 bg-gray-100 p-3 rounded-lg">
          <strong>Transaction ID:</strong> {transactionId}
        </p>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          onClick={() => navigate("/make-payment")}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Make Another Payment
        </button>
        <button
          className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition transform hover:scale-105"
          onClick={() => navigate("/History")}
        >
          <History className="w-5 h-5 mr-2" />
          Go to Payment History
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
