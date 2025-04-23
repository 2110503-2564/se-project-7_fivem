import { PaymentMethod } from "../../interface";

export async function getPaymentMethods(token: string): Promise<PaymentMethod[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/payment-methods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payment methods");
  }

  const json = await res.json();
  return json.data;
}
