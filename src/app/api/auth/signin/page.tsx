"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Tent, LogIn, Mail, Lock, UserPlus } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/"); 
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-amber-200">
        <div className="flex flex-col items-center mb-6">
          <Tent className="h-10 w-10 text-amber-700 mb-2" />
          <h1 className="text-2xl font-bold text-amber-900">Welcome Back</h1>
          <p className="text-amber-600 text-sm">Sign in to your camping account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </label>
            <input
              required
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <Lock className="mr-2 h-4 w-4" />
              Password
            </label>
            <input
              required
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B5A2B] hover:bg-[#A67C52] text-white py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </button>
        </form>

        <p className="text-center text-amber-700 mt-6">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="text-[#8B5A2B] hover:underline font-medium flex items-center justify-center"
          >
            <UserPlus className="mr-1 h-4 w-4" />
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;