export interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  price: number;
}

export interface CampgroundResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    region: string;
    __v: number;
    price: number;
  };
}

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}

export interface BookingItem {
  _id: string;
  apptDate: string;
  createdAt: string;
  user: string;
  campground: CampgroundItem;
}

export interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

export interface BookingUpdateResponse {
  success: boolean;
  data: BookingItem;
}

export interface UpdateBookingData {
  apptDate: string;
  campground: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
}

export interface SessionUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface PaymentMethod {
  _id: string;
  user: string; // Or `User` if populated
  name: string;
  method: "credit_card" | "bank_account";
  cardFingerprint?: string;
  bankAccountFingerprint?: string;
  bankName?:
    | "KBank"
    | "SCB"
    | "BBL"
    | "Krungsri"
    | "KTB"
    | "TTB"
    | "BAAC"
    | "GSB"
    | "CIMB"
    | "UOB";
  cardNumber?: string;
  bankAccountNumber?: string;
  createdAt: string;
}

export interface Transaction {
  _id: string;
  user: string | User | null; // Use `User` if populated
  booking: BookingItem | string;
  campground: CampgroundItem | string;
  paymentMethod: PaymentMethod | string;
  amount: number;
  status: string;
  transactionDate: string;
  paidAt?: string;
}

export interface CampgroundWithBookings extends CampgroundItem {
  bookings: BookingItem[];
}

