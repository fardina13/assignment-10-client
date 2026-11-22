"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  UserRound,
  Mail,
  Crown,
  Check,
  Sparkles,
  Camera,
  Save,
  LoaderCircle,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // States
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loadedUserId, setLoadedUserId] = useState(null);

  // Initialize user information
  if (user && loadedUserId !== user.id) {
    setLoadedUserId(user.id);
    setName(user.name || "");
    setImage(user.image || "");
  }

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        throw new Error(error.message || "Profile update failed");
      }

      setMessage("Profile updated successfully!");
      router.refresh();

    } catch (error) {
      setMessage(error.message || "Something went wrong!");

    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoaderCircle
          className="animate-spin text-[#A34D38]"
          size={30}
        />
      </div>
    );
  }

  // Authentication Check
  if (!user) {
    return (
      <div className="p-8 text-center text-[#746557] text-base">
        Please sign in to view your profile.
      </div>
    );
  }

  const isPremium = user.isPremium === true;

  return (
    <div className="w-full space-y-7">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-[#42382F]">
          My Profile
        </h1>

        <p className="text-base text-[#746557] mt-2">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Profile Form */}
        <div className="xl:col-span-2 bg-white border border-[#EAE4EB] rounded-xl p-6 md:p-8">

          {/* Form Heading */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#42382F]">
              Edit Profile
            </h2>

            <p className="text-base text-[#746557] mt-2">
              Update your profile information.
            </p>
          </div>

          {/* Profile Preview */}
          <div className="flex items-center gap-5 mb-9">

            <div className="w-24 h-24 rounded-full border-2 border-[#C9BBA9] overflow-hidden bg-[#FAFAFA] flex items-center justify-center shrink-0">

              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserRound
                  size={38}
                  className="text-[#746557]"
                />
              )}

            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#42382F] truncate">
                {user.name}
              </h3>

              <p className="text-base text-[#746557] truncate">
                {user.email}
              </p>

              {isPremium && (
                <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-[#A34D38]">
                  <Crown size={16} />
                  Premium Member
                </span>
              )}
            </div>

          </div>

          {/* Update Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-6"
          >

            {/* Full Name */}
            <div>
              <label className="block text-base font-semibold text-[#42382F] mb-3">
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#746557]"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full border border-[#C9BBA9] rounded-lg py-3.5 pl-12 pr-4 text-base text-[#42382F] outline-none focus:border-[#A34D38] transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-semibold text-[#42382F] mb-3">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#746557]"
                />

                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="w-full bg-[#F7F5F2] border border-[#C9BBA9] rounded-lg py-3.5 pl-12 pr-4 text-base text-[#746557] outline-none cursor-not-allowed"
                />
              </div>

              <p className="text-sm text-[#746557] mt-2">
                Your registered email address cannot be changed here.
              </p>
            </div>

            {/* Profile Image URL */}
            <div>
              <label className="block text-base font-semibold text-[#42382F] mb-3">
                Profile Image URL
              </label>

              <div className="relative">
                <Camera
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#746557]"
                />

                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full border border-[#C9BBA9] rounded-lg py-3.5 pl-12 pr-4 text-base text-[#42382F] outline-none focus:border-[#A34D38] transition"
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <p className="text-base text-[#A34D38]">
                {message}
              </p>
            )}

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#42382F] hover:bg-[#A34D38] disabled:opacity-60 text-white text-base font-semibold py-3.5 rounded-lg transition duration-300"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={19} />
                  Save Changes
                </>
              )}
            </button>

          </form>
        </div>

        {/* Premium Card */}
        <div className="bg-white border border-[#EAE4EB] rounded-xl p-6 md:p-7 h-fit">

          {/* Premium Header */}
          <div className="text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF1E9] flex items-center justify-center mb-5">
              <Crown
                size={36}
                className="text-[#A34D38]"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#42382F]">
              {isPremium ? "Premium Member" : "Go Premium"}
            </h2>

            <p className="text-base text-[#746557] mt-3 leading-7">
              {isPremium
                ? "Enjoy all the exclusive RecipeHub premium benefits."
                : "Unlock unlimited recipe uploads and enjoy exclusive features."}
            </p>

          </div>

          {/* Premium Benefits */}
          <div className="space-y-5 my-8">

            {[
              "Unlimited recipe uploads",
              "Premium profile badge",
              "Priority visibility",
              "Exclusive features",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#F5EDE7] flex items-center justify-center shrink-0">
                  <Check
                    size={15}
                    className="text-[#A34D38]"
                  />
                </span>

                <p className="text-base text-[#42382F]">
                  {feature}
                </p>
              </div>
            ))}

          </div>

          {/* Premium Status */}
          {isPremium ? (

            <div className="bg-[#FAF1E9] rounded-lg p-5 text-center">
              <Sparkles
                className="mx-auto text-[#A34D38] mb-3"
                size={26}
              />

              <p className="text-base font-semibold text-[#A34D38]">
                You are a Premium Member!
              </p>
            </div>

          ) : (

            <div className="text-center">

              <div className="mb-6">
                <span className="text-4xl font-bold text-[#A34D38]">
                  $9.99
                </span>

                <span className="text-base text-[#746557] ml-1">
                  / lifetime
                </span>
              </div>

              <Link
                href="/dashboard/user/premium"
                className="flex items-center justify-center gap-2 w-full bg-[#42382F] hover:bg-[#A34D38] text-white text-base font-semibold py-3.5 rounded-lg transition duration-300"
              >
                <Crown size={19} />
                Upgrade to Premium
              </Link>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}
