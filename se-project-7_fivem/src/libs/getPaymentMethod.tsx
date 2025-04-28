import { PaymentMethod } from "../../interface";

export async function getPaymentMethod(
  id: string,
  token: string,
): Promise<PaymentMethod> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/paymentmethod/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch the payment method");
  }

  const json = await res.json();
  return json.data;
}
