import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user type
        const userTypeResponse = await fetch("http://127.0.0.1:8000/api/accounts/user-type/", {
          headers: { Authorization: `Token ${token}` },
        });
        const userTypeData = await userTypeResponse.json();

        if (userTypeResponse.ok) {
          setIsStaff(userTypeData.user_type === "staff");
        } else {
          setError("Failed to determine user type.");
          setLoading(false);
          return;
        }

        // Fetch history
        const apiUrl = isStaff
          ? "http://127.0.0.1:8000/api/bills/collection-history/"
          : "http://127.0.0.1:8000/api/bills/payment-history/";

        const response = await fetch(apiUrl, {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setHistory(data.sort((a, b) => new Date(b.payment_date || b.collection_date) - new Date(a.payment_date || a.collection_date)));
        } else {
          setError("Failed to fetch history.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isStaff]);

  // Convert month to a readable format (e.g., "January")
  const getMonthName = (dateString) => {
    if (!dateString) return "N/A"; // Handle undefined month
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = parseInt(dateString.split("-")[1], 10) - 1;
    return monthNames[monthIndex];
  };

  // Generate and download receipt PDF
  const downloadReceipt = (payment) => {
    const doc = new jsPDF();

    doc.setFillColor(30, 144, 255); // Blue color for header
    doc.rect(0, 0, 210, 40, "F"); // Draw header

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Payment Receipt", 15, 20);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 50);

    // Payment details
    const details = [
      ["Month", getMonthName(payment.month)],
      ["Amount", `${payment.amount} Taka `],
      ["Payment Method", payment.payment_method],
      ["Payment Date", new Date(payment.payment_date).toLocaleString()],
    ];

    doc.autoTable({
      startY: 60,
      head: [["Details", "Value"]],
      body: details,
      theme: "striped",
    });

    doc.text("Thank you for your payment!", 15, doc.lastAutoTable.finalY + 20);
    doc.save(`receipt_${payment.month}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-3">Loading history...</span>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isStaff ? "Collection History" : "Payment History"}
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  {isStaff && (
                    <>
                      <th className="py-3 px-4 text-left">User ID</th>
                      <th className="py-3 px-4 text-left">Username</th>
                      <th className="py-3 px-4 text-left">Location</th>
                    </>
                  )}
                  <th className="py-3 px-4 text-left">Month</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  {!isStaff && <th className="py-3 px-4 text-left">Payment Method</th>}
                  <th className="py-3 px-4 text-left">{isStaff ? "Collection Date" : "Payment Date"}</th>
                  {!isStaff && <th className="py-3 px-4 text-center">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-blue-100 transition-all">
                    {isStaff && (
                      <>
                        <td className="py-3 px-4">{item.user.id}</td>
                        <td className="py-3 px-4">{item.user.username}</td>
                        <td className="py-3 px-4">{item.user.location}</td>
                      </>
                    )}
                    <td className="py-3 px-4">{getMonthName(item.month)}</td>
                    <td className="py-3 px-4">৳{item.amount}</td>
                    {!isStaff && <td className="py-3 px-4 capitalize">{item.payment_method || "N/A"}</td>}
                    <td className="py-3 px-4">{new Date(item.payment_date || item.collection_date).toLocaleString()}</td>
                    {!isStaff && (
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => downloadReceipt(item)}
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                        >
                          Download Receipt
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
