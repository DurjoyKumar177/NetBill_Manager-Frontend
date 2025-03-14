import { FaHeadphones, FaStar } from "react-icons/fa";
import {  FaBoxesStacked, FaCubes,  FaRectangleAd  } from "react-icons/fa6";

const WhyUs = () => {
  const features = [
    { title: "VIEWING", subTitle: "Great Quality", icon: <FaRectangleAd/> },
    { title: "AKASH", subTitle: "Exciting World Of", icon: <FaCubes></FaCubes> },
    { title: "SUPPORT", subTitle: "Professional Customer", icon: <FaHeadphones></FaHeadphones> },
    { title: "FEATURES", subTitle: "Wide Range of ", icon: <FaStar></FaStar> },
    { title: "EXPERIENCE", subTitle: "User Friendly", icon: <FaBoxesStacked></FaBoxesStacked> },
  ];

  return (
    <section className="p-8 md:px-16 px-6 text-center">
      {/* Title & Description */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Us</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Delivering high-speed, secure, and reliable internet with exceptional customer support to ensure you stay connected anytime, anywhere.
      </p>

      {/* Flash Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-center transition-transform transform hover:scale-105 hover:shadow-2xl "
          >
            <div className="text-5xl mb-3 justify-self-center">{feature.icon}</div>
            <p className="text-gray-600">{feature.subTitle}</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
