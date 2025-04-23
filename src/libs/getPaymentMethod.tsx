import { PaymentMethod } from "../../interface";

export async function getPaymentMethod(id: string, token: string): Promise<PaymentMethod> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/payment-methods/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch the payment method");
  }

  const json = await res.json();
  return json.data;
}
