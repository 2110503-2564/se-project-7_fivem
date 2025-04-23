export async function deletePaymentMethod(id: string, token: string): Promise<void> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/payment-methods/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to delete payment method");
    }
  }
  