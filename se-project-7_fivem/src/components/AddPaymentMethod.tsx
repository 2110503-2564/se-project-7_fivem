'use client';

import React, { useState } from 'react';
import { addPaymentMethod } from '@/libs/addPaymentMethod';
import { PaymentMethod as PaymentMethodType } from '../../interface';
import { useSession } from "next-auth/react";
import { CreditCard, Landmark, Hash } from 'lucide-react';
import { TextField, Select, MenuItem, FormControl, Button } from '@mui/material';

function AddPaymentMethod() {
  const { data: session } = useSession();
  const [method, setMethod] = useState<"credit_card" | "bank_account" | "">("");
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    cardNumber: '',
    bankAccountNumber: '',
    bankName: '' as "" | "KBank" | "SCB" | "BBL" | "Krungsri" | "KTB" | "TTB" | "BAAC" | "GSB" | "CIMB" | "UOB",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!method) {
      alert('Please select a payment method type');
      return;
    }

    const payload: Partial<PaymentMethodType> = {
      name: formData.name,
      method: method as "credit_card" | "bank_account",
      cardNumber: method === 'credit_card' ? formData.cardNumber : undefined,
      bankAccountNumber: method === 'bank_account' ? formData.bankAccountNumber : undefined,
      bankName: method === 'bank_account' ? formData.bankName : undefined,
    };

    try {
      if (!session?.user.token) {
        alert('No token found. Please log in.');
        return;
      }
      const newPaymentMethod = await addPaymentMethod(payload, session?.user.token);
      alert('Payment method added successfully');
      console.log('Added payment method:', newPaymentMethod);

      setFormData({
        name: '',
        label: '',
        cardNumber: '',
        bankAccountNumber: '',
        bankName: '',
      });
      setMethod('');

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to add payment method');
    }
  };

  return (
    <div className="w-full p-8 bg-white rounded-xl shadow-lg border border-green-200">
      <div className="flex items-center justify-center mb-6">
        <CreditCard className="h-8 w-8 text-green-700 mr-3" />
        <h2 className="text-2xl font-bold text-green-900">Add Payment Method</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Type */}
        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-green-700">
            <Hash className="mr-2 h-4 w-4" />
            Method Type
          </label>
          <FormControl fullWidth size="small">
            <Select
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              displayEmpty
              className="bg-green-50 text-green-900 border border-green-300 rounded-md"
            >
              <MenuItem value=""><span className='text-gray-400'>Select method</span></MenuItem>
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="bank_account">Bank Account</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-green-700">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Method Name
          </label>
          <TextField
            fullWidth
            size="small"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter payment name"
          />
        </div>

        {/* Card Number */}
        {method === 'credit_card' && (
          <div className="col-span-2 space-y-1">
            <label className="flex items-center text-sm font-medium text-green-700">
              <CreditCard className="mr-2 h-4 w-4" />
              Card Number
            </label>
            <TextField
              fullWidth
              size="small"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Enter card number"
            />
          </div>
        )}

        {/* Bank Account Details */}
        {method === 'bank_account' && (
          <>
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-green-700">
                <Hash className="mr-2 h-4 w-4" />
                Bank Account Number
              </label>
              <TextField
                fullWidth
                size="small"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                placeholder="Enter bank account number"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-green-700">
                <Landmark className="mr-2 h-4 w-4" />
                Bank Name
              </label>
              <FormControl fullWidth size="small">
                <Select
                  name="bankName"
                  value={formData.bankName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankName: e.target.value as any
                  }))}
                  displayEmpty
                  className="bg-green-50 text-green-900 border border-green-300 rounded-md"
                >
                  <MenuItem value=""><span className='text-gray-400'>Select bank</span></MenuItem>
                  <MenuItem value="KBank">KBank</MenuItem>
                  <MenuItem value="SCB">SCB</MenuItem>
                  <MenuItem value="BBL">BBL</MenuItem>
                  <MenuItem value="Krungsri">Krungsri</MenuItem>
                  <MenuItem value="KTB">KTB</MenuItem>
                  <MenuItem value="TTB">TTB</MenuItem>
                  <MenuItem value="BAAC">BAAC</MenuItem>
                  <MenuItem value="GSB">GSB</MenuItem>
                  <MenuItem value="CIMB">CIMB</MenuItem>
                  <MenuItem value="UOB">UOB</MenuItem>
                </Select>
              </FormControl>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#16A34A', color: '#fff' }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPaymentMethod;
