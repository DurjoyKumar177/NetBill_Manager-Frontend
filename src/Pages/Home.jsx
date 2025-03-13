import HeroSlider from "../Components/HeroSlider.jsx";
import PackagePlans from "../Components/PackagePlans.jsx";
import OtherServices from "../Components/OtherServices.jsx";
import OurProducts from "../Components/OurProducts.jsx";
import AboutUs from "../Components/AboutUs.jsx";
import OurServices from "../Components/OurServices.jsx";
import WhyUs from "../Components/WhyUs.jsx";
import GradientSection from "../Components/gradientSection.jsx";
import FaqSections from "../Components/FaqSections.jsx";

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
      </div>
    </>
  );
};

export default Home;
