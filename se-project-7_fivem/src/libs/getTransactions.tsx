// libs/getTransactions.tsx
import { Transaction } from "../../interface";

export const getTransactions = async (
  token: string,
): Promise<Transaction[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transaction`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch transactions");

    return data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
