"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authstore";
import { useESIMStore } from "@/store/esimStore";

import ESIMCard from "@/components/Dashboard/EsimDash/ESIMCard";
import ESIMCardSkeleton from "@/components/Dashboard/EsimDash/ESIMCardSkeleton";
import { PlusCircle } from "lucide-react";

export default function ESIM() {
  const { loggedInEmail } = useAuthStore();
  const { esimService, fetchEsimService, loading } = useESIMStore();

  useEffect(() => {
    if (loggedInEmail) {
      fetchEsimService(loggedInEmail).catch(console.error);
    }
  }, [loggedInEmail, fetchEsimService]);

  if (loading.esimService) {
    return <ESIMCardSkeleton />;
  }

  // Empty state rendering
  if (esimService.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <PlusCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No eSIM Services Found
        </h2>
        <p className="text-gray-500 mb-6">You don't have any eSIM services</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {esimService.map((esim) => (
          <ESIMCard
            key={esim.iccid}
            uid={esim.uid}
            iccid={esim.iccid}
            activation_code={esim.activation_code}
            manual_code={esim.manual_code}
            smdp_address={esim.smdp_address}
            state={esim.state}
            service_status={esim.service_status}
            network_status={esim.network_status}
            tag={esim.tag}
            date_assigned={esim.date_assigned}
          />
        ))}
      </div>
      <div className="col-span-3 text-center text-gray-600 mt-10">
        How to set up your eSIM?
      </div>
    </div>
  );
}
