import Card from '@/components/Card';
import Link from 'next/link';
import { CampgroundJson } from "../../interface";
import { Trees, Mountain, MapPin, Compass } from 'lucide-react';

export default async function CampgroundCatalog({ campgroundsJson }: { campgroundsJson: Promise<CampgroundJson> }) {
    const { success, count, data } = await campgroundsJson;

    if (!success) return (
        <div className='py-12 px-6 bg-amber-50 min-h-screen flex flex-col items-center justify-center'>
            <div className='bg-white p-8 rounded-xl shadow-lg border border-amber-200 max-w-md text-center'>
                <Mountain className='h-12 w-12 text-amber-600 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-amber-800 mb-2'>Failed to load campgrounds</h3>
                <p className='text-amber-600'>Please try refreshing the page or come back later</p>
            </div>
        </div>
    );

    return (
        <div className='py-12 px-6 bg-gradient-to-br from-amber-50 to-green-50 min-h-screen'>
            <div className='max-w-4xl mx-auto text-center mb-12'>
                <div className='flex justify-center items-center gap-3 mb-4'>
                    <Trees className='h-8 w-8 text-amber-700' />
                    <h2 className='text-3xl font-bold text-amber-900'>
                        Discover Campgrounds
                    </h2>
                    <MapPin className='h-8 w-8 text-amber-700' />
                </div>
                <p className='text-lg text-amber-800 mb-6'>
                    Explore {count} beautiful locations in nature's embrace
                </p>
                <div className='w-24 h-1 bg-amber-600 mx-auto rounded-full'></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {data.map((campground) => (
                    <Link 
                        href={`/campground/${campground._id}`}
                        key={campground._id}
                        className='hover:scale-105 transition-transform duration-300 ease-out hover:shadow-lg'
                    >
                        <Card
                            campgroundName={campground.name}
                            tel={campground.tel}
                            address={campground.address}
                        // Assuming your Card component accepts an image prop
                        />
                    </Link>
                ))}
            </div>

            {count === 0 && (
                <div className='text-center py-12'>
                    <Compass className='h-12 w-12 text-amber-600 mx-auto mb-4' />
                    <h3 className='text-xl font-medium text-amber-800'>No campgrounds found</h3>
                    <p className='text-amber-600 mt-2'>Check back later for new locations</p>
                </div>
            )}
        </div>
    );
}