
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Recipes", href: "/recipes" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const exploreLinks = [
  { name: "Popular Recipes", href: "/recipes" },
  { name: "Featured Recipes", href: "/recipes" },
  { name: "Join Community", href: "/register" },
  { name: "My Favorites", href: "/favorites" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.5Z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.1L5.7 22H2.5l7.3-8.4L1.8 2h6.4l4.5 6.6L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">

      {/* Main Footer */}
      <div className="w-full px-6 py-16 sm:px-8 md:px-12 lg:px-[7.2%] lg:py-20">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.9fr_0.9fr_1fr] lg:gap-12">

          {/* Column 1 - Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/Logo-white.png"
                alt="RecipeHub Logo"
                width={200}
                height={100}
                className="h-[58px] w-[180px] object-contain object-left"
              />
            </Link>

            <p className="mt-3 max-w-[290px] text-[13px] leading-7 text-white/55">
              Discover delicious recipes, share your cooking
              ideas, and explore culinary inspiration with
              food lovers around the world.
            </p>

            {/* Phone */}
            <div className="mt-4 flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 shrink-0"
              >
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.2 1l-2.3 2.2Z" />
              </svg>

              <div>
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="text-[16px] font-semibold text-white"
                >
                  +880 1XXX-XXXXXX
                </a>
                <p className="mt-0.5 text-[11px] text-white/50">
                  Got Questions? Contact us
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mt-6 mb-6 text-[19px] font-medium">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/55 transition-colors hover:text-[#D95BC0]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Navigation */}
          <div>
            <h3 className="mt-6 mb-6 text-[19px] font-medium">
              Navigation
            </h3>

            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name} className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/55 transition-colors hover:text-[#D95BC0]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="mt-6 mb-6 text-[19px] font-medium">
              Contact Us
            </h3>

            <div className="space-y-2 text-[13px]">

              <div>
                <p className="font-medium text-white">
                  Address:
                </p>
                <p className="leading-6 text-white/55">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div>
                <p className="font-medium text-white">
                  Email:
                </p>
                <a
                  href="mailto:contact@recipehub.com"
                  className="break-all text-white/55 transition-colors hover:text-[#D95BC0]"
                >
                  contact@recipehub.com
                </a>
              </div>

            </div>

            {/* Social Icons - Under Contact */}
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#414141] text-white transition-all duration-300 hover:bg-[#A61D87]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-5 py-5">
        <p className="text-center text-[11px] text-white/45">
          Copyright © {new Date().getFullYear()} RecipeHub.
          All rights reserved.
        </p>
      </div>

    </footer>
  );
}
