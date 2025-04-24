"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import getUserProfile from "@/libs/getUserProfile";
import Image from "next/image";
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
    <div className="fixed top-0 left-0 right-0 z-30 h-[70px] bg-white border-b border-green-500 shadow-sm flex items-center justify-between px-8">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <div className="flex items-center text-2xl font-bold text-green-800 transform transition-all hover:scale-105">
            <Image
              src={"/img/logo.png"}
              alt='Camping adventure'
              width={24}
              height={24}
              className="mr-2 h-8 w-8"              
            />
            CampGround
          </div>
        </Link>

        {role === "user" && (
        <TopMenuItem 
          title="My Bookings" 
          pageRef="/mybooking" 
          icon={<Calendar className="mr-1 h-4 w-4" />} 
        />
        )}

        {role === "admin" && (
        <TopMenuItem 
          title="All Bookings" 
          pageRef="/mybooking" 
          icon={<Calendar className="mr-1 h-4 w-4" />} 
        />
        )}

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
            <button className="flex items-center bg-green-700 hover:bg-green-800 text-green-50 font-medium py-2 px-4 rounded-lg transition duration-300 border border-green-800">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </Link>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 border border-green-700">
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
