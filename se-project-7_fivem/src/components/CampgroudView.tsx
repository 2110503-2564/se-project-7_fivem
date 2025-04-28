"use client";
import { useEffect, useState } from "react";
import getCampgrounds from "@/libs/getCampgrounds";

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
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        setCampgrounds(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch campgrounds");
      } finally {
        setLoading(false);
      }
    };

    fetchCampgrounds();
  }, []);

  if (loading) return <div className="text-green-700">Loading campgrounds...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (campgrounds.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4 text-green-700">
        <p>No campgrounds detected.</p>
        <button
          onClick={() => setView("create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Create New Campground
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-green-200 text-green-900">
        <thead className="bg-green-100 text-green-900 font-semibold">
          <tr>
            <th className="border border-green-200 px-4 py-2">Name</th>
            <th className="border border-green-200 px-4 py-2">Address</th>
            <th className="border border-green-200 px-4 py-2">District</th>
            <th className="border border-green-200 px-4 py-2">Province</th>
            <th className="border border-green-200 px-4 py-2">Postal Code</th>
            <th className="border border-green-200 px-4 py-2">Telephone</th>
            <th className="border border-green-200 px-4 py-2">Region</th>
            <th className="border border-green-200 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {campgrounds.map((campground) => (
            <tr key={campground._id} className="hover:bg-green-50">
              <td className="border border-green-200 px-4 py-2">{campground.name}</td>
              <td className="border border-green-200 px-4 py-2">{campground.address}</td>
              <td className="border border-green-200 px-4 py-2">{campground.district}</td>
              <td className="border border-green-200 px-4 py-2">{campground.province}</td>
              <td className="border border-green-200 px-4 py-2">{campground.postalcode}</td>
              <td className="border border-green-200 px-4 py-2">{campground.tel}</td>
              <td className="border border-green-200 px-4 py-2">{campground.region}</td>
              <td className="border border-green-200 px-4 py-2">{campground.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampgroundView;