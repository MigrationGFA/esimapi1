"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ESIMDataPlan {
  iccid: string;
  plan_id: string;
  plan_name: string;
  data_quota_mb: string;
  validity_days: number;
  countries_enabled: string[];
  network_status: string;
  start_time: string;
  date_activated: string;
  end_time: string;
}

interface PlanCardProps {
  plan: ESIMDataPlan;
  dataUsed: number; // This is not in the ESIMDataPlan interface, so keeping it as a prop
  onAction?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, dataUsed, onAction }) => {
  // Convert data_quota_mb from string to number
  const dataTotal = parseInt(plan.data_quota_mb) / 1000; // Convert MB to GB

  // Determine the appropriate unit based on quota size
  const unit: "GB" | "MB" = dataTotal >= 1 ? "GB" : "MB";

  // Format the display values based on the unit
  const displayTotal = unit === "GB" ? dataTotal : parseInt(plan.data_quota_mb);
  const displayUsed = unit === "GB" ? dataUsed : dataUsed * 1000; // Convert GB to MB if needed

  // Calculate percentage for progress bar
  const usagePercentage =
    ((dataUsed * 1000) / parseInt(plan.data_quota_mb)) * 100;

  // // Map network_status to NOT_ACTIVE/TERMINATED
  const status =
    plan.network_status === "NOT_ACTIVE" ? "NOT_ACTIVE" : "TERMINATED";

  // Determine button text based on status
  const buttonText = plan.network_status === "NOT_ACTIVE" ? "Top Up" : "Renew";

  // Determine button color based on status
  const buttonColor =
    status === "NOT_ACTIVE"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-800 hover:bg-blue-900";

  // Take the first country for display (you might want to modify this based on your needs)
  const primaryCountry = plan.countries_enabled[0] || "";

  // Get country code for the flag (assuming countries are stored as 2-letter ISO codes)
  const countryCode =
    primaryCountry.length === 2 ? primaryCountry.toUpperCase() : "";

  return (
    <Card
      className={`w-full max-w-md bg-gray-50 shadow-sm rounded-lg overflow-hidden ${
        status === "TERMINATED" ? "bg-gray-100" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2
            className={`text-lg font-bold ${
              status === "TERMINATED" ? "text-gray-500" : "text-gray-900"
            }`}
          >
            {plan.plan_name} {displayTotal}
            {unit}
          </h2>
          <div className="flex items-center">
            <span
              className={`text-sm mr-2 ${
                status === "TERMINATED" ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Status
            </span>
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
              {status === "NOT_ACTIVE" ? (
                <span className="h-2 w-2 rounded-full mr-2 bg-green-500" />
              ) : (
                <span className="mr-0" />
              )}
              <span
                className={`text-sm ${
                  status === "TERMINATED" ? "text-gray-500" : ""
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-2 flex justify-between items-center">
          <p
            className={`text-sm ${
              status === "TERMINATED" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {displayUsed} {unit} Used/ {displayTotal}
            {unit}
          </p>
          <div>
            <span
              className={`text-sm ${
                status === "TERMINATED" ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Valid for {plan.validity_days} Days
            </span>
          </div>
        </div>

        <div
          className={`w-full ${
            status === "TERMINATED" ? "bg-gray-200" : "bg-blue-100"
          } rounded-full h-2.5 mb-3`}
        >
          <div
            className={`${
              status === "TERMINATED" ? "bg-gray-400" : "bg-blue-600"
            } h-2.5 rounded-full`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className={status === "TERMINATED" ? "opacity-50" : ""}>
              {countryCode && (
                <img
                  src={`https://flagsapi.com/${countryCode}/flat/24.png`}
                  alt={`${primaryCountry} flag`}
                />
              )}
            </div>
            <span
              className={`font-medium ${
                status === "TERMINATED" ? "text-gray-500" : ""
              }`}
            >
              {primaryCountry}
            </span>
            {plan.countries_enabled.length > 1 && (
              <span className="text-sm text-gray-500">
                +{plan.countries_enabled.length - 1} more
              </span>
            )}
          </div>

          {onAction && (
            <button
              onClick={onAction}
              className={`ml-auto block ${buttonColor} text-white py-2 px-4 rounded font-medium transition-colors`}
            >
              {buttonText}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
