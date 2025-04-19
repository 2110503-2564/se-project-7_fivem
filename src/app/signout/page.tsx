"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tent, LogOut, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

const SignOut = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signOut({ callbackUrl: "/" });
      // The callbackUrl will handle the redirect after successful sign out
    } catch (err) {
      setError("Failed to sign out. Please try again.");
      console.error("Sign out error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-4 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-600 mb-3"></div>
            <p className="text-amber-800 font-medium">Signing you out...</p>
          </div>
        </div>
      )}

      <div className={`w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-amber-200 transition-opacity ${
        isLoading ? "opacity-70" : "opacity-100"
      }`}>
        <div className="flex flex-col items-center mb-6">
          <Tent className="h-10 w-10 text-amber-700 mb-2" />
          <h1 className="text-2xl font-bold text-amber-900">Ready to Leave?</h1>
          <p className="text-amber-600 text-sm">We hope to see you back soon for more adventures</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className={`w-full bg-[#8B5A2B] hover:bg-[#A67C52] text-white py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing out...
              </span>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            )}
          </button>

          <Link
            href="/"
            className="w-full border border-amber-300 text-amber-700 hover:bg-amber-50 py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center"
            onClick={(e) => isLoading ? e.preventDefault() : null}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </div>

        <p className="text-center text-amber-700 mt-6 text-sm">
          Changed your mind? Stay logged in and keep planning your next trip!
        </p>
      </div>
    </main>
  );
};

export default SignOut;