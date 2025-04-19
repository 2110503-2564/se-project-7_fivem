"use client";
import { useState } from "react";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";
import { Tent, User, Mail, Phone, Lock, LogIn } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const telPattern = /^0[689]\d{8}$|^0[689]-\d{3}-\d{4}$/;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Name is required";
    if (!emailPattern.test(email)) newErrors.email = "Invalid email format";
    if (!telPattern.test(tel)) newErrors.tel = "Invalid Thai phone number format";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrors({});
    setLoading(true);

    try {
      const response = await userRegister(name, email, tel, password);
      if (response.success) {
        router.push("/api/auth/signin");
      }
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-amber-200">
        <div className="flex flex-col items-center mb-6">
          <Tent className="h-10 w-10 text-amber-700 mb-2" />
          <h1 className="text-2xl font-bold text-amber-900">Create Account</h1>
          <p className="text-amber-600 text-sm">Join our camping community</p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <User className="mr-2 h-4 w-4" />
              Full Name
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.name ? "border-red-500" : "border-amber-200 focus:ring-2 focus:ring-amber-500"
              }`}
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-amber-200 focus:ring-2 focus:ring-amber-500"
              }`}
              type="email"
              placeholder="john@example.com"
              pattern={emailPattern.source}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <Phone className="mr-2 h-4 w-4" />
              Phone Number
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.tel ? "border-red-500" : "border-amber-200 focus:ring-2 focus:ring-amber-500"
              }`}
              type="tel"
              placeholder="081-234-5678 or 0812345678"
              pattern={telPattern.source}
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            {errors.tel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tel} (Valid formats: 0812345678 or 081-234-5678)
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <Lock className="mr-2 h-4 w-4" />
              Password (min 6 characters)
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-amber-200 focus:ring-2 focus:ring-amber-500"
              }`}
              type="password"
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B5A2B] hover:bg-[#A67C52] text-white py-3 px-4 rounded-lg shadow-md transition-colors disabled:bg-amber-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form> 
        <p className="text-center text-amber-700 mt-6 w-120">
          Already have an account?{" "}
          <a
            href="/api/auth/signin"
            className="text-[#8B5A2B] hover:underline font-medium flex items-center justify-center"
          >
            <LogIn className="mr-1 h-4 w-4" />
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}