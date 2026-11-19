
import Image from "next/image";

const images = [
  { src: "/Beef steak.jpg", alt: "Beef Steak" },
  { src: "/Croisont.jpg", alt: "Croissant" },
  { src: "/Shami kabab.jpg", alt: "Shami Kabab" },
  { src: "/Shushlik.jpg", alt: "Shushlik" },
  { src: "/Stuffed bun.jpg", alt: "Stuffed Bun" },
  { src: "/Tacos.jpg", alt: "Tacos" },
];

const InstagramGallery = () => {
  return (
    <section className="w-full bg-white">
      {/* Instagram Heading */}
      <div className="flex flex-col items-center justify-center py-16 text-center">

        {/* Instagram Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#302B27]"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>

        <p className="mt-2 text-xs text-gray-500">
          @recipehub
        </p>

        <h2 className="mt-3 font-serif text-3xl text-[#302B27] md:text-[34px]">
          Follow Us on Instagram
        </h2>
      </div>

      {/* Instagram Gallery */}
      <div className="grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-6">
        {images.map((image, index) => (
          <div
            key={image.src}
             className={`relative aspect-square w-full overflow-hidden ${
    index !== images.length - 1 ? "border-r border-white/70" : ""
  }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.67vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;
