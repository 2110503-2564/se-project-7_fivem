export default async function userRegister(name: string, email: string, tel: string, password: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            tel,
            password
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to register");
    }
    return await response.json();
}