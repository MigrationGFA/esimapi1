"use client";
import React, { useState } from "react";
import Image from "next/image";

const topCountries = [
  { id: 1, name: "England", flag: "/england-flag.svg" },
  { id: 2, name: "France", flag: "/france-flag.svg" },
  { id: 3, name: "Germany", flag: "/germany-flag.svg" },
];

const allCountries = [
  { id: 1, name: "England", flag: "/england-flag.svg" },
  { id: 2, name: "France", flag: "/france-flag.svg" },
  { id: 3, name: "Germany", flag: "/germany-flag.svg" },
  { id: 4, name: "Spain", flag: "/spain-flag.svg" },
  { id: 5, name: "Italy", flag: "/italy-flag.svg" },
  { id: 6, name: "Portugal", flag: "/portugal-flag.svg" },
];

const regions = [
  { id: 1, name: "England", flag: "/england-flag.svg" },
  { id: 2, name: "Scotland", flag: "/scotland-flag.svg" },
  { id: 3, name: "Wales", flag: "/wales-flag.svg" },
];

export default function Places() {
  const [activeTab, setActiveTab] = useState("topCountries");

  // Determine which data to show based on active tab
  const getTabData = () => {
    switch (activeTab) {
      case "topCountries":
        return topCountries;
      case "allCountries":
        return allCountries;
      case "regions":
        return regions;
      default:
        return topCountries;
    }
  };
  return (
    <section className="py-20 relative overflow-hidden bg-[#1428A00D]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Tab Header */}
        <div className="flex items-center justify-center border-b border-gray-200 mb-8 md:gap-10">
          <button
            className={`pb-4 px-6 text-lg font-semibold ${
              activeTab === "topCountries"
                ? "text-[#1428A0] border-b-2 border-blue-700"
                : "text-[#1428A0] hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("topCountries")}
          >
            Top Countries
          </button>
          <button
            className={`pb-4 px-6 text-lg font-semibold ${
              activeTab === "allCountries"
                ? "text-[#1428A0] border-b-2 border-blue-700"
                : "text-[#1428A0] hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("allCountries")}
          >
            All Countries
          </button>
          <button
            className={`pb-4 px-6 text-lg font-semibold ${
              activeTab === "regions"
                ? "text-[#1428A0] border-b-2 border-blue-700"
                : "text-[#1428A0] hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("regions")}
          >
            Regions
          </button>
        </div>

        {/* Country Selection Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getTabData().map((country, index) => (
            <div key={country.id} className="relative">
              <button
                className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none"
                onClick={() => console.log(`Selected: ${country.name}`)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-3 relative">
                    {/* Placeholder for flag - in real app use next/image */}
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                      <span className="text-red-500 text-xs">
                        {country.flag ? (
                          <img
                            src="https://flagcdn.com/24x18/gb.png"
                            alt={`${country.name} flag`}
                            width={32}
                            height={32}
                          />
                        ) : (
                          country.name.substring(0, 2)
                        )}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-800">
                    {country.name}
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
