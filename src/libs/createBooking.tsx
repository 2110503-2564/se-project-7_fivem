export default async function createBooking(
  apptDate: Date,
  campgroundId: string,
  user: string,
  token: string
) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if (apptDate < currentDate) {
    throw new Error("Cannot book a past date");
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/campgrounds/${campgroundId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        apptDate: apptDate.toISOString(),
        user
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create booking");
  }

  return await response.json();
}