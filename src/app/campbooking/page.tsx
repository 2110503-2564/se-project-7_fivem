"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { CampgroundItem } from "../../../interface";
import getCampgrounds from "@/libs/getCampgrounds";
import { getPaymentMethods } from "@/libs/getPaymentMethods";
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Coins } from "lucide-react";
import { PaymentMethod } from "../../../interface";
import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [campgroundId, setCampgroundId] = useState<string>("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedCampground, setSelectedCampground] = useState<CampgroundItem | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentMethodId, setPaymentMethodId] = useState<string>("");

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

    const fetchPaymentMethods = async () => {
      try {
        const response = await getPaymentMethods(session?.user.token);
        setPaymentMethods(response);
      } catch (err) {
        setError("Failed to fetch payment methods");
      }
    };

    if (status === "authenticated") {
      fetchCampgrounds();
      fetchPaymentMethods();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-green-50">
        <CircularProgress className="text-green-700" />
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

    if (bookDate.isBefore(dayjs().startOf("day"))) {
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
        session.user.token,
        paymentMethodId
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

  const handleCampgroundChange = (e: any) => {
    const selectedId = e.target.value;
    setCampgroundId(selectedId);

    const selectedCg = campgrounds.find((cg) => cg._id === selectedId);
    setSelectedCampground(selectedCg ?? null);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-green-50 bg-cover bg-center bg-fixed p-4"
      style={{ backgroundImage: "url('/img/camp-bg.jpg')" }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full max-w-md border border-green-200">
        <div className="flex flex-col items-center mb-6">
          <Image
            src='/img/logo.png'
            alt="logo"
            width={24}
            height={24}
            className="h-10 w-10 mb-2" />
          <h1 className="text-2xl font-bold text-center text-green-900">
            Reserve Your Campsite
          </h1>
          <p className="text-sm text-green-600 mt-1">Sleep under the stars</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <CircularProgress className="text-green-700" />
            <p className="mt-3 text-green-700">Loading campgrounds...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex items-center mb-2 text-sm text-green-700">
                <MapPin className="mr-2 h-4 w-4" />
                Select Campground
              </div>
              <Select
                variant="outlined"
                fullWidth
                value={campgroundId}
                onChange={handleCampgroundChange}
                className="bg-green-50 text-green-900 border border-green-300 rounded-md"
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

            <div>
              <div className="flex items-center text-sm text-green-700">
                <Calendar className="mr-2 h-4 w-4" />
                Select Dates
              </div>
              <DateReserve
                onDateChange={(value: Dayjs) => setBookDate(value)}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2 text-sm text-green-700">
                <Coins className="mr-2 h-4 w-4" />
                Choose your Payment Method
              </div>
              <Select
                variant="outlined"
                fullWidth
                  value={paymentMethodId}
                  onChange={(e) => setPaymentMethodId(e.target.value)}
                  className="bg-green-50 text-green-900 border border-green-300 rounded-md"
                >
                  <MenuItem value="" disabled>
                    Choose your payment method
                  </MenuItem>
                  {paymentMethods.map((pm) => (
                    <MenuItem key={pm._id} value={pm._id}>
                      {pm.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

            <div className="mb-6">
              <div className="flex items-center mb-2 text-sm text-green-700">
                <Coins className="mr-2 h-4 w-4" />
                Price
              </div>
              <input
                type="text"
                readOnly
                className="w-full border border-green-300 bg-green-50 p-3 text-green-900 shadow-sm focus:outline-none"
                value={
                  selectedCampground?.price
                    ? `${selectedCampground.price.toLocaleString()} บาท`
                    : "0 บาท"
                }
              />
            </div>


            <button
              onClick={handleBooking}
              disabled={submitting || !campgroundId || !bookDate}
              className={`w-full py-3 rounded-lg shadow-md font-medium text-white transition-all duration-300 ${submitting || !campgroundId || !bookDate
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                }`}
            >
              {submitting ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Book Now"
              )}
            </button>
          </>
        )}
      </div>
    </main>
  );
}