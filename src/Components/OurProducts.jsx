import routerImg from "../assets/Router.jpeg";
import ModemImg from "../assets/Modem.jpeg";
import mobileRouterImg from "../assets/MobleRouter.jpg";
import PortableModemImg from "../assets/PortableModem.jpeg";

const OurProducts = () => {
  return (
    <div>
      <div className=" p-5">
        <h4 className="text-sm text-primary text-center m-5 ">Our Products</h4>
        <h2 className="text-3xl max-w-[28rem] mx-auto text-center font-semibold">
          Explore a wide range of services designed to meet your needs
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 p-8">
        <div className=" bg-primary p-6 rounded-lg shadow-lg">
          <figure className="h-56">
            <img
              src={routerImg}
              alt="Router"
              className="  w-full h-full object-cover rounded-lg"
            />
          </figure>
          <div className=" text-center">
            <h3 className="text-xl font-semibold text-white">Router</h3>
          </div>
        </div>
        <div className=" bg-primary p-6 rounded-lg shadow-lg">
          <figure className="h-56">
            <img
              src={ModemImg}
              alt="Modem"
              className=" w-full h-full object-cover  rounded-lg"
            />
          </figure>
          <div className="  text-center">
            <h3 className="text-xl font-semibold text-white">Modem</h3>
          </div>
        </div>
        <div className=" bg-primary p-6 rounded-lg shadow-lg">
          <figure className="h-56">
            <img
              src={mobileRouterImg}
              alt="Mobile Router"
              className=" w-full h-full object-cover rounded-lg"
            />
          </figure>
          <div className=" text-center">
            <h3 className="text-xl font-semibold text-white">Mobile Router</h3>
          </div>
        </div>
        <div className="bg-primary p-6 rounded-lg shadow-lg">
          <figure className="h-56">
            <img
              src={PortableModemImg}
              alt="Portable Modem"
              className="w-full h-full object-cover rounded-lg"
            />
          </figure>
          <div className=" text-center">
            <h3 className="text-xl font-semibold text-white">Portable Modem</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
