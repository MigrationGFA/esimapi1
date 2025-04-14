import { ApiResponse } from "./api";
import api from "./api";

// Import necessary interfaces for ESIM products and regions
import {
    ESIMProduct,
    ESIMDataPlan,
    RegionInfo,
    ProductsQueryParams,
    ProductsByValidityQueryParams,
    EmailQueryParams,
    RegionApiResponse,
    ProductApiResponse,
    ESIMDataHistory,
    ESIMDataPlanResponse,
    ESIMDataHistoryResponse,
    ESIMService,
    ESIMServiceResponse
} from "@/interfaces/esim";


// Base path constant
const BASE_PATH = '/esim';

/**
 * Fetches basic ESIM service information
 * @returns General ESIM service information
 */
export async function getESIMService(params: EmailQueryParams): Promise<ESIMService[]> {
    try {
        const response = await api.get<ESIMServiceResponse<ESIMService[]>>(BASE_PATH, params);
        if (!response.data || !response.data.esims) {
            throw new Error('ESIM service data is undefined');
        }
        console.log('ESIM service data:', response.data); // Debugging line
        return response.data.esims;
    } catch (error) {
        console.error('getESIMService failed:', error);
        throw error;
    }
}


/**
 * Fetches available regions for ESIM products
 * @returns List of available regions and countries
 */
export async function getRegions(): Promise<RegionInfo[]> {
    try {
        const response = await api.get<RegionApiResponse<RegionInfo[]>>(`${BASE_PATH}/region`);
        if (!response.data || !response.data.regions) {
            throw new Error('Region data is undefined');
        }
        console.log('Regions data:', response.data.regions); // Debugging line
        return response.data.regions;
    } catch (error) {
        console.error('getRegions failed:', error);
        throw error;
    }
}


/**
 * Fetches ESIM products with optional filtering by region and country
 * @param params Optional query parameters for filtering
 * @returns List of ESIM products matching the criteria
 */
export async function getProducts(params?: ProductsQueryParams): Promise<ESIMProduct[]> {
    try {
        const response = await api.get<ProductApiResponse<ESIMProduct[]>>(`${BASE_PATH}/products`, params);
        if (!response.data || !response.data.products) {
            throw new Error('Products data is undefined');
        }
        console.log('Products data:', response.data.products); // Debugging line
        return response.data.products;
    } catch (error) {
        console.error('getProducts failed:', error);
        throw error;
    }
}

/**
 * Fetches ESIM products filtered by validity period and optional region/country
 * @param params Query parameters including optional validity period
 * @returns List of ESIM products matching the criteria
 */
export async function getProductsByValidity(params?: ProductsByValidityQueryParams): Promise<ESIMProduct[]> {
    try {
        const response = await api.get<ProductApiResponse<ESIMProduct[]>>(`${BASE_PATH}/products/validity`, params);
        if (!response.data || !response.data.products) {
            throw new Error('Products data is undefined');
        }
        console.log('Products by validity data:', response.data.products); // Debugging line 
        return response.data.products;
    } catch (error) {
        console.error('getProductsByValidity failed:', error);
        throw error;
    }
}

/**
 * Fetches detailed information for a specific ESIM data plan product
 * @param productUID Unique identifier for the product
 * @returns Detailed product information
 */
export async function getProductDetails(productUID: string): Promise<ESIMProduct> {
    try {
        const response = await api.get<ProductApiResponse<ESIMProduct>>(`${BASE_PATH}/products/data-plan/${productUID}`);
        if (!response.data || !response.data.product) {
            throw new Error('Product details are undefined');
        }
        
        console.log('Product details:', response.data.product); // Debugging line

        return response.data.product;
    } catch (error) {
        console.error(`getProductDetails failed for productUID ${productUID}:`, error);
        throw error;
    }
}

/**
 * Fetches all ESIM plans associated with an email address
 * @param params Query parameters containing the email address
 * @returns List of ESIM plans for the user
 */
export async function getUserPlans(params: EmailQueryParams): Promise<ESIMDataPlan[]> {
    try {
        const response = await api.get<ESIMDataPlanResponse<ESIMDataPlan[]>>(`${BASE_PATH}/plans`, params);
        if (!response.data || !response.data.plans) {
            throw new Error('User plans data is undefined');
        }
        console.log(response.data.plans)
        return response.data.plans;
    } catch (error) {
        console.error('getUserPlans failed:', error);
        throw error;
    }
}

/**
 * Fetches data usage history for an email address
 * @param params Query parameters containing the email address
 * @returns Data usage history for the user
 */
export async function getDataHistory(params: EmailQueryParams): Promise<ESIMDataHistory[]> {
    try {
        const response = await api.get<ESIMDataHistoryResponse<ESIMDataHistory[]>>(`${BASE_PATH}/data/history`, params);
        if (!response.data || !response.data.history) {
            throw new Error('Data history is undefined');
        }
        return response.data.history;
    } catch (error) {
        console.error('getDataHistory failed:', error);
        throw error;
    }
}


// Export all functions as a bundle
const esimService = {
    getESIMService,
    getRegions,
    getProducts,
    getProductsByValidity,
    getProductDetails,
    getUserPlans,
    getDataHistory,
};

export default esimService;