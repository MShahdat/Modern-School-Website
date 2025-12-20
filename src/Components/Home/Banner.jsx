import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  { src: 'https://images.pexels.com/photos/27549599/pexels-photo-27549599.jpeg', title: 'Library' },
  { src: 'https://images.unsplash.com/photo-1643391448949-735f48c6ef66?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Admin Building' },
  { src: 'https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Play Ground' },
  { src: 'https://images.pexels.com/photos/28448938/pexels-photo-28448938.jpeg', title: 'Classroom' },
];

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    className="absolute top-1/2 right-4 z-20 -translate-y-1/2 cursor-pointer text-white bg-black/20 p-2 rounded-full"
    onClick={onClick}
    aria-label="Next slide"
  >
    <FaArrowRight size={20} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    className="absolute top-1/2 left-4 z-20 -translate-y-1/2 cursor-pointer text-white bg-black/20 p-2 rounded-full"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <FaArrowLeft size={20} />
  </button>
);

const Banner = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    fade: true,
    cssEase: 'ease-in-out',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    dotsClass: 'slick-dots custom-dots',
    appendDots: (dots) => (
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ul className="pointer-events-auto absolute bottom-22 left-1/6 -translate-x-1/2 flex items-center gap-1">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        type="button"
        aria-label={`Go to slide ${i + 1}`}
        className="bubble block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white transition-colors duration-300 ring-1 ring-white/50"
      />
    ),
  };

  const fx = ['fx-zoom', 'fx-zoom', 'fx-zoom', 'fx-zoom'];

  return (
    <div className=''>
      <style>{`
        .slide-wrap { position: relative; overflow: hidden; }
        .slide-img  { width:100%; height:100%; object-fit:cover; }

        /* fixed height wrapper so images never change page size */
        .fixed-banner-height { height: 500px; }

        /* 1) Zoom */
        .slick-current .fx-zoom .slide-img {
          animation: pptZoom 4s ease-in-out both;
          will-change: transform, filter;
          transform-origin: center center;
        }
        @keyframes pptZoom {
          0%   { transform: scale(1.12); filter: brightness(0.98); }
          100% { transform: scale(1.00); filter: brightness(1); }
        }

        /* 2) Shape */
        .slick-current .fx-shape .slide-img {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: pptShapeOpen 1100ms ease-out forwards;
          will-change: clip-path;
        }
        @keyframes pptShapeOpen {
          to {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        @supports not (clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)) {
          .slick-current .fx-shape .slide-img {
            animation: pptFadeIn .6s ease-out both;
            opacity: 0;
          }
          @keyframes pptFadeIn { to { opacity: 1; } }
        }
      `}</style>

      <div className="mx-auto w-full relative fixed-banner-height">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className={`relative slide-wrap fixed-banner-height ${fx[index % fx.length]}`}>
              <img
                className="slide-img"
                src={slide.src}
                alt={`Slide ${index + 1}`}
              />

              {/* Title Overlay (unchanged) */}
              <div className="absolute inset-0 flex items-end z-10">
                <div className="w-full py-14 px-6 sm:px-10 md:px-24">
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-md text-right">
                    {/* 🔵 Style 1: Glassmorphism */}
                    {/* <span className="backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-lg shadow-md">
                      {slide.title}
                    </span> */}


                    {/* 🟢 Style 3: Neon Glow */}
                    <span className="px-4 py-2 rounded-md bg-black/40 backdrop-blur-sm text-white shadow-[0_0_15px_rgba(59,130,246,0.7)]">
        {slide.title}
      </span>

                    {/* 🟠 Style 4: Frosted Gradient */}
                    {/* <span className="px-4 py-2 rounded-lg backdrop-blur-lg bg-gradient-to-r from-white/20 via-white/10 to-transparent border border-white/20">
        {slide.title}
      </span> */}

                    {/* 🔴 Style 5: Glow Underline */}
                    {/* <span className="relative px-4 py-2 bg-black/40 backdrop-blur-sm rounded-md">
        {slide.title}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></span>
      </span> */}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
