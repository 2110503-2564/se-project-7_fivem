export default async function getTransactions(token: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/transaction/download`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch Transactions CSV");
    }

    const data = await response.text();
    return data;
}