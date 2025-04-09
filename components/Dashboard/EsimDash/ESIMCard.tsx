import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ScanLine, ArrowRight } from "lucide-react";

// Use more descriptive interface name
interface eSIMServiceCardProps {
  uid: string;
  iccid: string;
  activation_code: string;
  manual_code: string;
  smdp_address: string;
  state: string;
  service_status: string;
  network_status: string;
  tag: string;
  date_assigned: string;
}

// Add utility function to determine status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500";
    case "Pending":
      return "bg-yellow-500";
    case "Inactive":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const ESIMServiceCard: React.FC<eSIMServiceCardProps> = ({
  uid,
  iccid,
  state,
  service_status,
  network_status,
  smdp_address,
  tag,
  date_assigned,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto  rounded-xl overflow-hidden transition-all hover:shadow-xl">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="flex p-4 items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-[#1428A0] p-2.5 rounded-lg">
              <ScanLine className="text-white w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{tag}</h2>
          </div>
          <span className="text-sm text-gray-600 font-medium">{state}</span>
        </div>

        {/* Identifiers Section */}
        <div className="grid grid-cols-2 gap-3 p-4 border-b border-gray-100">
          {[
            { label: "UID", value: uid },
            { label: "ICCID", value: iccid },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="font-medium text-gray-700 truncate" title={value}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Status and Date Section */}
        <div className="grid grid-cols-2 gap-3 p-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-2">Service Status</p>
            <div className="flex items-center space-x-2">
              <span
                className={`h-3 w-3 rounded-full ${getStatusColor(
                  service_status
                )}`}
              />
              <span className="text-sm text-gray-700">{service_status}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Date Assigned</p>
            <p className="text-sm text-gray-700">
              {new Date(date_assigned).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Network Status</p>
            <p className="text-sm text-gray-700">{network_status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">SMDP Address</p>
            <p className="text-sm text-gray-700 truncate" title={smdp_address}>
              {smdp_address}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {/* <div className="p-4 border-t border-gray-200">
          <Link href="/dashboard/esim/details" className="block">
            <button
              className="w-full flex items-center justify-center 
              text-[#1428A0] border-2 border-[#1428A0] 
              bg-white py-2.5 rounded-lg 
              hover:bg-blue-50 transition-colors 
              group"
            >
              <span>View Details</span>
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ESIMServiceCard;
