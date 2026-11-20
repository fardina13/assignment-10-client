"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "BROWSE RECIPES", href: "/recipes" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const {data: session, isPending} = useSession();
  // console.log("session data in navbar:", session, "isPending:", isPending);
  const user = session?.user;

  const handleSignOut = async ()=>{
    await signOut()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#3D2439]/10 bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/Logo.png"
            alt="RecipeHub Logo"
            width={260}
            height={130}
            priority
            className="h-[65px] w-[180px] object-cover object-center sm:h-[76px] sm:w-[220px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-[12px] font-medium tracking-wide transition-colors duration-200
                  ${
                    isActive
                      ? "text-[#A61D87]"
                      : "text-[#3D2439] hover:text-[#A61D87]"
                  }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#A61D87]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 lg:flex">

          {/* Search */}
          <Link
            href="/recipes"
            aria-label="Search recipes"
            className="text-[#3D2439] transition hover:text-[#A61D87]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </Link>

          {/* Login */}
          {
            user ?
            <>
              Hi, {user.name}
              <button 
               onClick={handleSignOut}
              className="border-l border-[#3D2439]/15 pl-5 text-[12px] font-medium text-[#3D2439] hover:text-[#A61D87]"
              >
               LOGOUT
              </button>
            </>
            :
            <Link
            href="/auth/signin"
            className="border-l border-[#3D2439]/15 pl-5 text-[12px] font-medium text-[#3D2439] hover:text-[#A61D87]"
          >
            LOGIN
          </Link>}

          {/* CTA */}
          <Link
            href="/auth/signup"
            className="flex items-center gap-2 bg-[#3D2439] px-6 py-3 text-[11px] font-semibold tracking-wide text-white transition hover:bg-[#A61D87]"
          >
            JOIN NOW
            <span>→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="rounded-md p-2 text-[#3D2439] hover:bg-[#3D2439]/5 lg:hidden"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#3D2439]/10 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-3 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-[#A61D87]/5 text-[#A61D87]"
                    : "text-[#3D2439] hover:bg-[#A61D87]/5 hover:text-[#A61D87]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 flex gap-3 border-t border-[#3D2439]/10 pt-4">
            
              {
                user ?
                <>
                 Hi, {user.name}
                 
                <button
                onClick={handleSignOut}
                className="flex-1 border border-[#3D2439] py-3 text-center text-sm font-medium text-[#3D2439]"
                >
                  Logout
                </button>
              
                </>
                :
                <Link
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 border border-[#3D2439] py-3 text-center text-sm font-medium text-[#3D2439]"
              >
                Login
              </Link>}

              <Link
                href="/auth/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 bg-[#3D2439] py-3 text-center text-sm font-medium text-white"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
