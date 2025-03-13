import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300  text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">Confidence Cable Network Ltd.</h2>
          <p className="mt-2 text-gray-600">Providing reliable tech solutions since 2017.</p>
          <p className="text-gray-600">Committed to excellent customer service and innovation.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Links</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#" className="hover:text-blue-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Services</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Support</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h2>
          <p className="flex items-center gap-2 text-gray-700"><FaPhoneAlt /> <a href="tel:+01521738141">+01521738141</a></p>
          <p className="flex items-center gap-2 text-gray-700"><FaEnvelope /> <a href="mailto:confidencecable@company.com">confidencecable@company.com</a></p>
          <p className="flex items-center gap-2 text-gray-700"><FaMapMarkerAlt /> Kanchpur, Sonargaon, Narayangonj</p>
          
          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" className="text-blue-600 text-xl hover:text-blue-800"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" className="text-blue-400 text-xl hover:text-blue-600"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" className="text-pink-500 text-xl hover:text-pink-700"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" className="text-blue-700 text-xl hover:text-blue-900"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center py-4 bg-gray-200 text-gray-700 text-sm">
        &copy; {new Date().getFullYear()} DK Technologies. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
