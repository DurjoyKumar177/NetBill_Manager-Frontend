import RouterImg from "../assets/routerpic.webp";
import Cable from "../assets/Cable.jpg";
import cctv from "../assets/cctv.jpg";
import tvBox from "../assets/tvBox.jpg";

const OurProducts = () => {
  const products = [
    { img: RouterImg, title: "Router" },
    { img: Cable, title: "Ethernet Cable" },
    { img: cctv, title: "CCTV Camera" },
    { img: tvBox, title: "TV Box" },
  ];

  return (
    <div className="p-5 bg-gray-100">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h4 className="text-sm text-blue-600 uppercase tracking-wide">Our Products</h4>
        <h2 className="text-3xl max-w-xl mx-auto font-semibold text-gray-800">
          Explore a wide range of services designed to meet your needs
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 p-8">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Image Container */}
            <figure className="relative h-56 rounded-xl overflow-hidden">
              <img 
                src={product.img} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
            </figure>

            {/* Product Title */}
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-gray-700">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
