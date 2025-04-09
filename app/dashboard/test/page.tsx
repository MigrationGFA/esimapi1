"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authstore";
import { useESIMStore } from "@/store/esimStore";

import { getESIMService } from "@/services/test/esim.service.test";

export default function page() {
  const { loggedInEmail } = useAuthStore();
  const { userPlans, fetchUserPlans } = useESIMStore();
  // const [loading, setLoading] = useState(true);

  // Load user plans if user is logged in
  useEffect(() => {
    if (loggedInEmail) {
      fetchUserPlans(loggedInEmail).catch(console.error);

    }
  }, [loggedInEmail, fetchUserPlans]);
  // // This should be done in a useEffect or similar lifecycle method in a real component
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const products = await getUserPlans({
  //         emailAddress: loggedInEmail,
  //       });

  //       // console.log("Fetched products:", products);
  //     } catch (error) {
  //       // console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false); // Ensure loading is set to false regardless of success or failure
  //     }
  //   };
  //   if (loggedInEmail) {
  //     fetchProducts();
  //   }
  // }, [loggedInEmail]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">eSIM Service Test Page</h1>

      {/* User Info */}
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">User Info</h2>
        <p>Logged in Email: {loggedInEmail || "Not logged in"}</p>
      </div>
    </div>
  );
}
