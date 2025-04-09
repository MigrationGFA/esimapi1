import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getCountries, getTopDestinations } from '@/services/country.service';
import { getRegions } from '@/services/test/esim.service.test';

import { CountryData, DestinationData, RegionData } from '@/services/country.service';


interface CountryStore {
  // Data
  countries: CountryData[];
  topDestinations: DestinationData[];
  regions: RegionData[];

  // UI State
  activeTab: 'top' | 'all' | 'region';
  isLoading: boolean;
  error: string | null;
  searchTerm: string; // Add search term state

  // Actions
  setActiveTab: (tab: 'top' | 'all' | 'region') => void;
  fetchCountries: () => Promise<void>;
  fetchTopDestinations: () => Promise<void>;
  fetchRegions: () => Promise<void>;
  resetError: () => void;
  setSearchTerm: (term: string) => void; // Add setSearchTerm action


  // computed
  filteredCountries: CountryData[]; // Add filteredCountries computed property



}

export const useCountryStore = create<CountryStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      countries: [],
      topDestinations: [],
      regions: [],

      activeTab: 'top',
      isLoading: false,
      error: null,
      searchTerm: '', // Initialize search term

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      fetchCountries: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getCountries();
          console.log(data)
          set({ countries: data, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch countries',
            isLoading: false
          });
        }
      },

      fetchTopDestinations: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getTopDestinations();
          console.log(data)
          set({ topDestinations: data, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch top destinations',
            isLoading: false
          });
        }
      },

      fetchRegions: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getRegions();
          console.log(data)
          set({ regions: data, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch regions',
            isLoading: false
          });
        }
      },

      resetError: () => set({ error: null }),

      setSearchTerm: (term) => set({ searchTerm: term }), // Set search term

      // Computed
      filteredCountries: () => {
        const { countries, searchTerm } = get();
        return countries.filter(country =>
          country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      },
    }),
    { name: 'country-store' }
  )
);