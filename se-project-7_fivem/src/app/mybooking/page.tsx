"use client";
import BookingList from "@/components/BookingList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function MyBookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <main>
      <BookingList></BookingList>
    </main>
  );
}