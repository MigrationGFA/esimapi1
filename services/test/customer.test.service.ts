// // customer.service.ts - Function-based service
// import { ApiResponse } from "./api.test";
// import api from "./api.test";

// // Define strong types for your domain entities
// export interface Customer {
//     userId: number;
//     customerId: string;
//     firstName: string;
//     lastName: string;   
//     isEmailVerified: number;
//     isActive: number;
//     countryOfResidence: string;
// }

// // Base path constant
// const BASE_PATH = '/customer';

// // Get customer by email
// export async function getCustomerByEmail(emailAddress: string): Promise<Customer> {
//     try {
//         const response = await api.get<ApiResponse<Customer>>(BASE_PATH, { emailAddress });
//         // Ensure response.data is not undefined
//         if (!response.data) {
//             throw new Error('Customer data is undefined');
//         }
//         if (!response.data.data) {
//             throw new Error('Customer data is undefined');
//         }


//         return response.data.data;
//     } catch (error) {
//         console.error('getCustomerByEmail failed:', error);
//         throw error;
//     }
// }


// // Update customer
// export async function updateCustomer(customerId: string, customerData: Partial<Customer>): Promise<Customer> {
//     try {
//         const response = await api.put<Customer>(`${BASE_PATH}/${customerId}`, customerData);
//         // Ensure response.data is not undefined
//         if (!response.data) {
//             throw new Error('Customer data is undefined');
//         }
//         return response.data;
//     } catch (error) {
//         console.error('updateCustomer failed:', error);
//         throw error;
//     }
// }



// // Export all functions as a bundle
// const customerService = {
//     getCustomerByEmail,
//     updateCustomer,
// };

// export default customerService;


// customer.service.ts
import api from "@/services/test/api.test"; // Proper import path, not test
import { ApiResponse, ApiError } from "@/services/test/api.test"; // Import both types

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

// Get customer by email
export async function getCustomer(emailAddress: string): Promise<Customer> {
  try {
    const response = await api.get<Customer>(`${BASE_PATH}`, { emailAddress });
    
    if (!response.data) {
      throw new Error('Customer data is undefined');
    }
    
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