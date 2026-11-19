"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    category: "TRADITIONAL SWEETS",
    title: "Jilapi with Rabri-A Sweet Tradition Worth Savoring",
    description:
      "Golden, crispy, and irresistibly sweet! Enjoy the timeless taste of traditional Jilapi paired with rich, creamy Rabri. A delightful combination that makes every bite truly special.",
    image: "/Jilapi with rabri.jpg",
    time: "25 min",
    badge: "Sweet Delight",
  },
  {
    category: "FRESHLY BREWED",
    title: "Coffee-Make Every Sip a Little Moment of Joy",
    description:
      "Start your day with a comforting cup of coffee. Rich aroma, smooth texture, and a delightful taste make every sip a little moment of happiness.",
    image: "/Coffee.jpg",
    time: "10 min",
    badge: "Coffee Time",
  },
  {
    category: "CRISPY & DELICIOUS",
    title: "Chicken Lollipop-Bring the Perfect Crunch to Your Plate",
    description:
      "Juicy chicken with a crispy golden coating and delicious spices. A perfect appetizer to bring extra flavor and excitement to your table.",
    image: "/Chicken lollipop.jpg",
    time: "30 min",
    badge: "Chef's Special",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#FFFBF5]">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.14]"
        />
      </div>

      {/* Main Container - Same as Navbar */}
      <div className="mx-auto grid min-h-[700px] w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-10 lg:grid-cols-2 lg:gap-16 lg:pl-[100px] lg:pr-16">

        {/* Left Content */}
        <div className="relative z-10 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
  duration: 1.2,
  ease: "easeInOut",
}}
            >
              <p className="mb-5 text-sm font-bold tracking-wider text-green-500 md:text-base">
                {activeSlide.category}
              </p>

              <h1 className="mb-6 max-w-[750px] text-4xl font-bold leading-[1.15] text-[#3D2439] sm:text-5xl xl:text-[64px]">
                {activeSlide.title}
              </h1>

              <p className="mb-8 max-w-[650px] text-base leading-8 text-[#665B5B] md:text-lg">
                {activeSlide.description}
              </p>

              <button
                type="button"
                className="rounded-md bg-[#A61D87] px-9 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#86166D]"
              >
                Explore Recipe
                <span className="ml-3">→</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image Area */}
        <div className="relative order-1 mx-auto flex w-full max-w-[520px] items-center justify-center lg:order-2">

          {/* Main Image Wrapper */}
          <div className="relative z-10 aspect-[470/512] w-full max-w-[470px]">

            {/* Plum Organic Emblem - Behind Main Image */}
            
            <motion.div
  className="absolute -left-[120px] -top-[100px] z-0"
  animate={{ rotate: [0, 8, 0, -5, 0] }}
  transition={{
    duration: 9,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <Image
    src="/Plum Organic Emblem.png"
    alt=""
    width={300}
    height={300}
    className="h-auto w-[400px] max-w-none"
  />
</motion.div>

            {/* Main Food Image */}
            <AnimatePresence mode="sync" initial={false}>
  <motion.div
    key={activeSlide.image}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      opacity: {
        duration: 1.8,
        ease: "easeInOut",
      },
    }}
    className="absolute inset-0 z-10 overflow-hidden rounded-[14px] shadow-xl"
  >
    <Image
      src={activeSlide.image}
      alt={activeSlide.title}
      fill
      priority={activeIndex === 0}
      sizes="(max-width: 768px) 90vw, 470px"
      className="object-cover"
    />
  </motion.div>
</AnimatePresence>

            {/* Badge */}
            <div className="absolute -right-[75px] top-[15%] z-30 rounded-xl bg-white px-6 py-5 shadow-lg">
              <span className="text-sm font-semibold text-[#A61D87]">
                ✦ {activeSlide.badge}
              </span>
            </div>

            {/* Cooking Time */}
            <div className="absolute -bottom-[45px] -left-[90px] z-30 flex h-[140px] w-[140px] flex-col items-center justify-center rounded-full bg-white shadow-lg">
              <span className="mb-2 text-2xl text-[#FF6257]">◷</span>
              <span className="text-sm font-bold text-gray-500">
                {activeSlide.time}
              </span>
            </div>

            {/* Abstract Scribble - Overlapping Main Image */}
            <motion.div
  className="absolute -bottom-[90px] -right-[70px] z-20"
  animate={{ rotate: [0, -8, 0, 5, 0] }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <Image
    src="/Abstract Scribble Burst.png"
    alt=""
    width={300}
    height={300}
    className="h-auto w-[310px] max-w-none"
  />
</motion.div>

          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="relative z-30 flex items-center justify-center gap-3 pb-8">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-3 rounded-full transition-all duration-1000 ease-in-out ${
              activeIndex === index
                ? "w-3 bg-[#A61D87]"
                : "w-3 bg-[#A61D87]/40 hover:bg-[#A61D87]"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
