import { PaymentMethod } from "../../interface";

export async function addPaymentMethod(
  methodData: Partial<PaymentMethod>,
  token: string
): Promise<PaymentMethod> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/paymentmethod`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(methodData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to add payment method");
  }

  const json = await res.json();
  return json.data;
}
