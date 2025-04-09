"use client";
import React, { useState, ChangeEvent } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Country {
  code: string;
  flag: string;
  name: string;
}

interface PhoneNumberInputProps {
  label?: string;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
}

const countries: Country[] = [
  { code: "+1", flag: "US", name: "United States" },
  { code: "+44", flag: "GB", name: "United Kingdom" },
  { code: "+91", flag: "IN", name: "India" },
  { code: "+49", flag: "DE", name: "Germany" },
  { code: "+33", flag: "FR", name: "France" },
  { code: "+61", flag: "AU", name: "Australia" },
  { code: "+86", flag: "CN", name: "China" },
  { code: "+81", flag: "JP", name: "Japan" },
  { code: "+234", flag: "NG", name: "Nigeria" }, // Added as requested
  { code: "+27", flag: "ZA", name: "South Africa" },
  { code: "+55", flag: "BR", name: "Brazil" },
  { code: "+52", flag: "MX", name: "Mexico" },
  { code: "+7", flag: "RU", name: "Russia" },
  { code: "+34", flag: "ES", name: "Spain" },
  { code: "+39", flag: "IT", name: "Italy" },
  { code: "+971", flag: "AE", name: "United Arab Emirates" },
  { code: "+82", flag: "KR", name: "South Korea" },
  { code: "+351", flag: "PT", name: "Portugal" },
  { code: "+20", flag: "EG", name: "Egypt" },
  { code: "+64", flag: "NZ", name: "New Zealand" },
];

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  onChange,
  value,
  error,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleCountryChange = (country: Country): void => {
    setSelectedCountry(country);
    if (onChange) {
      onChange(`${country.code}${phoneNumber}`);
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNumber = e.target.value;
    setPhoneNumber(newNumber);
    if (onChange) {
      onChange(`${selectedCountry.code}${newNumber}`);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-r-none border-r-0 px-3 bg-gray-50"
            >
              <img
                src={`https://flagsapi.com/${selectedCountry.flag}/flat/24.png`}
                alt={`${selectedCountry.name} flag`}
              />
              <span>{selectedCountry.code}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            {countries.map((country) => (
              <DropdownMenuItem
                key={country.code}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleCountryChange(country)}
              >
                <img
                  src={`https://flagsapi.com/${country.flag}/flat/24.png`}
                  alt={`${country.name} flag`}
                />
                <span>{country.name}</span>
                <span className="text-gray-500 ml-auto">{country.code}</span>
                {selectedCountry.code === country.code && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="tel"
          placeholder="123-456-7890"
          className="rounded-l-none flex-1"
          value={phoneNumber}
          onChange={handlePhoneChange}
          aria-invalid={!!error}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
