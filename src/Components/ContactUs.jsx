import { toast } from "react-toastify";


const ContactUs = () => {
  const showSuccess = () => toast.success("✅ Success! Your form was submitted.");
  const handleContact=()=>{
      showSuccess()
  }
  return (
        <section className="p-10 bg-gray-100">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Side: Office Address & Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600">Reach out to us for any inquiries or assistance.</p>
    
              {/* Office Address */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Office Address</h3>
                <p className="text-gray-600 mt-2">123 Street Name, City, Country</p>
              </div>
    
              {/* Contact Info */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                <p className="text-gray-600 mt-2">📞 Phone: +123 456 789</p>
                <p className="text-gray-600 mt-2">📧 Email: contact@company.com</p>
                <p className="text-gray-600 mt-2">🌍 Website: www.company.com</p>
              </div>
            </div>
    
            {/* Right Side: Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={handleContact}>
                <input type="text" placeholder="Your Name" className="w-1/2 p-3 border border-primary rounded-lg inline-block" />
                <input type="email" placeholder="Your Email" className="w-1/2 p-3 border border-primary rounded-lg inline-block" />
                <input type="tel" placeholder="Your Number" className="w-full p-3 border border-primary rounded-lg" />
                <input type="text" placeholder="Choose Subject" className="w-full p-3 border border-primary rounded-lg" />
                <textarea placeholder="Enter Your Message" rows="4" className="w-full p-3 border border-primary rounded-lg"></textarea>
                <button type="submit" className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition">
                  Submit
                </button>
              </form>
            </div>
    
          </div>
        </section>

    
  );
};

export default ContactUs;