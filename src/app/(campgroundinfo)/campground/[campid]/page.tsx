import getCampground from '@/libs/getCampground';
import { CampgroundResponse } from '../../../../../interface';
import { MapPin, Mountain, Trees, Phone, ArrowLeft, Landmark, Navigation, Mailbox } from 'lucide-react';
import Link from 'next/link';

export default async function CampgroundDetailPage({ params }: { params: { campid: string } }) {
  try {
    const campgroundDetail: CampgroundResponse = await getCampground(params.campid);

    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
        {/* Back Button */}
        <div className="fixed top-16 left-6 z-20">
          <Link
            href="/campground"
            className="relative flex items-center text-green-700 hover:text-green-900 transition-colors px-4 py-2 mt-4 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="relative font-medium">
              Back to Campgrounds
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto p-6 pt-24">
          {/* Campground Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200 mb-8 transition-shadow hover:shadow-2xl">
            {/* Header */}
            <div className="bg-green-900 p-6 relative">
              <div className="absolute top-4 right-4 opacity-20">
                <Trees className="h-12 w-12 text-green-300" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-wide flex items-center drop-shadow-md">
                <MapPin className="mr-3 h-8 w-8 text-green-300" />
                {campgroundDetail.data.name}
              </h1>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="col-span-2 bg-green-100 p-4 rounded-lg border border-green-200 shadow-inner">
                  <p className="text-lg font-semibold text-green-900 flex items-start">
                    <Navigation className="mr-2 h-5 w-5 mt-0.5 text-green-700" />
                    <span>{campgroundDetail.data.address}</span>
                  </p>
                </div>

                {/* Location Details */}
                <div className="space-y-4">
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
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <DetailItem 
                    icon={<Mailbox className="h-5 w-5" />}
                    label="Postal Code"
                    value={campgroundDetail.data.postalcode}
                  />
                  <DetailItem 
                    icon={<Phone className="h-5 w-5" />}
                    label="Phone"
                    value={campgroundDetail.data.tel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-4xl mx-auto p-6 bg-green-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-600 w-full">
          <div className="flex items-center mb-4">
            <Mountain className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">Error Loading Campground</h2>
          </div>
          <p className="text-green-700 mb-2">{(error as Error).message}</p>
          <p className="text-sm text-green-600">Campground ID: {params.campid}</p>
          <Link 
            href="/campground" 
            className="mt-4 inline-flex items-center text-green-700 hover:text-green-900 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
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
    <div className="p-4 rounded-lg bg-green-100 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-semibold text-green-700">{label}</p>
      <p className="text-lg text-green-900 flex items-center mt-1">
        <span className="mr-2 text-green-700">{icon}</span>
        {value}
      </p>
    </div>
  );
}
