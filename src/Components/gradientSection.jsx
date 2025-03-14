import { FaGamepad, FaTrophy, FaWifi } from "react-icons/fa";

const GradientSection = () => {
  return (
    <section className="p-8 px-2md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Paragraph */}
        <div>
          <h2 className="text-3xl text-gray-900 font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-700">
            We provide high-speed, secure, and reliable internet solutions
            tailored to meet your needs. With 24/7 support, seamless
            connectivity, and industry-leading technology, we ensure the best
            experience for our customers.
          </p>
        </div>
        
        {/* Right Section - Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* First Row - Two Columns */}
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6 rounded-lg shadow-lg 
            transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:from-purple-500 hover:to-blue-400">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-center mb-4">Higher FPS</h3>
              <p className="text-gray-200 text-center">Enjoy ultra-fast internet with seamless browsing.</p>
              <p className="mt-5">
                <FaGamepad className="text-5xl transition-transform duration-300 hover:rotate-6" />
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6 rounded-lg shadow-lg 
            transition-transform duration-300 hover:scale-105 hover:from-purple-500 hover:to-blue-400">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold mb-4">Low Ping</h3>
              <p className="text-gray-200 text-center">
                Fast hosting & streaming anytime <br /> without worries
              </p>
              <p className="mt-5">
                <FaWifi className="text-5xl transition-transform duration-300 hover:rotate-6" />
              </p>
            </div>
          </div>

          {/* Second Row - One Full-Width Column */}
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6 rounded-lg shadow-lg col-span-2 
            transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:from-purple-500 hover:to-blue-400">
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold mb-2">Champion Result</h3>
                <p className="text-gray-200 text-center mb-4">
                  With blazing internet speed, enjoy the best graphics, 
                  realistic character & ultimate performance.
                </p>
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer">
                  <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold 
                    transition-all duration-300 hover:bg-white hover:text-blue-600 border border-transparent 
                    hover:border-blue-600">
                    Test Now
                  </button>
                </a>
              </div>
              <div>
                <FaTrophy className="text-5xl transition-transform duration-300 hover:rotate-6" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GradientSection;
