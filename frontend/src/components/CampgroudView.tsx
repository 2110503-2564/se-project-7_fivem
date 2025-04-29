"use client";
import { useEffect, useState } from "react";
import { Tent, MapPin, Edit, PlusCircle } from "lucide-react";
import getCampgrounds from "@/libs/getCampgrounds";
import getUserProfile from "@/libs/getUserProfile"; // <-- make sure you have this
import { useSession } from "next-auth/react"; // <-- needed
import Link from "next/link";
import Image from "next/image";

interface Campground {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  price: number;
}

interface CampgroundViewProps {
  setView: (view: string) => void;
}

const CampgroundView = ({ setView }: CampgroundViewProps) => {
  const { data: session } = useSession();
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      if (session?.user.token) {
        try {
          const userProfile = await getUserProfile(session.user.token);
          setRole(userProfile.data.role);

          if (userProfile.data.role === "admin") {
            const response = await getCampgrounds();
            setCampgrounds(response.data);
          } else {
            setError("Unauthorized: Admins only");
          }
        } catch (err) {
          console.error(err);
          setError("Failed to load user data");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No session found");
        setLoading(false);
      }
    };

    initialize();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="animate-pulse flex flex-col items-center">
          <Image
            src={"/img/logo.png"}
            alt="Camping adventure"
            width={24}
            height={24}
            className="h-12 w-12 text-green-700 mb-4 animate-bounce"
          />
          <p className="text-green-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="bg-white p-12 rounded-xl shadow-md border-l-8 border-red-600 max-w-xl text-center">
          <Image
            src="/img/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="h-16 w-16 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-red-800 mb-4">Unauthorized</h1>
          <p className="text-lg text-red-700 mb-6">
            You are not authorized to view this page.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }
  

  if (campgrounds.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="text-center p-12 bg-white rounded-lg shadow-md max-w-md">
          <Tent className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <p className="text-xl text-green-800 font-medium mb-2">
            No campgrounds found
          </p>
          <button
            onClick={() => setView("create")}
            className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-green-50 rounded-lg transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Campground
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-700 p-6">
          <h1 className="text-2xl font-bold text-green-100 flex items-center">
            <Tent className="mr-3 h-8 w-8 text-green-200" />
            Campground Directory
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] lg:min-w-0">
            <thead className="bg-green-100">
              <tr className="text-green-900 text-sm font-medium">
                <th className="p-4 text-left min-w-[200px]">
                  <div className="flex items-center">
                    <Tent className="mr-2 h-4 w-4 text-green-700" />
                    Campground
                  </div>
                </th>
                <th className="p-4 text-left min-w-[200px]">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-green-700" />
                    Location
                  </div>
                </th>
                <th className="p-4 text-left min-w-[150px]">Contact</th>
                <th className="p-4 text-left min-w-[150px]">Region</th>
                <th className="p-4 text-left min-w-[100px]">Price</th>
                <th className="p-4 text-left min-w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-200">
              {campgrounds.map((campground) => (
                <tr
                  key={campground._id}
                  className="hover:bg-green-50 transition-colors"
                >
                  <td className="p-4 font-medium text-green-900 min-w-[200px]">
                    {campground.name}
                  </td>
                  <td className="p-4 text-green-700 min-w-[200px]">
                    <div>
                      <div>{campground.address}</div>
                      <div className="text-sm text-green-600">
                        {campground.district}, {campground.province} {campground.postalcode}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-green-700 min-w-[150px]">
                    {campground.tel}
                  </td>
                  <td className="p-4 text-green-800 min-w-[150px]">
                    {campground.region}
                  </td>
                  <td className="p-4 text-green-800 min-w-[100px]">
                    ฿{campground.price.toLocaleString()}
                  </td>
                  <td className="p-4 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/campground/${campground._id}`}
                        className="px-3 py-2 text-sm font-medium text-green-700 hover:text-green-900 hover:bg-green-100 rounded-lg transition-colors flex items-center border border-green-200"
                      >
                        <MapPin className="mr-1 h-4 w-4" />
                        View
                      </Link>
                      <button
                        onClick={() => setView("manage")}
                        className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center border border-blue-200"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampgroundView;
