"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/libs/getTransactions";
import downloadTransaction from "@/libs/downloadTransaction";
import { Transaction } from "../../interface";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import autoTable from "jspdf-autotable";

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

  
  const handleDownloadPDF = async () => {
    if (!session?.user.token) return;
  
    try {
      setIsDownloading(true);
      const csvData = await downloadTransaction(session.user.token);
      const parsed = Papa.parse(csvData, { header: true });
      const transactions = parsed.data as Record<string, any>[];
  
      if (!transactions.length) {
        alert("No transactions to export");
        return;
      }
  
      const doc = new jsPDF({
        orientation: transactions[0] && Object.keys(transactions[0]).length > 6 ? 'landscape' : 'portrait',
        unit: 'pt',
        format: 'a4',
      });
  
      doc.setFillColor(22, 160, 133);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
  
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('TRANSACTIONS REPORT', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on ${dayjs().format('MMMM D, YYYY h:mm A')}`, doc.internal.pageSize.getWidth() / 2, 32, { align: 'center' });
  
      const formattedData = transactions.map(tx => {
        const booking = typeof tx.booking === 'string' ? safeParseJSON(tx.booking) : tx.booking;
        const campground = typeof tx.campground === 'string' ? safeParseJSON(tx.campground) : tx.campground;
        const paymentMethod = typeof tx.paymentMethod === 'string' ? safeParseJSON(tx.paymentMethod) : tx.paymentMethod;
  
        const formattedAmount = Number(tx.amount).toLocaleString('en-US');
  
        return {
          'ID': tx._id?.slice(-6) || 'N/A',
          'User': tx.user?.slice(-6) || 'N/A',
          'Campground': campground?.name || 'N/A',
          'Date': booking?.apptDate ? dayjs(booking.apptDate).format('MMM D, YYYY') : 'N/A',
          'Time': booking?.apptDate ? dayjs(booking.apptDate).format('h:mm A') : 'N/A',
          'Amount': formattedAmount, 
          'Status': tx.status || 'N/A',
          'Payment': paymentMethod?.method 
            ? `${paymentMethod.method} (${paymentMethod.name?.slice(0, 4)}****)` 
            : 'N/A',
          'Transaction Date': tx.transactionDate ? dayjs(tx.transactionDate).format('MMM D, YYYY') : 'N/A',
        };
      });
  
      const headers = Object.keys(formattedData[0]);
      const body = formattedData.map(tx => headers.map(header => tx[header]));
  
      const pageWidth = doc.internal.pageSize.getWidth();
      
      const columnWidths = {
        0: 40, // ID
        1: 40, // User
        2: 80, // Campground
        3: 60, // Date
        4: 50, // Time
        5: 60, // Amount
        6: 50, // Status
        7: 90, // Payment
        8: 60, // Transaction Date
      };
      
      const totalWidth = Object.values(columnWidths).reduce((sum, width) => sum + width, 0);
      const leftMargin = Math.max(40, (pageWidth - totalWidth) / 2);
      
      autoTable(doc, {
        startY: 50,
        head: [headers],
        body: body,
        theme: 'striped',
        styles: { 
          lineWidth: 1,
          lineColor: [100, 100, 100],
          fontSize: 8,
          cellPadding: 4,
          overflow: 'linebreak',
          minCellHeight: 8,
          halign: 'center',
          valign: 'middle'
        },
        headStyles: { 
          fillColor: [44, 62, 80],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: columnWidths[0] }, // ID
          1: { cellWidth: columnWidths[1] }, // User
          2: { cellWidth: columnWidths[2] }, // Campground
          3: { cellWidth: columnWidths[3] }, // Date
          4: { cellWidth: columnWidths[4] }, // Time
          5: { cellWidth: columnWidths[5], halign: 'right' }, // Amount
          6: { cellWidth: columnWidths[6] }, // Status
          7: { cellWidth: columnWidths[7] }, // Payment
          8: { cellWidth: columnWidths[8] }, // Transaction Date
        },
        margin: { left: leftMargin },
        didDrawPage: (data) => {
          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text(
            `Page ${data.pageNumber}`,
            doc.internal.pageSize.getWidth() - 40,
            doc.internal.pageSize.getHeight() - 10
          );
        }
      });
  
      const totalAmount = transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
      const lastY = (doc as any).lastAutoTable.finalY || 50;
  
      doc.setFontSize(10);
      doc.setTextColor(44, 62, 80);
      doc.setFont('helvetica', 'bold');
      doc.text('Summary', leftMargin, lastY + 20);
  
      doc.setDrawColor(22, 160, 133);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, lastY + 22, leftMargin + 80, lastY + 22);
  
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`• Total Transactions: ${transactions.length}`, leftMargin, lastY + 35);
      doc.text('• Total Amount:', leftMargin, lastY + 45);
      
      const formattedTotalAmount = totalAmount.toLocaleString('en-US');
      doc.text(`${formattedTotalAmount} THB`, leftMargin + 65, lastY + 45, { align: 'left' });
  
      const statusCounts = transactions.reduce((acc, tx) => {
        const status = tx.status || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
  
      let statusY = lastY + 55;
      for (const [status, count] of Object.entries(statusCounts)) {
        const percent = Math.round((count / transactions.length) * 100);
        doc.text(`• ${status}: ${count} (${percent}%)`, leftMargin, statusY);
        statusY += 10;
      }
  
      doc.save(`transactions-report-${dayjs().format('YYYY-MM-DD-HHmm')}.pdf`);
  
    } catch (err) {
      console.error("Failed to download PDF:", err);
      alert("Failed to download transactions PDF");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const safeParseJSON = (value: any) => {
    if (typeof value !== 'string') return value;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

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
        <tbody className="text-black">
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
      <div className="flex justify-center my-6 space-x-4">
  <button
    onClick={handleDownloadCSV}
    disabled={isDownloading}
    className={`${
      isDownloading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
    } text-white font-semibold py-2 px-4 rounded flex items-center`}
  >
    {isDownloading ? "Downloading..." : "Download CSV"}
  </button>

  <button
    onClick={handleDownloadPDF}
    disabled={isDownloading}
    className={`${
      isDownloading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
    } text-white font-semibold py-2 px-4 rounded flex items-center`}
  >
    {isDownloading ? "Downloading..." : "Download PDF"}
  </button>
</div>
    </div>
  );
}

export default TransactionTable;