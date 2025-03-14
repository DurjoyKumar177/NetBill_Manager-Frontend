import { 
  FaWifi, FaShieldAlt, FaNetworkWired, FaSms, 
  FaHome, FaLink, FaHeadset, FaCreditCard 
} from "react-icons/fa";
import { useState } from "react";

const services = [
  {
    id: 1,
    icon: <FaWifi />,
    title: "Internet Connectivity",
    description: "High-speed, reliable internet.",
    details: [
      "Fast and stable fiber-optic internet connections.",
      "Available for home and business setups.",
      "Unlimited data plans for uninterrupted browsing, streaming, and gaming.",
      "Customer support for installation and troubleshooting."
    ]
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Security & Surveillance",
    description: "Advanced security solutions.",
    details: [
      "24/7 surveillance with high-definition CCTV cameras.",
      "Motion detectors and smart alerts for intrusions.",
      "Remote monitoring via mobile app or desktop.",
      "Installation, setup, and ongoing maintenance support."
    ]
  },
  {
    id: 3,
    icon: <FaNetworkWired />,
    title: "LAN Solution & Maintenance",
    description: "Reliable LAN setup & support.",
    details: [
      "End-to-end LAN installation for home, office, and enterprise networks.",
      "Structured cabling, network switches, and routers.",
      "Ongoing network support and troubleshooting.",
      "VPN setup and integration for secure remote access."
    ]
  },
  {
    id: 4,
    icon: <FaSms />,
    title: "Bulk SMS Service",
    description: "Fast & cost-effective SMS solutions.",
    details: [
      "Send promotional, transactional, and OTP messages.",
      "API integration for seamless SMS campaigns.",
      "Customizable sender IDs and scheduling options.",
      "Detailed reports and analytics for message tracking."
    ]
  },
  {
    id: 5,
    icon: <FaHome />,
    title: "Home Internet",
    description: "Stable & high-speed home internet.",
    details: [
      "Affordable home broadband plans for individuals and families.",
      "High-speed internet for smooth video calls, streaming, and browsing.",
      "Free installation and setup.",
      "Customer support available for troubleshooting."
    ]
  },
  {
    id: 6,
    icon: <FaLink />,
    title: "Data Connectivity",
    description: "Seamless data solutions.",
    details: [
      "Leased lines for uninterrupted internet connectivity.",
      "Custom bandwidth plans to suit your business needs.",
      "Mobile hotspots and portable data solutions.",
      "Global connectivity through secure VPN networks."
    ]
  },
  {
    id: 7,
    icon: <FaHeadset />,
    title: "Customer Support",
    description: "24/7 service support.",
    details: [
      "Expert support for all technical issues and inquiries.",
      "Phone, email, and live chat support channels.",
      "Service requests handled promptly for a seamless experience.",
      "Extended hours during network maintenance and upgrades."
    ]
  },
  {
    id: 8,
    icon: <FaCreditCard />,
    title: "Online Payment Gateway",
    description: "Secure online transactions.",
    details: [
      "Integrated payment gateway for online businesses.",
      "Supports multiple payment methods (Credit/Debit cards, PayPal, etc.).",
      "SSL encryption for secure transactions.",
      "Detailed transaction history and reporting features."
    ]
  }
];

const OtherServices = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="bg-gray-100 py-8 px-8 md:px-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h4 className="text-sm text-primary uppercase tracking-wide">Other Services</h4>
        <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto">
          Explore additional <span className="text-primary">offerings</span> to enhance your experience
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`relative bg-white shadow-lg rounded-2xl p-6 text-center transition-all duration-300 
              ${expandedCard === service.id ? "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-96 scale-110 bg-blue-100 shadow-2xl" : "hover:scale-105 hover:shadow-2xl"}
            `}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-20 h-20 bg-blue-200 text-blue-600 rounded-full mx-auto">
              <span className="text-4xl">{service.icon}</span>
            </div>

            {/* Title & Description */}
            <h2 className="mt-5 text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-gray-600">{service.description}</p>

            {/* Expanded Details */}
            {expandedCard === service.id && (
              <div className="mt-5 text-gray-800 text-sm">
                {service.details.map((detail, index) => (
                  <div key={index} className="mb-2">
                    <p>- {detail}</p>
                  </div>
                ))}
              </div>
            )}

            {/* More Button */}
            <button
              className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 transition"
              onClick={() => toggleExpand(service.id)}
            >
              {expandedCard === service.id ? "Less" : "More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;
