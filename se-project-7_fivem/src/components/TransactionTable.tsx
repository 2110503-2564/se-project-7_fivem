"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/libs/getTransactions";
import { Transaction } from "../../interface";
import { useSession } from "next-auth/react";
import dayjs from "dayjs"; // ใช้ dayjs สำหรับการแปลงวันที่

function TransactionTable() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user.token) return;
      try {
        const data = await getTransactions(session.user.token);
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user.token]);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="animate-pulse">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          โหลดใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Campground</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Booking Date</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const bookingDate =
              tx.booking && typeof tx.booking !== "string"
                ? tx.booking.apptDate
                : null;

            return (
              <tr key={tx._id} className="border-t hover:bg-green-50">
                <td className="py-3 px-4">
                  {typeof tx.user === "string"
                    ? tx.user
                    : (tx.user as any)?.name || "Unknown"}
                </td>
                <td className="py-3 px-4">
                  {typeof tx.campground === "string"
                    ? tx.campground
                    : (tx.campground as any)?.name || "Unknown"}
                </td>
                <td className="py-3 px-4">฿{tx.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  {/* แสดง apptDate ถ้ามี */}
                  {bookingDate
                    ? dayjs(bookingDate).format("MM/DD/YYYY")
                    : "No Date Available"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      tx.status === "paid"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
