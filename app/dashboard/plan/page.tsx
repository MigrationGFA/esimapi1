"use client";


import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authstore";
import { useESIMStore } from "@/store/esimStore";
import PlanTabHeader from "@/components/Dashboard/PlanDash/PlanTabHeader";
import PlanCard from "@/components/Dashboard/PlanDash/PlanCard";

import { ESIMDataPlan } from "@/interfaces/esim";
import ESIMDataHistoryCard from "@/components/Dashboard/PlanDash/HistoryCard";
import PlanSkeleton from "@/components/Dashboard/PlanDash/PlanSkeleton";
import HistorySkeleton from "@/components/Dashboard/PlanDash/HistorySkeleton";

// Sample usage data (in GB)
const usageData = {
  "plan-123": 2.1, // 2.1GB used of 5GB
  "plan-456": 0.35, // 350MB used of 500MB
};

export default function PlanPage() {
  const [currentTab, setCurrentTab] = useState("Active");
  const { loggedInEmail } = useAuthStore();
  const { userPlans, fetchUserPlans, dataHistory, fetchDataHistory, loading } =
    useESIMStore();

  // Computed
  const getPlansByStatus = (status: "TERMINATED" | "NOT_ACTIVE") => {
    return userPlans.filter((plan) => plan.network_status === status);
  };

  const activePlans = getPlansByStatus("NOT_ACTIVE");
  const terminatedPlans = getPlansByStatus("TERMINATED");

  // Load user plans if user is logged in
  useEffect(() => {
    if (loggedInEmail) {
      fetchUserPlans(loggedInEmail).catch(console.error);
      fetchDataHistory(loggedInEmail).catch(console.error);
      
    }
  }, [loggedInEmail, fetchUserPlans, fetchDataHistory]);

  const handleTopUp = (planId: string) => {
    console.log(`Top up requested for plan: ${planId}`);
    // Handle top-up logic here
  };

  // Render
  const renderHistory = () => {
    if (loading.dataHistory) {
      return <HistorySkeleton />;
    }
    return (
      <div className="space-y-3 mt-4">
        {dataHistory.length > 0 ? (
          dataHistory.map((history) => (
            <ESIMDataHistoryCard key={history.uid} data={history} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            No {currentTab} transactions found.
          </p>
        )}
      </div>
    );
  };

  const renderPlans = (plans: ESIMDataPlan[]) => {
    if (loading.userPlans) {
      return <PlanSkeleton />;
    }
    return (
      <div>
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {plans.map((plan) => (
              <PlanCard
                key={plan.plan_id}
                plan={plan}
                dataUsed={usageData[plan.plan_id as keyof typeof usageData]}
                onAction={() => handleTopUp(plan.plan_id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No {currentTab} plans found.
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Tab header */}
      <div className="mb-6">
        <PlanTabHeader
          tabs={["Active", "Expired", "History"]}
          defaultTab="Active"
          onTabChange={setCurrentTab}
        />
      </div>

      <div>
        {currentTab === "Active" && renderPlans(activePlans)}
        {currentTab === "Expired" && renderPlans(terminatedPlans)}
        {currentTab === "History" && renderHistory()}
      </div>
    </div>
  );
}
