"use client"; // Add this since we're using useState and useEffect
import { useState, useEffect } from 'react';
import Banner from '@/components/Banner';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching if needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen bg-green-50">
                <div className="animate-pulse flex flex-col items-center">
                  <Image
                    src={"/img/logo.png"}
                    alt='Camping adventure'
                    width={24}
                    height={24}
                    className="h-12 w-12 text-green-700 mb-4 animate-bounce" />
                  <p className="text-green-800">Loading your campground adventures...</p>
                </div>
              </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Banner />
      </div>
    </main>
  );
}