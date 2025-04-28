"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs"
import { useState } from "react";

export default function DateReserve( { onDateChange } : { onDateChange : Function}) {
  const [ reserveDate, setReserveDate ] = useState<Dayjs|null>(null)
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          sx={{
            width: "100%",
            mt: 1,
            mb: 3,
            backgroundColor: "white",
            borderRadius: 1,
          }}
          onChange={(value) => {
            setReserveDate(value);
            onDateChange(value);
          }}
        />
      </LocalizationProvider>
  );
}