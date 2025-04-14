
// customer.service.ts
import api from "@/services/api"; // Proper import path, not test
import { ApiResponse, ApiError } from "@/services/api"; // Import both types

// Define strong types for your domain entities
export interface Customer {
    userId: number;
    customerId: string;
    firstName: string;
    lastName: string;
    isEmailVerified: number;
    isActive: number;
    countryOfResidence: string;
    // Add more fields as needed
}

// Base path constant
const BASE_PATH = '/customer';

// Standard error handler for API responses
const handleApiError = (error: any, context: string): never => {
    // If it's already our standard ApiError type, just add context and throw
    if ('message' in error && 'statusCode' in error) {
        console.error(`${context}:`, error);
        throw error;
    }

    // Otherwise, create a standardized error
    let errorMessage = `${context}: An unexpected error occurred`;

    if (typeof error === 'object' && error !== null) {
        if ('detail' in error) {
            errorMessage = `${context}: ${String(error.detail)}`;
        } else if ('message' in error) {
            errorMessage = `${context}: ${String(error.message)}`;
        }
    }

    console.error(errorMessage);

    throw {
        message: errorMessage,
        statusCode: 500
    } as ApiError;
};



export async function getCustomer(emailAddress: string): Promise<Customer> {
    try {
        const response = await api.get<Customer>(`${BASE_PATH}`, { emailAddress });

        if (!response.data) {
            throw new Error('Customer data is undefined');
        }

        console.log(response.data)

        return response.data;
    } catch (error) {
        return handleApiError(error, 'getCustomer failed');
    }
}

// Get customer by ID
export async function getCustomerById(customerId: string): Promise<Customer> {
    try {
        const response = await api.get<Customer>(`${BASE_PATH}/${customerId}`);

        if (!response.data) {
            throw new Error('Customer data is undefined');
        }

        return response.data;
    } catch (error) {
        return handleApiError(error, 'getCustomerById failed');
    }
}

// Update customer
export async function updateCustomer(customerId: string, customerData: Partial<Customer>): Promise<Customer> {
    try {
        const response = await api.put<Customer>(`${BASE_PATH}/${customerId}`, customerData);

        if (!response.data) {
            throw new Error('Updated customer data is undefined');
        }

        return response.data;
    } catch (error) {
        return handleApiError(error, 'updateCustomer failed');
    }
}

// Update customer verification status
export async function updateVerificationStatus(customerId: string, isVerified: boolean): Promise<ApiResponse<{ updated: boolean }>> {
    try {
        const response = await api.patch<{ updated: boolean }>(`${BASE_PATH}/${customerId}/verification`, {
            isEmailVerified: isVerified ? 1 : 0
        });

        return response;
    } catch (error) {
        return handleApiError(error, 'updateVerificationStatus failed');
    }
}

// Export all functions as a bundle
const customerService = {
    getCustomer,
    getCustomerById,
    updateCustomer,
    updateVerificationStatus
};

export default customerService;