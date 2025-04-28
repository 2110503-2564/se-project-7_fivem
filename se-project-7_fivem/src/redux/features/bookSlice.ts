import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from '../../../interface';

type BookState = {
    bookItems: BookingItem[]
}

const initialState: BookState = { bookItems: [] }

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const existingIndex = state.bookItems.findIndex(
                obj => obj._id === action.payload._id
            );
            
            if (existingIndex !== -1) {
                state.bookItems[existingIndex] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action: PayloadAction<string>) => {
            state.bookItems = state.bookItems.filter(
                obj => obj._id !== action.payload
            );
        },
        setBookings: (state, action: PayloadAction<BookingItem[]>) => {
            state.bookItems = action.payload;
        }
    }
});

export const { addBooking, removeBooking, setBookings } = bookSlice.actions;
export default bookSlice.reducer;