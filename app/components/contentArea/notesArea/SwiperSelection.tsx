"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { FreeMode } from "swiper/modules";

export default function SwiperSelection() {
  const tags = [
    "React state",
    "React hooks",
    "React context",
    "Tailwind",
    "Next.js",
    "Typescript",
    "React router",
    "React testing",
    "React animations",
    "React components",
  ];
  return (
    <div className="bg-white p-3 rounded-lg flex gap-5">
      <div className="overflow-x-auto w-[1112px]">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="tagSwiper"
        >
          <SwiperSlide className="bg-mainColor text-white rounded-md w-20">
            All
          </SwiperSlide>
          {tags.map((tag) => (
            <SwiperSlide key={tag} className="text-slate-400">
              {tag}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button className="bg-mainColor text-white p-1 px-3 flex items-center rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        <span>Tag</span>
      </button>
    </div>
  );
}
