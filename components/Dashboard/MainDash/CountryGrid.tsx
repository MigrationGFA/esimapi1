import React from "react";
import { CountryData } from "@/services/country.service";
import ErrorDisplay from "./ErrorDisplay";

interface CountryGridProps {
  countries: CountryData[];
  isLoading: boolean;
  error: string | null;
}

const CountryGrid: React.FC<CountryGridProps> = ({
  countries,
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

  if (countries.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        No countries available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {countries.map((country) => (
        <div
          key={country.id}
          className="flex items-center justify-between p-2 border-b"
        >
          <div className="flex gap-4 items-center">
            {country.flag && (
              <img
                src={country.flag}
                alt={`${country.countryName} flag`}
                width={24}
                height={16}
                className="object-cover"
              />
            )}
            <span className="font-medium">{country.countryName}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CountryGrid;
