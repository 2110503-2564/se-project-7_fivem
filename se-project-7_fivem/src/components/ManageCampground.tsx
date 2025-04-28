"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import getCampgrounds from "@/libs/getCampgrounds";
import updateCampground from "@/libs/updateCampground";
import deleteCampground from "@/libs/deleteCampground";
import { CampgroundItem } from "../../interface";
import {
  Tent,
  MapPin,
  Landmark,
  Navigation,
  Phone,
  Mailbox,
  Coins
} from "lucide-react";

const UpdateDeleteCampground: React.FC = () => {
  const { data: session } = useSession();
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [selectedCampground, setSelectedCampground] = useState<string>("");
  const [formData, setFormData] = useState<CampgroundItem>({
    _id: "",
    name: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    region: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        setCampgrounds(response.data);
      } catch (err) {
        setError("Failed to fetch campgrounds");
      }
    };
    fetchCampgrounds();
  }, []);

  useEffect(() => {
    if (selectedCampground) {
      const campground = campgrounds.find(
        (cg) => cg._id === selectedCampground
      );
      if (campground) {
        setFormData(campground);
      }
    } else {
      setFormData({
        _id: "",
        name: "",
        address: "",
        district: "",
        province: "",
        postalcode: "",
        tel: "",
        region: "",
        price: 0, 
      });
    }
  }, [selectedCampground, campgrounds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user.token || !selectedCampground) {
      setError("Please select a campground to update");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateCampground(
        selectedCampground,
        formData,
        session.user.token
      );
      setSuccess("Campground updated successfully");
      const response = await getCampgrounds();
      setCampgrounds(response.data);
    } catch (err) {
      setError("Failed to update campground");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!session?.user.token || !selectedCampground) {
      setError("Please select a campground to delete");
      return;
    }
    if (!confirm("Are you sure you want to delete this campground?")) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await deleteCampground(selectedCampground, session.user.token);
      setSuccess("Campground deleted successfully");
      setCampgrounds((prev) =>
        prev.filter((cg) => cg._id !== selectedCampground)
      );
      setSelectedCampground("");
      setFormData({
        _id: "",
        name: "",
        address: "",
        district: "",
        province: "",
        postalcode: "",
        tel: "",
        region: "",
        price: 0, // รีเซ็ตฟิลด์ price
      });
    } catch (err) {
      setError("Failed to delete campground");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-green-200">
      <div className="flex items-center justify-center mb-6">
        <Tent className="h-8 w-8 text-green-700 mr-3" />
        <h2 className="text-2xl font-bold text-green-900">Manage Campground</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm border border-green-300">
          {success}
        </div>
      )}

      <div className="space-y-5">
        {/* Campground selector */}
        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-green-700">
            <Tent className="mr-2 h-4 w-4" />
            Select Campground
          </label>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={selectedCampground}
              onChange={(e) => setSelectedCampground(e.target.value)}
              className="bg-green-50 text-green-900 border border-green-300 rounded-md"
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span className="text-gray-400">Select a campground</span>
                  );
                }
                const selectedCamp = campgrounds.find(
                  (cg) => cg._id === selected
                );
                return selectedCamp ? selectedCamp.name : "";
              }}
            >
              <MenuItem disabled value="">
                <em>Select a campground</em>
              </MenuItem>
              {campgrounds.map((cg) => (
                <MenuItem key={cg._id} value={cg._id}>
                  {cg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name + Address */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-green-700">
              <Tent className="mr-2 h-4 w-4" />
              Campground Name
            </label>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-green-700">
              <MapPin className="mr-2 h-4 w-4" />
              Address
            </label>
            <TextField
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              size="small"
            />
          </div>

          {/* District + Province */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-green-700">
                <Landmark className="mr-2 h-4 w-4" />
                District
              </label>
              <TextField
                fullWidth
                name="district"
                value={formData.district}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-green-700">
                <Navigation className="mr-2 h-4 w-4" />
                Province
              </label>
              <TextField
                fullWidth
                name="province"
                value={formData.province}
                onChange={handleChange}
                size="small"
              />
            </div>
          </div>

          {/* Postal code + Telephone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-green-700">
                <Mailbox className="mr-2 h-4 w-4" />
                Postal Code
              </label>
              <TextField
                fullWidth
                name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                size="small"
                inputProps={{
                  maxLength: 5,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-green-700">
                <Phone className="mr-2 h-4 w-4" />
                Telephone
              </label>
              <TextField
                fullWidth
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                size="small"
                inputProps={{ maxLength: 9 }}
                type="tel"
              />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-green-700">
              <Coins className="mr-2 h-4 w-4" />
              Price
            </label>
            <TextField
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleChange}
              size="small"
              inputProps={{
                pattern: "^[0-9]*\\.?[0-9]+$",
              }}
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              disabled={loading || !selectedCampground}
              className={`w-full py-3 rounded-lg text-white font-medium shadow-md transition-colors flex items-center justify-center ${
                loading || !selectedCampground
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Update"
              )}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || !selectedCampground}
              className={`w-full py-3 rounded-lg text-white font-medium shadow-md transition-colors flex items-center justify-center ${
                loading || !selectedCampground
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDeleteCampground;
