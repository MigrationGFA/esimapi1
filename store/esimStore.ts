// src/store/esimStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import esimService from '@/services/esim.service';
import {
    ESIMDataPlan,
    ESIMDataHistory,
    ESIMService
} from '@/interfaces/esim';

interface ESIMStore {
    // State
    esimService: ESIMService[];
    userPlans: ESIMDataPlan[];
    dataHistory: ESIMDataHistory[];
    loading: {
        esimService: boolean;

        userPlans: boolean;
        dataHistory: boolean;
    };
    error: {
        esimService: string | null;

        userPlans: string | null;
        dataHistory: string | null;
    };

    // // Actions
    fetchEsimService: (emailAddress: string) => Promise<ESIMService[]>;
    fetchUserPlans: (emailAddress: string) => Promise<ESIMDataPlan[]>;
    fetchDataHistory: (emailAddress: string) => Promise<ESIMDataHistory[]>;
    resetErrors: () => void;
    resetStore: () => void;
}

const initialState = {

    esimService: [],
    // products: [],
    // selectedProduct: null,
    userPlans: [],
    dataHistory: [],
    loading: {
        esimService: false,
        // products: false,
        // productDetails: false,
        userPlans: false,
        dataHistory: false,
    },
    error: {
        esimService: null,
        // products: null,
        // productDetails: null,
        userPlans: null,
        dataHistory: null,
    },
};

export const useESIMStore = create<ESIMStore>()(
    devtools(
        (set, get) => ({
            ...initialState,

            fetchEsimService: async (emailAddress: string) => {
                set((state) => ({
                    loading: { ...state.loading, esimService: true },
                    error: { ...state.error, esimService: null },
                }));

                try {
                    const esims = await esimService.getESIMService({ emailAddress });
                    set((state) => ({
                        esimService: esims,
                        loading: { ...state.loading, esimService: false },
                    }))
                    return esims
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch esim service';
                    set((state) => ({
                        loading: { ...state.loading, esimService: false },
                        error: { ...state.error, esimService: errorMessage },
                    }));
                    throw error;
                }
            },


            fetchUserPlans: async (emailAddress: string) => {
                set((state) => ({
                    loading: { ...state.loading, userPlans: true },
                    error: { ...state.error, userPlans: null },
                }));

                try {
                    const plans = await esimService.getUserPlans({ emailAddress });
                    set((state) => ({
                        userPlans: plans,
                        loading: { ...state.loading, userPlans: false },
                    }));
                    return plans;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user plans';
                    set((state) => ({
                        loading: { ...state.loading, userPlans: false },
                        error: { ...state.error, userPlans: errorMessage },
                    }));
                    throw error;
                }
            },

            fetchDataHistory: async (emailAddress: string) => {
                set((state) => ({
                    loading: { ...state.loading, dataHistory: true },
                    error: { ...state.error, dataHistory: null },
                }));

                try {
                    const history = await esimService.getDataHistory({ emailAddress });
                    set((state) => ({
                        dataHistory: history,
                        loading: { ...state.loading, dataHistory: false },
                    }));
                    return history;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data history';
                    set((state) => ({
                        loading: { ...state.loading, dataHistory: false },
                        error: { ...state.error, dataHistory: errorMessage },
                    }));
                    throw error;
                }
            },

            resetErrors: () => {
                set((state) => ({
                    error: {
                        esimService: null,
                        // regions: null,
                        // products: null,
                        // productDetails: null,
                        userPlans: null,
                        dataHistory: null,
                    },
                }));
            },

            resetStore: () => {
                set(initialState);
            },
        }),
        { name: 'esim-store' }
    )
);