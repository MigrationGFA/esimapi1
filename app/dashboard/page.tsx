"use client";

import { useEffect } from "react";
import Image from "next/image";
import Woman from "@/public/Dashboard/woman.svg";

// Components
import DashCard from "@/components/Dashboard/MainDash/DashCard";
import CountryGrid from "@/components/Dashboard/MainDash/CountryGrid";
import DestinationsGrid from "@/components/Dashboard/MainDash/DestinationGrid";
import RegionsGrid from "@/components/Dashboard/MainDash/RegionGrid";
import ErrorDisplay from "@/components/Dashboard/MainDash/ErrorDisplay";
import TabSelector from "@/components/Dashboard/MainDash/TabSelector";

// Store
import { useCountryStore } from "@/store/countryStore";

export default function Dashboard() {
  // Extract everything we need from the store
  const {
    countries,
    topDestinations,
    regions,
    activeTab,
    isLoading,
    error,
    setActiveTab,
    fetchCountries,
    fetchTopDestinations,
    fetchRegions,
    resetError,
  } = useCountryStore();

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      if (
        activeTab === "top" ||
        activeTab === "all" ||
        activeTab === "region"
      ) {
        // Load countries data if we're on all countries tab
        if (activeTab === "all" && countries.length === 0) {
          await fetchCountries();
        }

        // Load destinations data if we're on top destinations tab
        if (activeTab === "top" && topDestinations.length === 0) {
          await fetchTopDestinations();
        }

        if (activeTab === "region" && regions.length === 0) {
          await fetchRegions();
        }
      }
    };

    loadData();
  }, [
    activeTab,
    countries.length,
    topDestinations.length,
    regions.length,
    fetchCountries,
    fetchTopDestinations,
  ]);

  // Handle retry on error
  const handleRetry = () => {
    resetError();
    if (activeTab === "all") {
      fetchCountries();
    } else if (activeTab === "top") {
      fetchTopDestinations();
    } else if (activeTab === "region") {
      fetchRegions();
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    if (error) {
      return <ErrorDisplay message={error} onRetry={handleRetry} />;
    }

    switch (activeTab) {
      case "top":
        return (
          <DestinationsGrid
            destinations={topDestinations}
            isLoading={isLoading}
            error={error}
          />
        );
      case "all":
        return (
          <CountryGrid
            countries={countries}
            isLoading={isLoading}
            error={error}
          />
        );
      case "region":
        return (
          <RegionsGrid regions={regions} isLoading={isLoading} error={error} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* Promo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashCard
          title="Affordable Data Plan"
          description="Get Data Plan with your purchase"
          buttonText="Get Started"
          backgroundColor="bg-[#2603C6]"
          textColor="text-white"
          image={
            <Image
              src={Woman}
              alt="Woman with laptop"
              width={120}
              height={120}
              className="object-contain"
            />
          }
        />
        <DashCard
          title="Affordable Data Plan"
          description="Get Data Plan with your purchase"
          buttonText="Get Started"
          backgroundColor="bg-[#FF8027]"
          textColor="text-white"
          image={
            <Image
              src={Woman}
              alt="Woman with laptop"
              width={120}
              height={120}
              className="object-contain"
            />
          }
        />
        <DashCard
          title="Affordable Data Plan"
          description="Get Data Plan with your purchase"
          buttonText="Get Started"
          backgroundColor="bg-[#E54F35]"
          textColor="text-white"
          image={
            <Image
              src={Woman}
              alt="Woman with laptop"
              width={120}
              height={120}
              className="object-contain"
            />
          }
        />
      </div>

      {/* Main Content Section */}
      <div className="col-span-3">
        <div className="bg-white py-4">
          {/* Tab Header */}
          <TabSelector
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* Tab Content */}
          <div className="py-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
