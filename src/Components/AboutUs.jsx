import { FaPlayCircle } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className=" px-6 md:px-16">
      {/* About Us Subtitle */}
      <h4 className="text-sm text-primary m-5 font-semibold tracking-wider">
        ABOUT US
      </h4>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-4xl font-bold text-gray-900 leading-snug">
          Surf, <span className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
            stream
          </span> and <br />
          connect without limits.
        </h3>
        <button className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
          Learn More
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-2xl shadow-xl mt-6 bg-[#fcfbfa]">
        {/* Left Side (Title and Video) */}
        <div className="w-full sm:w-2/3 mb-8 sm:mb-0">
          {/* Video Card with Shadow */}
          <div className="relative shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden bg-[#fcfbfa] p-4 transition-all duration-300">
            <video
              className="w-full h-auto rounded-2xl"
              controls
              poster="../assets/New-Banner-24-qo3utmtygsaw82hagdp30vmyktbze1zbwib5s2yr5s.jpg"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-600 text-5xl drop-shadow-lg"
              style={{ zIndex: 10 }}
            >
              <FaPlayCircle />
            </button>
          </div>
        </div>

        {/* Right Side (Stats) */}
        <div className="w-full sm:w-1/3 flex flex-col items-center justify-between">
          <div className="flex flex-col items-start gap-8">
            <div className="stats shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 rounded-2xl bg-[#fcfbfa]">
              <div className="stat">
                <div className="stat-title text-gray-600">Homes Connected</div>
                <div className="stat-value text-gray-900">1000+</div>
                <div className="stat-desc text-gray-500">
                  20% more than last month
                </div>
              </div>
            </div>

            <div className="stats shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 rounded-2xl bg-[#fcfbfa]">
              <div className="stat">
                <div className="stat-title text-gray-600">Ultra Fast Internet</div>
                <div className="stat-value text-gray-900">10Gbps</div>
              </div>
            </div>

            <div className="stats shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 rounded-2xl bg-[#fcfbfa]">
              <div className="stat">
                <div className="stat-title text-gray-600">Satisfied Users</div>
                <div className="stat-value text-gray-900">1220</div>
                <div className="stat-desc text-gray-500">
                  30% more than last month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
