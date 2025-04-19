"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import getUserProfile from "@/libs/getUserProfile";
import { Tent, MapPin, Calendar, LogIn, LogOut, UserPlus } from "lucide-react";

export default function TopMenu() {
  const { data: session } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user.token) {
        try {
          const userProfile = await getUserProfile(session.user.token);
          setRole(userProfile.data.role);
        } catch (error) {
          console.error("Failed to load user profile:", error);
          setError("Failed to load user profile");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [session]);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-[70px] bg-amber-50 border-b border-amber-200 shadow-sm flex items-center justify-between px-8">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <div className="flex items-center text-2xl font-bold text-amber-800 transform transition-all hover:scale-105">
            <Tent className="mr-2 h-6 w-6" />
            CampGround
          </div>
        </Link>
        
        <TopMenuItem 
          title="My Bookings" 
          pageRef="/mybooking" 
          icon={<Calendar className="mr-1 h-4 w-4" />} 
        />
        
        <TopMenuItem 
          title="Book Now" 
          pageRef="/campbooking" 
          icon={<MapPin className="mr-1 h-4 w-4" />} 
        />

        {role === "admin" && (
          <TopMenuItem
            title="Manage Campground"
            pageRef="/managecampground"
            icon={<MapPin className="mr-1 h-4 w-4" />}
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        {session ? (
          <Link href="/signout">
            <button className="flex items-center bg-amber-700 hover:bg-amber-800 text-amber-50 font-medium py-2 px-4 rounded-lg transition duration-300 border border-amber-800">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </Link>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <button className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 border border-amber-700">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="flex items-center bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition duration-300 border border-green-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}