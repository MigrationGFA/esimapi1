import React from "react";

import { RegionData } from "@/services/country.service";
import ErrorDisplay from "./ErrorDisplay";

interface RegionsGridProps {
  regions: RegionData[];
  isLoading: boolean;
  error: string | null;
}

const RegionsGrid: React.FC<RegionsGridProps> = ({
  regions,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (regions.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">No regions available</div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {regions.map((region, index) => (
        <div
          key={index}
          className="px-4 py-6 bg-[#1428A00D] rounded-lg flex flex-col justify-between items-center gap-3 hover:bg-[#1428A01A] cursor-pointer transition-colors"
        >
          <img src={region.flag} alt="" />

          <span className="font-medium text-center">{region.name}</span>
        </div>
      ))}
    </div>
  );
};

export default RegionsGrid;
