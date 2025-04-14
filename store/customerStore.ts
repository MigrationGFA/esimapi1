// customerStore.ts
import { create } from "zustand";
import customerService, { Customer } from "@/services/customer.service";
import { ApiError } from "@/services/api";

interface CustomerState {
  customer: Customer | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCustomer: (emailAddress: string) => Promise<Customer>;
  fetchCustomerById: (customerId: string) => Promise<Customer>;
  updateCustomer: (customerId: string, customerData: Partial<Customer>) => Promise<Customer>;
  updateVerificationStatus: (customerId: string, isVerified: boolean) => Promise<boolean>;
  setCustomer: (customer: Customer | null) => void;
  clearError: () => void;
  reset: () => void;
}

// Initial state
const initialState = {
  customer: null,
  isLoading: false,
  error: null
};

export const useCustomerStore = create<CustomerState>()((set, get) => ({
  ...initialState,

  setCustomer: (customer) => set({ customer }),

  clearError: () => set({ error: null }),

  reset: () => set(initialState),

  fetchCustomer: async (emailAddress: string) => {
    set({ isLoading: true, error: null });

    try {
      const customer = await customerService.getCustomer(emailAddress);
      set({ customer, isLoading: false });
      return customer;
    } catch (error) {
      const errorMsg = error instanceof Error
        ? error.message
        : (error as ApiError)?.message || 'Failed to fetch customer';

      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  fetchCustomerById: async (customerId: string) => {
    set({ isLoading: true, error: null });

    try {
      const customer = await customerService.getCustomerById(customerId);
      set({ customer, isLoading: false });
      return customer;
    } catch (error) {
      const errorMsg = error instanceof Error
        ? error.message
        : (error as ApiError)?.message || 'Failed to fetch customer by ID';

      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  updateCustomer: async (customerId: string, customerData: Partial<Customer>) => {
    set({ isLoading: true, error: null });

    try {
      const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
      set({ customer: updatedCustomer, isLoading: false });
      return updatedCustomer;
    } catch (error) {
      const errorMsg = error instanceof Error
        ? error.message
        : (error as ApiError)?.message || 'Failed to update customer';

      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  updateVerificationStatus: async (customerId: string, isVerified: boolean) => {
    set({ isLoading: true, error: null });

    try {
      const response = await customerService.updateVerificationStatus(customerId, isVerified);

      // Update the stored customer object if we have one
      const { customer } = get();
      if (customer && customer.customerId === customerId) {
        set({
          customer: {
            ...customer,
            isEmailVerified: isVerified ? 1 : 0
          }
        });
      }

      set({ isLoading: false });
      return response.success;
    } catch (error) {
      const errorMsg = error instanceof Error
        ? error.message
        : (error as ApiError)?.message || 'Failed to update verification status';

      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  }
}));

// Custom selector hooks for derived state
export const useCustomerFullName = () => {
  return useCustomerStore(state => {
    if (!state.customer) return '';
    return `${state.customer.firstName} ${state.customer.lastName}`.trim();
  });
};

export const useCustomerVerificationStatus = () => {
  return useCustomerStore(state => {
    if (!state.customer) return false;
    return state.customer.isEmailVerified === 1;
  });
};

export const useIsActiveCustomer = () => {
  return useCustomerStore(state => {
    if (!state.customer) return false;
    return state.customer.isActive === 1;
  });
};