"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import getCampgrounds from "@/libs/getCampgrounds";
import updateCampground from "@/libs/updateCampground";
import deleteCampground from "@/libs/deleteCampground";
import { CampgroundItem } from "../../interface";
import { Tent, MapPin, Landmark, Navigation, Phone, Mailbox } from 'lucide-react';

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
      const campground = campgrounds.find((cg) => cg._id === selectedCampground);
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
      await updateCampground(selectedCampground, formData, session.user.token);
      setSuccess("Campground updated successfully");
      // Refresh the campground list
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
      setCampgrounds((prev) => prev.filter((cg) => cg._id !== selectedCampground));
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
      });
    } catch (err) {
      setError("Failed to delete campground");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-amber-200">
      <div className="flex items-center justify-center mb-6">
        <Tent className="h-8 w-8 text-amber-700 mr-3" />
        <h2 className="text-2xl font-bold text-amber-900">Manage Campground</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm border border-green-200">
          {success}
        </div>
      )}

      <div className="space-y-5">
      <div className="space-y-1">
        <label className="flex items-center text-sm font-medium text-amber-700">
            <Tent className="mr-2 h-4 w-4" />
            Select Campground
        </label>
        <FormControl fullWidth size="small">
            <Select
            displayEmpty
            value={selectedCampground}
            onChange={(e) => setSelectedCampground(e.target.value)}
            renderValue={(selected) => {
                if (!selected) {
                return <span className="text-gray-400">Select a campground</span>;
                }
                const selectedCamp = campgrounds.find(cg => cg._id === selected);
                return selectedCamp ? selectedCamp.name : '';
            }}
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d97706',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#b45309',
                }
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
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-amber-700">
              <Tent className="mr-2 h-4 w-4" />
              Campground Name
            </label>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d97706',
                  },
                  '&:hover fieldset': {
                    borderColor: '#b45309',
                  },
                }
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-amber-700">
              <MapPin className="mr-2 h-4 w-4" />
              Address
            </label>
            <TextField
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d97706',
                  },
                  '&:hover fieldset': {
                    borderColor: '#b45309',
                  },
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-amber-700">
                <Landmark className="mr-2 h-4 w-4" />
                District
              </label>
              <TextField
                fullWidth
                name="district"
                value={formData.district}
                onChange={handleChange}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d97706',
                    },
                    '&:hover fieldset': {
                      borderColor: '#b45309',
                    },
                  }
                }}
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-amber-700">
                <Navigation className="mr-2 h-4 w-4" />
                Province
              </label>
              <TextField
                fullWidth
                name="province"
                value={formData.province}
                onChange={handleChange}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d97706',
                    },
                    '&:hover fieldset': {
                      borderColor: '#b45309',
                    },
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-amber-700">
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
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
                sx={{
                  '& input[type=number]': {
                    '-moz-appearance': 'textfield',
                    appearance: 'textfield',
                  },
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d97706',
                    },
                    '&:hover fieldset': {
                      borderColor: '#b45309',
                    },
                  }
                }}
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-amber-700">
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d97706',
                    },
                    '&:hover fieldset': {
                      borderColor: '#b45309',
                    },
                  }
                }}
              />
            </div>
          </div>

          <FormControl fullWidth size="small">
            <label className="flex items-center text-sm font-medium text-amber-700 mb-1">
              <Navigation className="mr-2 h-4 w-4" />
              Region
            </label>
            <Select
              name="region"
              value={formData.region}
              onChange={(e) => setFormData({...formData, region: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d97706',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b45309',
                }
              }}
            >
              {["North", "South", "East", "West", "Central", "North East"].map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex justify-between gap-4">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !selectedCampground}
              sx={{
                backgroundColor: '#8B5A2B',
                color: 'white',
                py: 2,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(139, 90, 43, 0.3)',
                '&:hover': {
                  backgroundColor: '#A67C52',
                },
                '&:disabled': {
                  backgroundColor: '#D2B48C',
                  color: '#5A3921'
                }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Update"}
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleDelete}
              disabled={loading || !selectedCampground}
              sx={{
                backgroundColor: '#DC2626',
                color: 'white',
                py: 2,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)',
                '&:hover': {
                  backgroundColor: '#EF4444',
                },
                '&:disabled': {
                  backgroundColor: '#FCA5A5',
                  color: '#7F1D1D'
                }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Delete"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDeleteCampground;