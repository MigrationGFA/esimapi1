import api from "./api";
import axios from "axios";

export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface CountryData {
  id: number;
  countryName: string;
  iso2: string;
  iso3: string;
  flag: string;
}

export interface DestinationData {
  id: number;
  destinationName: string;
  countryIso2: string;
  flag: string;
}

export interface RegionData {
  tag: string
  name: string
  flag: string
}

// Generic error handler function
const handleApiError = (error: unknown, context: string): never => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || 0; // Default to 0 if undefined
    const errorMessage = error.response?.data?.message || error.message;

    console.error(`API error ${context} (${statusCode}):`, errorMessage);

    // Customize error handling based on status codes
    if (statusCode === 401) {
      // Handle unauthorized
      console.error("Authentication required");
    } else if (statusCode === 404) {
      // Handle not found
      console.error("Resource not found");
    } else if (statusCode >= 500) {
      // Handle server errors
      console.error("Server error occurred");
    }
  } else {
    console.error(`Unexpected error ${context}:`, error);
  }

  throw error;
};

// Cache implementation with expiration
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = <T>(key: string): T | null => {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    return cachedItem.data as T;
  }
  return null;
};

const setCachedData = <T>(key: string, data: T): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

// API functions with caching
export const getCountries = async (): Promise<CountryData[]> => {
  const cacheKey = 'countries';
  const cachedData = getCachedData<CountryData[]>(cacheKey);

  if (cachedData) return cachedData;

  try {
    const response = await api.get<ApiResponse<CountryData[]>>("/country");
    const data = response.data.data;
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    return handleApiError(error, "fetching countries");
  }
};

export const getTopDestinations = async (): Promise<DestinationData[]> => {
  const cacheKey = 'topDestinations';
  const cachedData = getCachedData<DestinationData[]>(cacheKey);

  if (cachedData) return cachedData;

  try {
    const response = await api.get<ApiResponse<DestinationData[]>>("/top-destinations");
    const data = response.data.data;
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    return handleApiError(error, "fetching top destinations");
  }
};

