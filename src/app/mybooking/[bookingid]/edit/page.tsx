"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import updateBooking from "@/libs/updateBooking";
import getCampgrounds from "@/libs/getCampgrounds";
import getBooking from "@/libs/getBooking";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import { CampgroundItem, BookingItem } from "../../../../../interface";
import { Tent, Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditBookingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const bookingid = params.bookingid as string;
  const [date, setDate] = useState<Dayjs | null>(null);
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [currentBooking, setCurrentBooking] = useState<BookingItem | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user.token) return;

      try {
        const [campgroundsResponse, bookingResponse] = await Promise.all([
          getCampgrounds(),
          getBooking(bookingid, session.user.token),
        ]);

        setCampgrounds(campgroundsResponse.data);
        setCurrentBooking(bookingResponse.data);

        // Set initial values from current booking
        if (bookingResponse.data) {
          setDate(dayjs(bookingResponse.data.apptDate));
        }

        setInitialLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load required data");
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [bookingid, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingid || !session?.user.token || !date || !currentBooking) {
      setError("Please fill all required fields");
      return;
    }

    if (date.isBefore(dayjs().startOf("day"))) {
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
          campground: currentBooking.campground._id,
        },
        session.user.token,
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
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <CircularProgress className="text-green-700" />
          <p className="mt-4 text-green-800">Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-green-200">
        <Link
          href="/mybooking"
          className="flex items-center text-green-700 hover:text-green-900 mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to bookings
        </Link>

        <div className="flex items-center justify-center mb-6">
          <Tent className="h-8 w-8 text-green-700 mr-3" />
          <h1 className="text-2xl font-bold text-green-900">
            Edit Reservation
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Date */}
          <div>
            <label className="text-sm font-medium text-green-700 mb-2 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Booking Date
            </label>
            <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-4 rounded-lg shadow-md transition-colors disabled:bg-green-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <CircularProgress size={20} className="text-white mr-2" />
                Updating...
              </>
            ) : (
              "Update Reservation"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
