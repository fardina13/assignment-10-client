
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const foodImages = [
  {
    src: "/Coffee2.jpg",
    alt: "Freshly brewed coffee",
    offset: "md:translate-y-0",
  },
  {
    src: "/Cupcakes.jpg",
    alt: "Colorful homemade cupcakes",
    offset: "md:translate-y-10",
  },
  {
    src: "/Kaju%20borfi.jpg",
    alt: "Traditional kaju borfi",
    offset: "md:translate-y-0",
  },
  {
    src: "/Pastry.jpg",
    alt: "Freshly baked pastries",
    offset: "md:translate-y-10",
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-transparent px-5 py-20 md:py-28">

      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-sm tracking-wide text-[#A61D87]"
        >
          About Us
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl leading-tight text-[#3D2439] sm:text-4xl md:text-5xl"
        >
          Where Every Recipe
          <br />
          Becomes a{" "}
          <span className="text-[#A61D87]">Story Worth Sharing</span>
        </motion.h2>

        {/* Divider */}
        <div className="mx-auto my-6 flex w-48 items-center justify-center">
          <span className="h-px flex-1 bg-[#D8CFCF]" />
          <span className="mx-2 h-2 w-2 rounded-full bg-[#A61D87]" />
          <span className="h-px flex-1 bg-[#D8CFCF]" />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-2xl text-sm leading-7 text-[#77716F] md:text-base"
        >
          RecipeHub is a place where food lovers come together to
          discover, create and share their favorite recipes. From
          everyday meals to special treats, explore new flavors,
          save your favorites and inspire others through the joy
          of cooking.
        </motion.p>
      </div>

      {/* Food Gallery */}
      <div className="relative mx-auto mt-14 max-w-[900px] md:mt-16">

  {/* Decorative wheat */}
  <svg
    className="pointer-events-none absolute -left-25 bottom-10 z-0 hidden h-52 w-52 text-[#EBC5D4] opacity-60 md:block"
    viewBox="0 0 200 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M150 205 C75 185 35 125 65 25"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {Array.from({ length: 9 }).map((_, i) => (
      <g key={i}>
        <path
          d={`M${65 - i * 2} ${35 + i * 15} Q${25 - i} ${25 + i * 15} ${30 - i} ${52 + i * 15}`}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={`M${65 - i * 2} ${35 + i * 15} Q${95 - i} ${28 + i * 15} ${90 - i} ${55 + i * 15}`}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    ))}
  </svg>

  <div className="relative z-10 grid grid-cols-2 items-center gap-x-5 gap-y-7 md:grid-cols-4 md:gap-x-6">

    {foodImages.map((item, index) => (
      <motion.div
        key={item.src}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: index * 0.15,
          ease: "easeOut",
        }}
        className={`relative aspect-[2/3] w-full overflow-hidden ${item.offset}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 45vw, 207px"
          className="object-cover transition-transform duration-[2000ms] ease-out hover:scale-110"
        />
      </motion.div>
    ))}

  </div>
</div>
    </section>
  );
}
