import HeroSlider from "../Components/HeroSlider.jsx";
import Navbar from "../Components/Navbar.jsx";
import PackagePlans from "../Components/PackagePlans.jsx";
import OtherServices from "../Components/OtherServices.jsx";
import OurProducts from "../Components/OurProducts.jsx";
import AboutUs from "../Components/AboutUs.jsx";
import OurServices from "../Components/OurServices.jsx";
import WhyUs from "../Components/WhyUs.jsx";
import GradientSection from "../Components/gradientSection.jsx";
import FaqSections from "../Components/FaqSections.jsx";
import ContactUs from "../Components/ContactUs.jsx";
import Footer from "../Components/Footer.jsx";

const Home = () => {
  // Colors: primary ,base
  return (
    <>
      <div className="container mx-auto">
        <HeroSlider></HeroSlider>
        <PackagePlans></PackagePlans>
        <OtherServices></OtherServices>
        <OurProducts></OurProducts>
        <AboutUs></AboutUs>
        <OurServices></OurServices>
        <WhyUs></WhyUs>
        <GradientSection></GradientSection>
        <FaqSections></FaqSections>
        <ContactUs></ContactUs>
      </div>
    </>
  );
};

export default Home;
