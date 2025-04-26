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
import { PaymentMethod } from "../../interface";
import { getPaymentMethods } from "@/libs/getPaymentMethods";
import { updatePaymentMethod } from "@/libs/updatePaymentMethod";
import { deletePaymentMethod } from "@/libs/deletePaymentMethod";
import { CreditCard, Banknote, Landmark, Hash } from "lucide-react";

const ManagePaymentMethod: React.FC = () => {
    const { data: session } = useSession();
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
    const [formData, setFormData] = useState<PaymentMethod>({
        _id: "",
        name: "",
        method: "",
        cardNumber: "",
        bankAccountNumber: "",
        bankName: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await getPaymentMethods(session?.user.token);
                setPaymentMethods(response);
            } catch (err) {
                setError("Failed to fetch payment methods");
            }
        };
        fetchPaymentMethods();
    }, []);

    useEffect(() => {
        if (selectedPaymentMethod) {
            const method = paymentMethods.find((pm) => pm._id === selectedPaymentMethod);
            if (method) {
                setFormData(method);
            }
        } else {
            setFormData({
                _id: "",
                name: "",
                method: "",
                cardNumber: "",
                bankAccountNumber: "",
                bankName: "",
            });
        }
    }, [selectedPaymentMethod, paymentMethods]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMethodChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const method = e.target.value as string;
        setFormData((prev) => ({
            ...prev,
            method,
            cardNumber: method === "credit_card" ? "" : prev.cardNumber,
            bankAccountNumber: method === "bank_account" ? "" : prev.bankAccountNumber,
            bankName: method === "bank_account" ? "" : prev.bankName,
        }));
    };

    const sanitizeFormData = (formData: PaymentMethod): PaymentMethod => {
        const cleanedFormData = { ...formData };
        if (cleanedFormData.method === "credit_card") {
            cleanedFormData.bankName = undefined;
            cleanedFormData.bankAccountNumber = undefined;
        } else if (cleanedFormData.method === "bank_account") {
            cleanedFormData.cardNumber = undefined;
        }
        return cleanedFormData;
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user.token || !selectedPaymentMethod) {
            setError("Please select a payment method to update");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
    
        try {
            const cleanedData = sanitizeFormData(formData);
    
            await updatePaymentMethod(selectedPaymentMethod, cleanedData, session.user.token);
            setSuccess("Payment method updated successfully");
            const response = await getPaymentMethods(session.user.token);
            setPaymentMethods(response);
            setFormData({
                _id: "",
                name: "",
                method: "",
                cardNumber: "",
                bankAccountNumber: "",
                bankName: "",
            });
        } catch (err) {
            setError("Failed to update payment method");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!session?.user.token || !selectedPaymentMethod) {
            setError("Please select a payment method to delete");
            return;
        }
        if (!confirm("Are you sure you want to delete this payment method?")) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await deletePaymentMethod(selectedPaymentMethod, session.user.token);
            setSuccess("Payment method deleted successfully");
            setPaymentMethods((prev) => prev.filter((pm) => pm._id !== selectedPaymentMethod));
            setSelectedPaymentMethod("");
            setFormData({
                _id: "",
                name: "",
                method: "",
                cardNumber: "",
                bankAccountNumber: "",
                bankName: "",
            });
        } catch (err) {
            setError("Failed to delete payment method");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-8 bg-white rounded-xl shadow-lg border border-green-200">
            <div className="flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-green-700 mr-3" />
                <h2 className="text-2xl font-bold text-green-900">Manage Payment Method</h2>
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
                <div className="space-y-1">
                    <label className="flex items-center text-sm font-medium text-green-700">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Select Your Payment Method
                    </label>
                    <FormControl fullWidth size="small">

                        <Select
                            displayEmpty
                            value={selectedPaymentMethod}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="bg-green-50 text-green-900 border border-green-300 rounded-md"
                            renderValue={(selected) => {
                                if (!selected) {
                                    return <span className="text-gray-400">Select a payment method</span>;
                                }
                                const selectedPayment = paymentMethods.find((pm) => pm._id === selected);
                                return selectedPayment ? selectedPayment.name : "";
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Select a payment method</em>
                            </MenuItem>
                            {paymentMethods.map((pm) => (
                                <MenuItem key={pm._id} value={pm._id}>
                                    {pm.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="flex items-center text-sm font-medium text-green-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Payment Method Name
                        </label>
                        <TextField
                            fullWidth
                            label="Payment Method Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            size="small"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="flex items-center text-sm font-medium text-green-700">
                            <Hash className="mr-2 h-4 w-4" />
                            Method
                        </label>
                        <FormControl fullWidth size="small">
                            <Select
                                value={formData.method}
                                onChange={handleMethodChange}
                                className="bg-green-50 text-green-900 border border-green-300 rounded-md"
                            >
                                <MenuItem value="">
                                    <em>Select method</em>
                                </MenuItem>
                                <MenuItem value="credit_card">Card</MenuItem>
                                <MenuItem value="bank_account">Bank Account</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {formData.method === "credit_card" && (
                        <TextField
                            fullWidth
                            label="Card Number"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            size="small"
                        />
                    )}

                    {formData.method === "bank_account" && (
                        <>
                            {/* Bank Name Select */}
                            <div className="space-y-1">
                                <label className="flex items-center text-sm font-medium text-green-700">
                                    <Landmark className="mr-2 h-4 w-4" />
                                    Bank Name
                                </label>
                                <select
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            bankName: e.target.value,
                                        }))
                                    }
                                    required
                                    className="w-full border rounded p-2 bg-green-50 text-green-900 border-green-300"
                                >
                                    <option value="">Select Bank</option>
                                    <option value="KBank">KBank</option>
                                    <option value="SCB">SCB</option>
                                    <option value="BBL">BBL</option>
                                    <option value="Krungsri">Krungsri</option>
                                    <option value="KTB">KTB</option>
                                    <option value="TTB">TTB</option>
                                    <option value="BAAC">BAAC</option>
                                    <option value="GSB">GSB</option>
                                    <option value="CIMB">CIMB</option>
                                    <option value="UOB">UOB</option>
                                </select>
                            </div>

                            {/* Bank Account Number */}
                            <div className="space-y-1">
                                <label className="flex items-center text-sm font-medium text-green-700">
                                    <Banknote className="mr-2 h-4 w-4" />
                                    Account Number
                                </label>
                                <TextField
                                    fullWidth
                                    label="Account Number"
                                    name="bankAccountNumber"
                                    value={formData.bankAccountNumber}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            bankAccountNumber: e.target.value,
                                        }))
                                    }
                                    size="small"
                                />
                            </div>
                        </>
                    )}


                    <div className="flex justify-between gap-4">
                        <button
                            type="submit"
                            disabled={loading || !selectedPaymentMethod}
                            className={`w-full py-3 rounded-lg text-white font-medium shadow-md transition-colors flex items-center justify-center ${loading || !selectedPaymentMethod
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-700 hover:bg-blue-800"
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
                            disabled={loading || !selectedPaymentMethod}
                            className={`w-full py-3 rounded-lg text-white font-medium shadow-md transition-colors flex items-center justify-center ${loading || !selectedPaymentMethod
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

export default ManagePaymentMethod;
