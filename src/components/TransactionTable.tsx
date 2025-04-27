"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/libs/getTransactions";
import downloadTransaction from "@/libs/downloadTransaction";
import { Transaction } from "../../interface";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

function TransactionTable() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownloadCSV = async () => {
    if (!session?.user.token) return;
    
    try {
      setIsDownloading(true);
      const csvData = await downloadTransaction(session.user.token);
      
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions-${dayjs().format('YYYY-MM-DD')}.csv`);
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download CSV:", err);
      alert("Failed to download transactions CSV");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
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
        <tbody className="text-black">
          {transactions.map((tx) => {
            const bookingDate =
              typeof tx.booking !== "string"
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
                <td className="py-3 px-4">
                  ฿{tx.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  {bookingDate
                    ? dayjs(bookingDate).format("MM/DD/YYYY")
                    : "No Date Available"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      tx.status === "success"
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
      <div className="flex justify-center my-6">
        <button
          onClick={handleDownloadCSV}
          disabled={isDownloading}
          className={`${
            isDownloading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold py-2 px-4 rounded flex items-center`}
        >
          {isDownloading ? "Downloading..." : "Download CSV"}
        </button>
      </div>
    </div>
  );
}

export default TransactionTable;