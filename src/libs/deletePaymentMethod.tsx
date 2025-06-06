export async function deletePaymentMethod(
  id: string,
  token: string,
): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/paymentmethod/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to delete payment method");
  }
}

