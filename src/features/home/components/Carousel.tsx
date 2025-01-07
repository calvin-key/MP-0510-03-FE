"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = () => {
  return (
    <div className="relative z-10 mx-auto flex items-center justify-center pt-5 md:h-full">
      <div className="relative w-[90%] max-w-5xl rounded-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="relative rounded-lg"
        >
          <SwiperSlide>
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-300 md:h-72">
              <Image
                src="/slide1.webp"
                alt="slide-1"
                fill
                className="object-cover"
              />
              <h2>Slide 1</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-300 md:h-72">
              <Image
                src="/slide2.jpg"
                alt="slide-2"
                fill
                className="object-cover"
              />
              <h2>Slide 2</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-300 md:h-72">
            <Image
                src="/slide3.jpg"
                alt="slide-3"
                fill
                className="object-cover"
              />
              <h2>Slide 3</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-300 md:h-72">
            <Image
                src="/slide4.jpg"
                alt="slide-4"
                fill
                className="object-cover"
              />
              <h2>Slide 4</h2>
            </div>
          </SwiperSlide>

          <button className="custom-prev absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#fafafa56] font-extrabold text-slate-700 shadow-lg md:flex">
            <ChevronLeft strokeWidth={2.5} absoluteStrokeWidth />
          </button>
          <button className="custom-next absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#ffffff56] font-extrabold text-slate-700 shadow-lg md:flex">
            <ChevronRight strokeWidth={2.5} absoluteStrokeWidth />
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
