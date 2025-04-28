import { PaymentMethod } from "../../interface";

export async function updatePaymentMethod(
  id: string,
  updates: Partial<PaymentMethod>,
  token: string
): Promise<PaymentMethod> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/paymentmethod/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update payment method");
  }

  const json = await res.json();
  return json.data;
}
