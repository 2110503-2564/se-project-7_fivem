"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import updateBooking from "@/libs/updateBooking";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import getCampgrounds from "@/libs/getCampgrounds";
import { CampgroundItem } from "../../../../../interface";
import { UpdateBookingData } from "../../../../../interface";
import { Tent, Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditBookingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const bookingid = params.bookingid as string;
  const [date, setDate] = useState<Dayjs | null>(null);
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [selectedCampground, setSelectedCampground] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campgroundsResponse] = await Promise.all([getCampgrounds()]);
        setCampgrounds(campgroundsResponse.data);
        setInitialLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load required data");
        setInitialLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingid || !session?.user.token || !date || !selectedCampground) {
      setError("Please fill all required fields");
      return;
    }

    if (date.isBefore(dayjs().startOf('day'))) {
      setError("Cannot book a past date");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      await updateBooking(
        bookingid,
        { 
          apptDate: date.toISOString(),
          campground: selectedCampground
        },
        session.user.token
      );

      router.push("/mybooking");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err instanceof Error ? err.message : "Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <CircularProgress className="text-amber-700" />
          <p className="mt-4 text-amber-800">Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-amber-200">
        <Link href="/mybooking" className="flex items-center text-amber-700 hover:text-amber-900 mb-4">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to bookings
        </Link>

        <div className="flex items-center justify-center mb-6">
          <Tent className="h-8 w-8 text-amber-700 mr-3" />
          <h1 className="text-2xl font-bold text-amber-900">
            Edit Reservation
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Campground
            </label>
            <Select
              fullWidth
              value={selectedCampground}
              onChange={(e) => setSelectedCampground(e.target.value)}
              className="bg-amber-50"
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d97706',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b45309',
                }
              }}
              renderValue={(value) => {
                if (!value) return <span className="text-amber-500">Select Campground</span>;
                const campground = campgrounds.find((cg) => cg._id === value);
                return <span className="text-amber-900">{campground ? campground.name : "Not Found"}</span>;
              }}
            >
              <MenuItem value="" disabled>
                <span className="text-amber-500">Choose your campsite</span>
              </MenuItem>
              {campgrounds.map((cg) => (
                <MenuItem key={cg._id} value={cg._id}>
                  {cg.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Booking Date
            </label>
            <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B5A2B] hover:bg-[#A67C52] text-amber-100 py-3 px-4 rounded-lg shadow-md transition-colors disabled:bg-amber-300 disabled:text-amber-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <CircularProgress size={20} className="text-amber-100 mr-2" />
                Updating...
              </>
            ) : (
              "Update Reservation"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}