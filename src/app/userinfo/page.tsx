"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import getUserProfile from "@/libs/getUserProfile"
import AddPaymentMethod from "@/components/AddPaymentMethod"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ManagePaymentMethod from "@/components/ManagePaymentMethod"
import TransactionTable from "@/components/TransactionTable"

export default function UserInfoPage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"payment" | "transactions" | null>(null)
  const router = useRouter()
  const [tabBar, setTabBar] = useState<'add' | 'manage'>('add')

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user.token) {
        const data = await getUserProfile(session.user.token)
        setUser(data.data)
      } else {
        router.push('/api/auth/signin')
      }
    }
    fetchUser()
  }, [session])

  if (!user) {
    return (
      <div className="flex justify-start items-center min-h-screen bg-green-50 px-10">
        <div className="animate-pulse flex flex-col items-center">
          <Image
            src={"/img/logo.png"}
            alt="Camping adventure"
            width={48}
            height={48}
            className="h-12 w-12 mb-4 animate-bounce"
          />
          <p className="text-green-800 font-medium">Loading your campground adventures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Left Panel - Profile */}
      <div className="w-1/3 flex flex-col items-start p-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full text-gray-800 space-y-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Your Profile</h2>
          <div className="space-y-6">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Telephone:</span> {user.tel}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setActiveTab("payment")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "payment"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
            >
              Payment Method
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "transactions"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
            >
              Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Dynamic Content */}
      <div className="w-2/3 pt-10 px-20">

        {activeTab === "payment" && (
          <div>
            <div className="w-full mx-auto mt-10">
      {/* TabBar */}
      <div className="flex justify-center bg-gray-100 rounded-t-lg shadow-md">
        <button
          className={`w-full py-3 text-sm font-semibold ${
            tabBar === 'add'
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          } rounded-tl-lg transition-all duration-200`}
          onClick={() => setTabBar('add')}
        >
          Add Payment Method
        </button>
        <button
          className={`w-full py-3 text-sm font-semibold ${
            tabBar === 'manage'
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          } rounded-tr-lg transition-all duration-200`}
          onClick={() => setTabBar('manage')}
        >
          Manage Payment Method
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-b-lg shadow-md mt-4">
        {tabBar === 'add' && <AddPaymentMethod />}
        {tabBar === 'manage' && <ManagePaymentMethod />}
      </div>
    </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white p-6 rounded-b-lg shadow-md mt-4">
            <TransactionTable />
          </div>
        )}
        {!activeTab && (
          <div className="text-gray-500 text-center mt-20">
            <p>Select an option on the left to continue.</p>
          </div>
        )}
      </div>
    </div>
  )
}
