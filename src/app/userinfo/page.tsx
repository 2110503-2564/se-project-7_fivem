"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import getUserProfile from "@/libs/getUserProfile"
import PaymentMethod from "@/components/PaymentMethod"

export default function UserInfoPage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user.token) {
        const data = await getUserProfile(session.user.token)
        setUser(data.data)
      }
    }
    fetchUser()
  }, [session])

  if (!user) return <div>Loading...</div>

  return (
    <>
        <div className="mt-8">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Telephone: {user.tel}</p>
        <p>Role: {user.role}</p>
        </div>
        <PaymentMethod />
    </>
  )
}
