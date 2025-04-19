"use client";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { removeBooking, setBookings } from "@/redux/features/bookSlice";
import getBookings from "@/libs/getBookings";
import { useSession } from "next-auth/react";
import Link from "next/link";
import deleteBooking from "@/libs/deleteBooking";
import getUserProfile from "@/libs/getUserProfile";
import { Tent, Calendar, MapPin, Trash2, Edit, User } from "lucide-react";

export default function BookingList() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.token) {
        try {
          const userProfile = await getUserProfile(session.user.token);
          setRole(userProfile.data.role);
          setUserId(userProfile.data._id);
        } catch (error) {
          console.error("Failed to load user profile:", error);
          setError("Failed to load user profile");
        }
      }
    };

    const fetchBookings = async () => {
      if (session?.user?.token) {
        try {
          setLoading(true);
          setError("");
          const bookings = await getBookings(session.user.token);
          dispatch(setBookings(bookings.data));
        } catch (error) {
          console.error("Failed to load bookings:", error);
          setError("Failed to load bookings");
        } finally {
          setLoading(false);
        }
      }
    };

    if (session?.user?.token) {
      fetchUserProfile();
      fetchBookings();
    } else {
      setError("No session found");
    }
  }, [session, dispatch]);

  const handleDelete = async (bookingId: string) => {
    if (!session?.user?.token) return;

    try {
      await deleteBooking(bookingId, session.user.token);
      dispatch(removeBooking(bookingId));
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete booking");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="animate-pulse flex flex-col items-center">
          <Tent className="h-12 w-12 text-green-700 mb-4 animate-bounce" />
          <p className="text-green-800">Loading your camping adventures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-600 max-w-md text-center">
          <Tent className="h-10 w-10 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Oops!</h3>
          <p className="text-green-700 mb-4">{error}</p>
          <Link href="/campground" className="text-green-600 hover:text-green-800 font-medium">
            Back to campgrounds
          </Link>
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
            {role === 'admin' ? 'All Camping Reservations' : 'Your Camping Reservations'}
          </h1>
        </div>

        {bookItems.length === 0 ? (
          <div className="text-center p-12 bg-green-50">
            <Tent className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-xl text-green-800 font-medium mb-2">No bookings found</p>
            <Link
              href="/campground"
              className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-green-50 rounded-lg transition-colors"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Explore Campgrounds
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] lg:min-w-0">
              <thead className="bg-green-100">
                <tr className="text-green-900 text-sm font-medium">
                  {role === 'admin' && (
                    <th className="p-4 text-left w-[200px]">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-green-700" />
                        User ID
                      </div>
                    </th>
                  )}
                  <th className="p-4 text-left min-w-[200px]">
                    <div className="flex items-center">
                      <Tent className="mr-2 h-4 w-4 text-green-700" />
                      Campground
                    </div>
                  </th>
                  <th className="p-4 text-left min-w-[150px]">Contact</th>
                  <th className="p-4 text-left min-w-[150px]">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-green-700" />
                      Booking Date
                    </div>
                  </th>
                  <th className="p-4 text-left min-w-[150px]">Created At</th>
                  <th className="p-4 text-left min-w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-200">
                {bookItems.map((booking) => (
                  <tr key={booking._id} className="hover:bg-green-50 transition-colors">
                    {role === 'admin' && (
                      <td className="p-4 text-green-800 font-mono text-sm truncate max-w-[200px]">
                        {booking.user || "N/A"}
                      </td>
                    )}
                    <td className="p-4 font-medium text-green-900 min-w-[200px]">
                      {booking.campground.name}
                    </td>
                    <td className="p-4 text-green-700 min-w-[150px]">
                      {booking.campground.tel}
                    </td>
                    <td className="p-4 text-green-800 min-w-[150px]">
                      {new Date(booking.apptDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-green-800 min-w-[150px]">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/mybooking/${booking._id}/edit`}
                          className="px-3 py-2 text-sm font-medium text-green-700 hover:text-green-900 hover:bg-green-100 rounded-lg transition-colors flex items-center border border-green-200"
                        >
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors flex items-center border border-red-200"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
