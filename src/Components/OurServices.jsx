import smartHome from "../assets/3-qaswd4igx5rp319sz2fgfk0g5d56e0ttnn3imzb9j4.jpg"
const OurServices = () => {
  return (
    <section className="p-8 bg-white">
      {/* Our Services Subtitle */}
      <div className="mb-8 text-center">
        <h2 className="text-sm font-semibold text-primary">Our Services</h2>
      </div>
      <div className="mb-8 text-center w-[20rem] mx-auto">
        <h2 className="text-3xl font-bold">We offer <span className="text-primary">higher-speed</span> internet solutions</h2>
      </div>

      {/* Services Section with Two Images Side by Side */}
      <div className="flex justify-between items-center gap-2">
        {/* Service 1 */}
        <div className="w-1/2 relative">
          <img src={smartHome} alt="Service 1" className="w-full h-full object-cover rounded-lg shadow-md" />
          <div className="absolute bottom-0 left-0 w-full  p-10 ">
            <h3 className="text-2xl font-semibold text-white">Smart Home</h3>
            <p className="text-white">Description of Service 1</p>
          </div>
        </div>

        {/* Service 2 */}
        <div className="w-1/2 relative">
          <img src={smartHome} alt="Service 2" className="w-full h-full object-cover rounded-lg shadow-md" />
          <div className="absolute bottom-0 left-0 w-full p-8 ">
            <h3 className="text-2xl font-semibold text-white">Server</h3>
            <p className="text-white">Description of Service 2</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
