import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide high-speed internet, LAN solutions, surveillance, and customer support.",
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us via phone, email, or live chat 24/7.",
    },
    {
      question: "Do you offer business plans?",
      answer:
        "Yes, we offer customizable business internet plans with dedicated support.",
    },
    {
      question: "What is the installation process?",
      answer:
        "Our team will visit, install, and set up everything for you within 24 hours.",
    },
    {
      question: "Do you provide static IP addresses?",
      answer: "Yes, we offer static IPs for businesses and advanced users.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No hidden fees! We ensure transparent billing with no surprises.",
    },
    {
      question: "What is the maximum speed available?",
      answer: "Our plans go up to 1 Gbps for residential and business users.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, we offer a 7-day money-back guarantee for new customers.",
    },
  ];

  return (
    <section className="p-8 bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Find answers to the most common questions about our services.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-primary text-white shadow-md rounded-lg p-4 cursor-pointer transition-all duration-300"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center text-white text-lg font-medium">
              {faq.question}
              <FaChevronDown
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-white">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
