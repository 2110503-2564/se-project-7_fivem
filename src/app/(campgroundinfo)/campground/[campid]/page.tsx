import getCampground from '@/libs/getCampground';
import { CampgroundResponse } from '../../../../../interface';
import { MapPin, Mountain, Trees, Phone, ArrowLeft, Landmark, Navigation, Mailbox, Tent, Globe, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function CampgroundDetailPage({ params }: { params: { campid: string } }) {
  try {
    const campgroundDetail: CampgroundResponse = await getCampground(params.campid);

    return (
      <main className="min-h-screen relative overflow-hidden">
        {/* Background Image with Blur */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/img/Campgrounds.jpg"
            alt="Campground background"
            fill
            className="object-cover blur-sm opacity-20"
            priority
          />
        </div>

        {/* Back Button */}
        <div className="fixed top-16 left-6 z-20">
          <Link
            href="/campground"
            className="relative flex items-center text-green-700 hover:text-green-900 transition-colors px-4 py-2 mt-4 group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="relative font-medium">
              Back to Campgrounds
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto p-6 pt-24 relative z-10">
          {/* Campground Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-green-200/70 mb-8 transition-all hover:shadow-3xl">
            {/* Header with gradient */}
            <div className="relative bg-gradient-to-r from-green-800 to-green-700 p-8">
              <div className="absolute top-0 right-0 opacity-10">
                <Trees className="h-32 w-32 text-green-300" />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10">
                <div>
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-3 h-7 w-7 text-green-300" />
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                      {campgroundDetail.data.name}
                    </h1>
                  </div>
                  <div className="flex items-center text-green-200">
                    <Navigation className="mr-2 h-5 w-5" />
                    <p className="text-lg">{campgroundDetail.data.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Location Details */}
                <div className="space-y-4 lg:col-span-2">
                  <h2 className="text-xl font-bold text-green-900 flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-green-700" />
                    Location Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem 
                      icon={<Landmark className="h-5 w-5" />}
                      label="District"
                      value={campgroundDetail.data.district}
                    />
                    <DetailItem 
                      icon={<Mountain className="h-5 w-5" />}
                      label="Province"
                      value={campgroundDetail.data.province}
                    />
                    <DetailItem 
                      icon={<Trees className="h-5 w-5" />}
                      label="Region"
                      value={campgroundDetail.data.region}
                    />
                    <DetailItem 
                      icon={<Mailbox className="h-5 w-5" />}
                      label="Postal Code"
                      value={campgroundDetail.data.postalcode}
                    />
                  </div>
                </div>

                {/* Contact & Info */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-green-900 flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-green-700" />
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <DetailItem 
                      icon={<Phone className="h-5 w-5" />}
                      label="Phone Number"
                      value={
                        <a href={`tel:${campgroundDetail.data.tel}`} className="hover:text-green-700 transition-colors">
                          {campgroundDetail.data.tel}
                        </a>
                      }
                    />
                    <DetailItem 
                      icon={<Tent className="h-5 w-5" />}
                      label="Availability"
                      value="12 sites available"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href={`/campbooking?id=${params.campid}`}
                  className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-all flex items-center shadow-md hover:shadow-lg"
                >
                  <Tent className="mr-2 h-5 w-5" />
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600 w-full max-w-md">
          <div className="flex items-center mb-4">
            <Mountain className="h-10 w-10 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">Error Loading Campground</h2>
          </div>
          <p className="text-green-700 mb-4">{(error as Error).message}</p>
          <p className="text-sm text-green-600 mb-6">Campground ID: {params.campid}</p>
          <Link 
            href="/campground" 
            className="mt-4 inline-flex items-center text-green-700 hover:text-green-900 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Campgrounds
          </Link>
        </div>
      </main>
    );
  }
}

function DetailItem({ icon, label, value }: { 
  icon: React.ReactNode, 
  label: string, 
  value: React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-green-50/90 border border-green-200/70 hover:border-green-300 transition-all group">
      <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">{label}</p>
      <p className="text-lg font-medium text-green-900 flex items-center">
        <span className="mr-3 text-green-700 group-hover:text-green-600 transition-colors">{icon}</span>
        {value}
      </p>
    </div>
  );
}