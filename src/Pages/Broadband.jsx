import React, { useState, useEffect } from 'react';

const Broadband = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token'); // Get token from local storage

        if (!token) {
          throw new Error('Authentication token not found. Please log in.');
        }

        const response = await fetch(
          'YOUR_API_ENDPOINT_FOR_CUSTOMERS', // Replace with your actual API endpoint
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`, // Include authorization header
            },
          }
        );

        if (!response.ok) {
          let errorMessage = `HTTP error! Status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.error('Error parsing JSON error:', jsonError);
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading customer data...</div>;
  }

  if (error) {
    return <div>Error loading customer data: {error}</div>;
  }

  if (customers.length === 0) {
    return <div>No customers found.</div>;
  }

  return (
    <div>
      <h2>Broadband Customers</h2>
      <table className="table-auto"> {/* Tailwind CSS class for a basic table */}
        <thead>
          <tr>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Broadband Plan</th>
            <th className="px-4 py-2">Installation Date</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}> {/* Changed to customer_id */}
              <td className="border px-4 py-2">{customer.customer_id}</td>{/* Changed to customer_id */}
              <td className="border px-4 py-2">{customer.first_name} {customer.last_name}</td>{/* Changed to first_name and last_name */}
              <td className="border px-4 py-2">{customer.email_address}</td>{/* Changed to email_address */}
              <td className="border px-4 py-2">{customer.plan_name}</td>{/* Changed to plan_name */}
              <td className="border px-4 py-2">{customer.installation_date}</td>{/* Changed to installation_date */}
              {/* Add more data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Broadband;