'use client';

import React, { useState } from 'react';
import { addPaymentMethod } from '@/libs/addPaymentMethod'; // สมมติว่าเก็บฟังก์ชันนี้ที่ services
import { PaymentMethod as PaymentMethodType } from '../../interface';
import { useSession } from "next-auth/react";

function AddPaymentMethod() {
  const { data: session } = useSession();
  const [method, setMethod] = useState<"credit_card" | "bank_account" | "">("");
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    cardNumber: '',
    bankAccountNumber: '',
    bankName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: Partial<PaymentMethodType> = {
      name: formData.name,
      method: method,
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

      // เคลียร์ฟอร์มหลังจาก submit
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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Payment Method</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            value={method}
            onChange={(e : any) => setMethod(e.target.value)}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_account">Bank Account</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {method === 'credit_card' && (
          <div>
            <label className="block mb-1 font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        )}

        {method === 'bank_account' && (
          <>
            <div>
              <label className="block mb-1 font-medium">Bank Account Number</label>
              <input
                type="text"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bank Name</label>
                <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
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
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPaymentMethod;
