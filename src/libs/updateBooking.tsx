import { BookingItem } from "../../interface";
import { UpdateBookingData } from "../../interface";

export default async function updateBooking(
  id: string,
  data: UpdateBookingData,
  token: string
): Promise<BookingItem> {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const inputDate = new Date(data.apptDate);
    if (inputDate < currentDate) {
      throw new Error("Cannot book a past date");
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          apptDate: new Date(data.apptDate).toISOString()
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to update booking");
    }

    return responseData.data as BookingItem;
  } catch (error) {
    console.error("Booking update error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update booking"
    );
  }
}