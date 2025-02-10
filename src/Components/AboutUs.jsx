import { FaPlayCircle } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="p-8 bg-gray-100">
      {/* About Us Subtitle */}
      <h4 className="text-sm text-primary m-5 ">ABOUT US</h4>
      <div className="flex justify-between">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">
          Surf, <span className="text-primary">stream</span> and <br />
          connect without limits.
        </h3>
        <button className="bg-purple-600 text-white py-2 px-4 rounded-lg mb-8 hover:bg-purple-700 transition">
          Learn More
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-8 rounded-lg shadow-lg">
        {/* Left Side (Title and Video) */}
        <div className="w-full sm:w-2/3 mb-8 sm:mb-0">
          {/* Video */}
          <div className="relative">
            <video
              className="w-full h-auto rounded-lg"
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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-600 text-4xl"
              style={{ zIndex: 10 }}
            >
              <FaPlayCircle></FaPlayCircle>
            </button>
          </div>
        </div>

        {/* Right Side (Button and Stats) */}
        <div className="w-full sm:w-1/3 flex flex-col items-center justify-between">
          {/* Button */}

          {/* Stats */}
          <div className="flex flex-col items-start gap-10">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Homes Connected</div>
                <div className="stat-value">1000+</div>
                <div className="stat-desc">20% more than last month</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Ultra Fast internet</div>
                <div className="stat-value">10Gbps</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Satisfied Users</div>
                <div className="stat-value">122000</div>
                <div className="stat-desc">30% more than last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
