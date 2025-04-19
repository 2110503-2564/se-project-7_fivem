"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { CampgroundItem } from "../../../interface";
import getCampgrounds from "@/libs/getCampgrounds";
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tent, Calendar, MapPin } from "lucide-react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [campgroundId, setCampgroundId] = useState<string>("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        if (response.success) {
          setCampgrounds(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch campgrounds:", error);
        setError("Failed to load campgrounds");
      } finally {
        setLoading(false);
      }
    };
    
    if (status === "authenticated") {
      fetchCampgrounds();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-amber-50">
        <CircularProgress className="text-amber-700" />
      </div>
    );
  }

  const handleBooking = async () => {
    if (!session || !session.user.token) {
      setError("Please login to make a booking");
      return;
    }

    if (!campgroundId || !bookDate) {
      setError("Please select a campground and date");
      return;
    }

    if (bookDate.isBefore(dayjs().startOf('day'))) {
      setError("Cannot book a past date");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      
      await createBooking(
        dayjs(bookDate).toDate(),
        campgroundId,
        session.user._id,
        session.user.token
      );

      router.push("/mybooking");
      alert("Booking created successfully!");
      
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-amber-50 p-4"
      style={{
        backgroundImage: "url('/img/camp-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full max-w-md border border-amber-200">
        <div className="flex flex-col items-center mb-6">
          <Tent className="h-10 w-10 text-amber-700 mb-2" />
          <h1 className="text-2xl font-bold text-center text-amber-900">
            Reserve Your Campsite
          </h1>
          <p className="text-sm text-amber-600 mt-1">Sleep under the stars</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <CircularProgress className="text-amber-700" />
            <p className="mt-3 text-amber-700">Loading campgrounds...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex items-center mb-2 text-sm text-amber-700">
                <MapPin className="mr-2 h-4 w-4" />
                Select Campground
              </div>
              <Select
                variant="outlined"
                fullWidth
                value={campgroundId}
                onChange={(e) => setCampgroundId(e.target.value)}
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
              >
                <MenuItem value="" disabled>
                  Choose your campsite
                </MenuItem>
                {campgrounds.map((cg) => (
                  <MenuItem key={cg._id} value={cg._id}>
                    {cg.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2 text-sm text-amber-700">
                <Calendar className="mr-2 h-4 w-4" />
                Select Dates
              </div>
              <DateReserve
                onDateChange={(value: Dayjs) => setBookDate(value)}
              />
            </div>

            <Button
              variant="contained"
              fullWidth
              className="bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700 text-brown-400 font-medium py-3 rounded-lg shadow-md transition-all duration-300"
              onClick={handleBooking}
              disabled={submitting || !campgroundId || !bookDate}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                '&:disabled': {
                  background: '#d1d5db',
                  color: '#6b7280'
                }
              }}
            >
              {submitting ? (
                <CircularProgress size={24} className="text-brown-400" />
              ) : (
                "Book Now"
              )}
            </Button>
          </>
        )}
      </div>
    </main>
  );
}