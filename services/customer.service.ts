// customer.service.ts
import api from "./api";
import axios from "axios";

// Get request
export const getCustomer = async (emailAddress: string) => {
    try {
        const response = await api.get("/customer", {
            params: {
                emailAddress: emailAddress
            }
        })

        return response.data
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            console.error("API error fetching customer:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }

        // Re-throw the error so calling functions can handle it if needed
        throw error;
    }
}


// post request that takes in the custonerId and the customer object and returns the updated customer object

// export const editCustomer = async (customerId: string,)