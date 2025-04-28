// libs/getTransaction.tsx
import { Transaction } from "../../interface"; // Assuming you have a Transaction type defined

export const getTransaction = async (id: string, token: string): Promise<Transaction | null> => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/transaction/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // assuming JWT auth
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch transaction");

    return data.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
};