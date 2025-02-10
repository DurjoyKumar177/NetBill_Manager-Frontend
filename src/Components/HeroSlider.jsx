
import FirstImg from "../assets/FirstImage.jpg"
import SecondImg from "../assets/secondImage.jpg"
import ThirdImg from "../assets/ThirdImage.jpg"
const HeroSlider = () => {
  const image1 = FirstImg;
  const image2 =SecondImg;
  const image3 =ThirdImg;
  return (
    <div className="carousel w-full">
      {/* Slide1 start */}
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src={image1}
          className="w-full"
        />
        
        {/* Slide1 Control start */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle btn-outline btn-primary">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle btn-outline btn-primary">
            ❯
          </a>
        </div>
        {/* Slide1 Control ends */}
      </div>
      {/* Slide1 ends */}
      {/* Slide2 start */}
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src={image2}
          className="w-full"
        />
        {/* Slide2 Control start */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle btn-outline btn-primary">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle btn-outline btn-primary">
            ❯
          </a>
        </div>
        {/* Slide2 Control ends */}
      </div>
      {/* Slide2 Control ends */}
      {/* Slide3 start */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src={image3}
          className="w-full"
        />
        {/* Slide3 Control start */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle btn-outline btn-primary">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle btn-outline btn-primary">
            ❯
          </a>
        </div>
        {/* Slide3 Control ends */}
      </div>
      {/* Slide3 ends */}
    </div>
  );
};

export default HeroSlider;
