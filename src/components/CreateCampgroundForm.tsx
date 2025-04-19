"use client";
import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { SelectChangeEvent } from '@mui/material/Select';
import createCampground from '@/libs/createCampground';
import { Tent, MapPin, Landmark, Navigation, Phone, Mailbox } from 'lucide-react';

const regions = ["North", "South", "East", "West", "Central", "North East"];

const CreateCampgroundForm: React.FC = () => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        region: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user.token) {
            setError('Please login to create campground');
            return;
        }

        // Validation
        if (Object.values(formData).some(field => !field)) {
            setError('All fields are required');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            await createCampground(formData, session.user.token);
            setSuccess('Campground created successfully!');
            setFormData({
                name: '',
                address: '',
                district: '',
                province: '',
                postalcode: '',
                tel: '',
                region: '',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create campground');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-amber-200">
            <div className="flex items-center justify-center mb-6">
                <Tent className="h-8 w-8 text-amber-700 mr-3" />
                <h2 className="text-2xl font-bold text-amber-900">Create New Campground</h2>
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

            <form onSubmit={handleSubmit} className="space-y-5">
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
                        sx={{ fieldset: { borderColor: '#d97706' } }}
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
                        {regions.map(region => (
                            <MenuItem key={region} value={region}>{region}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={submitting}
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
                    {submitting ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        "Create Campground"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CreateCampgroundForm;