import getCampground from '@/libs/getCampground';
import { CampgroundResponse } from '../../../../../interface';
import { MapPin, Mountain, Trees, Phone, ArrowLeft, Landmark, Navigation, Mailbox } from 'lucide-react';
import Link from 'next/link';

export default async function CampgroundDetailPage({ params }: { params: { campid: string } }) {
  try {
    const campgroundDetail: CampgroundResponse = await getCampground(params.campid);

    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
        {/* Back Button - Positioned fixed under top menu */}
        <div className="fixed top-16 left-6 z-20">
        <Link 
  href="/campground" 
  className="relative flex items-center text-amber-700 hover:text-amber-900 transition-colors px-4 py-2 mt-4 group"
>
  <ArrowLeft className="mr-2 h-4 w-4" />
  <span className="relative">
    Back to Campgrounds
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
  </span>
</Link>
        </div>

        <div className="max-w-4xl mx-auto p-6 pt-24"> {/* Added pt-24 to account for fixed elements */}
          {/* Campground Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 mb-8">
            {/* Header with wood-themed background */}
            <div className="bg-[#5e3a1e] p-6 relative">
              <div className="absolute top-4 right-4 opacity-20">
                <Trees className="h-12 w-12 text-amber-200" />
              </div>
              <h1 className="text-3xl font-bold text-amber-100 tracking-wide flex items-center">
                <MapPin className="mr-3 h-8 w-8 text-amber-200" />
                {campgroundDetail.data.name}
              </h1>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address - Full width */}
                <div className="col-span-2 bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-lg font-medium text-amber-800 flex items-start">
                    <Navigation className="mr-2 h-5 w-5 mt-0.5 text-amber-600" />
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
      <main className="max-w-4xl mx-auto p-6 bg-amber-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-amber-600 w-full">
          <div className="flex items-center mb-4">
            <Mountain className="h-8 w-8 text-amber-600 mr-3" />
            <h2 className="text-xl font-bold text-amber-800">Error Loading Campground</h2>
          </div>
          <p className="text-amber-700 mb-2">{(error as Error).message}</p>
          <p className="text-sm text-amber-600">Campground ID: {params.campid}</p>
          <Link 
            href="/campground" 
            className="mt-4 inline-flex items-center text-amber-700 hover:text-amber-900 font-medium"
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
    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
      <p className="text-sm font-medium text-amber-600">{label}</p>
      <p className="text-lg text-amber-800 flex items-center mt-1">
        <span className="mr-2 text-amber-600">{icon}</span>
        {value}
      </p>
    </div>
  );
}