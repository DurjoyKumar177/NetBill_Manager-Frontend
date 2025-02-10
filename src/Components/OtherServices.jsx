import { FaWifi } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
const OtherServices = () => {
  return (
    <div className="bg-gray-100 p-10">
      <div className=" p-5">
        <h4 className="text-sm text-primary text-center m-5 ">
          Other Services
        </h4>
        <h2 className="text-3xl max-w-[28rem] mx-auto text-center font-semibold">
          Explore additional <span className="text-primary">offerings</span> to
          enhance your experience
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-10">
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaWifi className="text-5xl"> </FaWifi>
          </figure>
          <div className="card-body">
            <h2 className="card-title ">Internet Connectivity</h2>
            <p>High-speed, reliable internet for all your needs.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaShieldAlt className="text-5xl"></FaShieldAlt>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Security & Surveillance</h2>
            <p>Protect your premises with our advanced security systems.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaNetworkWired className="text-5xl"></FaNetworkWired>
          </figure>
          <div className="card-body">
            <h2 className="card-title">LAN Solution & Maintenance</h2>
            <p>Comprehensive LAN setup and ongoing maintenance.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaSms className="text-5xl"></FaSms>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Bulk SMS Service</h2>
            <p>Efficient, cost-effective bulk SMS services for businesses.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaHome className="text-5xl"></FaHome>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Home Internet</h2>
            <p>Fast and stable internet for your home.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaLink className="text-5xl"></FaLink>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Data Connectivity</h2>
            <p>
              Seamless data connectivity solutions for businesses and
              individuals.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaHeadset className="text-5xl"></FaHeadset>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Customer Support</h2>
            <p>24/7 support to keep your services running smoothly.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-blue-300">
          <figure className="h-40 w-40 mx-auto">
            <FaCreditCard className="text-5xl"></FaCreditCard>
          </figure>
          <div className="card-body">
            <h2 className="card-title">Online Payment Gateway</h2>
            <p>Secure online payment solutions for your business.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">More</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OtherServices;
