"use client";

import { useEffect, useState } from "react";
import getCampgrounds from "@/libs/getCampgrounds";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import { CampgroundJson } from "../../interface";
import { Mountain, MapPin, Compass, RefreshCw, Tent } from "lucide-react";
import { CircularProgress } from "@mui/material";

interface CampgroundCatalogProps {
  campgroundsJson: Promise<CampgroundJson>; // เพิ่ม interface props
}

export default function CampgroundCatalog({
  campgroundsJson,
}: CampgroundCatalogProps) {
  const [data, setData] = useState<CampgroundJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCampgrounds = async () => {
    try {
      setLoading(true);
      const result = await campgroundsJson; // เปลี่ยนจาก getCampgrounds() มาใช้ props
      console.log("Fetched Campgrounds:", result.success);
      setData(result);
      setError(!result.success);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampgrounds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="flex flex-col items-center">
          <CircularProgress size={50} color="success" className="mb-4" />
          <p className="text-green-800">
            Loading your campground adventures...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 max-w-md w-full text-center">
          <div className="animate-bounce">
            <Mountain className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          </div>
          <h3 className="text-2xl font-bold text-stone-800 mb-3">
            Connection Lost
          </h3>
          <p className="text-stone-600 mb-6">
            We couldn't reach the campground database
          </p>
          <button
            onClick={fetchCampgrounds}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { count, data: campgrounds } = data;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-900/70"></div>
        <Image
          src="/img/Campgrounds.jpg"
          alt="Scenic campground background"
          fill
          priority
          quality={80}
          className="object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>

      {/* Hero Header */}
      <header className="relative text-white py-20 px-4 sm:px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Tent className="h-10 w-10 text-amber-300" />
            <h1 className="text-4xl font-bold tracking-tight">
              Wilderness Retreats
            </h1>
            <MapPin className="h-10 w-10 text-amber-300" />
          </div>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {count} pristine locations waiting to be explored
          </p>
          <div className="w-24 h-1 bg-amber-300 mx-auto rounded-full"></div>
        </div>
      </header>

      {/* Campground Grid */}
      <main className="relative py-12 px-4 sm:px-8 max-w-[1800px] mx-auto">
        {count > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {campgrounds.map((campground) => (
              <Link
                href={`/campground/${campground._id}`}
                key={campground._id}
                className="group block transform transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <Card
                  campgroundName={campground.name}
                  tel={campground.tel}
                  address={campground.address}
                  className="bg-white/95 backdrop-blur-sm border border-white/30 group-hover:border-amber-300 transition-all rounded-xl overflow-hidden shadow-lg hover:shadow-xl h-full"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 max-w-2xl mx-auto">
            <div className="animate-pulse">
              <Compass className="h-16 w-16 text-amber-500 mx-auto mb-6" />
            </div>
            <h3 className="text-2xl font-semibold text-stone-800 mb-3">
              No Campsites Found
            </h3>
            <p className="text-stone-600 mb-6">
              The wilderness is empty... for now
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto my-6"></div>
            <p className="text-stone-500">
              Check back later for new adventures
            </p>
          </div>
        )}
      </main>

      {/* Bottom Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
