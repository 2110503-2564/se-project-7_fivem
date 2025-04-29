import { BookingUpdateResponse } from "../../interface";

export default async function getBooking(
  id: string,
  token: string,
): Promise<BookingUpdateResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch booking");
  }

  return await response.json();
}

