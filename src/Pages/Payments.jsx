import React, { useState, useEffect } from 'react';

const Payments = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear any previous errors

      try {
        const token = localStorage.getItem('token'); // Get token from localStorage

        if (!token) {
          throw new Error('Authentication token not found.  Please log in.');
        }

        const response = await fetch(
          'https://netbill-manager.onrender.com/api/bills/payment-history/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`, // Include the token
            },
          }
        );

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json(); // Try to parse the JSON error
            if (errorData && errorData.message) {
              errorMessage = errorData.message; // Use the backend's error message
            }
          } catch (jsonError) {
            console.error('Error parsing JSON error:', jsonError);
            // Keep the default errorMessage if JSON parsing fails
          }
          throw new Error(errorMessage); // Throw an error with the message
        }

        const data = await response.json();
        setPaymentHistory(data);
      } catch (error) {
        setError(error.message); // Set the error message
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(false); // Stop loading, regardless of success or error
      }
    };

    fetchPaymentHistory();
  }, []);

  if (loading) {
    return <div>Loading payment history...</div>;
  }

  if (error) {
    return <div>Error loading payment history: {error}</div>;
  }

  return (
    <div>
      <h2>Payment History</h2>
      {paymentHistory.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <ul>
          {paymentHistory.map((payment) => (
            <li key={payment.id}>
              Amount: ${payment.amount}, Date: {payment.date}, Status: {payment.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Payments;