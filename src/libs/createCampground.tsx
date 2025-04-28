export default async function createCampground(data: any, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to create campground");
    }
    return await response.json();
}