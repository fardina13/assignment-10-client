
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, image, password } = formData;

    if (!name.trim() || !email.trim() || !image.trim() || !password) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      showToast(
        "Password must have 6 characters, uppercase and lowercase letters.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      const { error } = await signUp.email({
        name,
        email,
        image,
        password,
        callbackURL: "/",
      });

      if (error) {
        showToast(error.message || "Registration failed.", "error");
        return;
      }

      showToast("Account created successfully!");

      setTimeout(() => router.push("/"), 1200);
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        showToast(error.message || "Google signup failed.", "error");
        setGoogleLoading(false);
      }
    } catch (error) {
      showToast(error.message || "Google signup failed.", "error");
      setGoogleLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#C9BBA9] bg-white/70 px-4 py-2.5 text-sm text-[#42382F] outline-none transition placeholder:text-[#A69A8C] focus:border-[#A34D38] focus:ring-1 focus:ring-[#A34D38]";

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pt-4 pb-10"
      style={{
        backgroundImage: "url('/recipehub-signup-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed right-5 top-5 z-50 rounded-lg border px-5 py-3 text-sm shadow-xl ${
            toast.type === "error"
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-green-300 bg-green-50 text-green-700"
          }`}
        >
          {toast.type === "error" ? "✕ " : "✓ "}
          {toast.message}
        </div>
      )}

      <motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative z-10 w-full max-w-md"
>
        {/* Content Outside Form */}
        <div className="mb-2 text-center text-white">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[4px] text-[#482641]">
            Welcome to RecipeHub
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Join Our Community
          </h1>

          {/* <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#482641]">
            Discover delicious recipes, share your favorites,
            and make every meal special.
          </p> */}
        </div>

        {/* Form Card */}
        <div className="rounded-xl bg-[#fafafa] p-6 shadow-2xl sm:p-8 ">

          <form onSubmit={handleSignup} className="space-y-3">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#42382F]">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#42382F]">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#42382F]">
                Profile Image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="Paste your profile image URL"
                value={formData.image}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#42382F]">
                Password <span className="text-rose-400">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={`${inputClass} pr-16`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#A34D38]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-[#817467]">
                At least 6 characters, one uppercase and one lowercase letter.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full rounded-md bg-[#A61D87] py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#86166D] disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Google Signup */}
          <button
  type="button"
  onClick={handleGoogleSignup}
  className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-[#5C4033] hover:opacity-80"
>
  <FcGoogle size={22} />
  {googleLoading ? "Connecting..." : "Sign up with Google"}
  
</button>
            

            
          

          {/* Sign In */}
          <p className="mt-2 text-center text-sm text-[#746557]">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="font-bold text-[#A34D38] hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
