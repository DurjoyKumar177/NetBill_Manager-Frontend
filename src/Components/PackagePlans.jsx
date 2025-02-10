const PackagePlans = () => {
  const packages = [
    { name: "Package-1", price: 599, yearlyPrice: 5450, description: "Perfect for getting started" },
    { name: "Package-2", price: 699, yearlyPrice: 6490, description: "Ideal for growing users" },
    { name: "Package-3", price: 799, yearlyPrice: 7490, description: "Best for professionals" },
    { name: "Package-4", price: 999, yearlyPrice: 8490, description: "Tailored for businesses" }
  ];

  return (
    <div className="bg-base-200 p-6">
      <h4 className="text-sm text-primary text-center m-5">Package Plans</h4>
      <h2 className="text-3xl max-w-96 mx-auto text-center font-semibold">
        Our package offers <span className="text-primary">exceptional</span> performance
      </h2>
      <div className="lg:grid lg:grid-cols-4 justify-between mx-auto p-4 gap-2 bg-gray-100 flex-wrap">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="group w-full bg-white shadow-xl rounded-2xl p-5 border border-gray-200 transition duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-2xl hover:scale-105"
          >
            <div>
              <h3 className="text-2xl font-bold transition">{pkg.name}</h3>
              <p className="mt-1 transition">{pkg.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600 group-hover:text-white transition">
                  ৳{pkg.price}
                </span>
                <span className="transition"> / month</span>
              </div>
              <p className="mt-1 transition">or ৳{pkg.yearlyPrice} / year</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-5 mt-4 transition duration-300 group-hover:bg-blue-700 group-hover:text-white">
              <h4 className="text-lg font-semibold text-gray-800 transition group-hover:text-white">Features:</h4>
              <ul className="mt-2 space-y-2 text-gray-600 transition group-hover:text-white">
                <li>✅ Speed: Up to 10 Mbps</li>
                <li>✅ Data Limit: Unlimited (Fair Usage Policy Applies)</li>
                <li>✅ Support: Standard Customer Support (9 AM - 9 PM)</li>
                <li>✅ IP Type: Real IP</li>
                <li>✅ IPv6 Available</li>
                <li>✅ 1-8 contention ratio</li>
              </ul>
              <button className="mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 hover:bg-white hover:text-blue-600 hover:border-blue-600 border">
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagePlans;