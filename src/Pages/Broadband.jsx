const Broadband = () => {
  const packageDetails = {
    name: "Package-1",
    price: 599,
    yearlyPrice: 5450,
    description: "Perfect for getting started",
    features: [
      "✅ Speed: Up to 10 Mbps",
      "✅ Data Limit: Unlimited (Fair Usage Policy Applies)",
      "✅ Support: Standard Customer Support (9 AM - 9 PM)",
      "✅ IP Type: Real IP",
      "✅ IPv6 Available",
      "✅ 1-8 contention ratio",
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 transition duration-300 hover:shadow-3xl hover:scale-105">
        
        {/* Package Name */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">{packageDetails.name}</h2>
        <p className="text-gray-500 text-center mt-2">{packageDetails.description}</p>

        {/* Pricing */}
        <div className="mt-6 text-center">
          <span className="text-4xl font-bold text-blue-600 transition group-hover:text-white">
            ৳{packageDetails.price}
          </span>
          <span className="text-gray-500 text-lg"> / month</span>
          <p className="text-gray-600 mt-1">or ৳{packageDetails.yearlyPrice} / year</p>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg shadow-md p-6 mt-6 transition duration-300 hover:bg-blue-600 hover:text-white">
          <h4 className="text-lg font-semibold text-gray-800 transition hover:text-white">Features:</h4>
          <ul className="mt-3 space-y-2 text-gray-600 transition hover:text-white">
            {packageDetails.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>


      </div>
    </div>
  );
};

export default Broadband;
