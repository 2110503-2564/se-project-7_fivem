'use client';
import { useState } from 'react';
import styles from './banner.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Mountain, Trees, Compass, Tent } from 'lucide-react';

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className={`${styles.Banner} relative w-screen h-screen`}>
      <Image
        src={"/img/cover4.jpeg"}
        alt='Camping adventure'
        fill={true}
        priority
        className='object-cover brightness-75'
        quality={100}
        sizes="100vw"
      />
      
      {/* Nature icon decorations */}
      <div className="absolute top-8 left-8 opacity-40">
        <Trees className="h-16 w-16 text-amber-100" />
      </div>
      <div className="absolute top-12 right-12 opacity-40">
        <Mountain className="h-20 w-20 text-amber-100" />
      </div>
      
      <div className={styles.BannerText}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Tent className="h-10 w-10 text-amber-200" />
          <h1 className='text-5xl font-bold text-amber-50 drop-shadow-lg font-serif'>
            Your Wilderness Escape
          </h1>
        </div>
        <h3 className='text-xl text-amber-100 max-w-2xl text-center drop-shadow-md leading-relaxed'>
          Discover hidden gems among our curated campgrounds. Sleep under the stars, wake to birdsong, and create memories that last a lifetime.
        </h3>
      </div>
      
      <button
  className='z-30 mt-8 bg-amber-600 hover:bg-amber-700 text-amber-50 font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-amber-800'
  onClick={(e) => {
    router.push('/campground');
    e.stopPropagation();
  }}
>
  <Compass className="h-5 w-5" />
  Explore Campgrounds
</button>
    </div>
  );
}