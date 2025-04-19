export interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
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

export interface CampgroundWithBookings extends CampgroundItem {
  bookings: BookingItem[];
}