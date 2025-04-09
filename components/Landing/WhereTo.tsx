"use client";

import map from "@/public/map.png";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function WhereTo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Sample list of countries - you can expand this as needed
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "France",
    "Germany",
    "Japan",
    "Australia",
    "Brazil",
    "Mexico",
    "India",
  ];

  // const handleCountrySelect = (country) => {
  //   setSelectedCountry(country);
  //   setIsOpen(false);
  //   // Here you can add logic for what happens when a country is selected
  //   console.log(`Selected country: ${country}`);
  //   // You could navigate to a new page or show different plan options
  // };

  return (
    <section className="py-20 relative ">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-[768px] mx-auto text-center space-y-4">
          <h2 className="font-bold text-3xl md:text-4xl text-[#1428A0]">
            Where are you traveling next?
          </h2>
          <p className="leading-8 text-[#433E3F]">
            First, pick your destination, then choose a data plan that fits your
            needs. ZIG Mobile has regional and global plans for all kinds of
            travel.
          </p>
        </div>
        <div className="relative flex items-center justify-center mt-20">
          <Image src={map} alt="map" />

          {/* Dropdown Button */}
          {/* <div className="absolute top-[-60] md:top-[-50] mb-8">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center gap-2 bg-[#1428A0] text-white px-6 py-3 rounded-md font-medium shadow-lg hover:bg-[#0f1f7a] transition-colors"
              >
                <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                <span>{selectedCountry || "Where Next"}</span>
              </button>
              
              
              {isOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  <ul className="py-1">
                    {countries.map((country) => (
                      <li 
                        key={country}
                        onClick={() => handleCountrySelect(country)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#433E3F]"
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
