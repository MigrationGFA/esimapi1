// Define strong types for your domain entities
export interface ESIMService {
    uid: string
    iccid: string
    activation_code: string
    manual_code: string
    smdp_address: string
    state: string
    service_status: string
    network_status: string
    tag: string
    date_assigned: string
}

export interface ESIMProduct {
    uid: string
    name: string
    countries_enabled: string[]
    data_quota_mb: number
    data_quota_bytes: number
    validity_days: number
    policy_id: number
    policy_name: string
    wholesale_price_usd: string
    rrp_usd: string
    rrp_eur: string
    rrp_gbp: string
    rrp_cad: string
    rrp_aud: string
    rrp_jpy: string
}


export interface UserPlans {
    iccid: string
    plan_id: string
    plan_name: string
    data_quota_mb: string
    validity_days: number
    countries_enabled: string[]
    network_status: string
    start_time: string
    date_activated: string
    end_time: string
}

export interface ESIMDataPlan {
    iccid: string
    plan_id: string
    plan_name: string
    data_quota_mb: string
    validity_days: number
    countries_enabled: string[]
    network_status: string
    start_time: string
    date_activated: string
    end_time: string
}

export interface ESIMDataHistory {
    uid: string
    name: string
    dataQuotaMb: string
    dataQuotaBytes: string
    validityDays: number
    amount: number
    transactionId: string
    date_created: string
}

export interface RegionInfo {
    tag: string
    name: string
    flag: string
}

// Request parameter interfaces for type safety
export interface ProductsQueryParams {
    region?: string;
    countryCode?: string;
}

export interface ProductsByValidityQueryParams extends ProductsQueryParams {
    validity?: number;
}

export interface EmailQueryParams {
    emailAddress: string | null;
}


interface BaseResponse {
    success?: boolean;
    message?: string;
    statusCode?: number;
}

export interface RegionApiResponse<T> extends BaseResponse {
    regions?: T;
}

export interface ProductApiResponse<T> extends BaseResponse {
    products?: T;
    product?: T
}

export interface ESIMDataPlanResponse<T> extends BaseResponse {
    plans?: T

}
export interface ESIMServiceResponse<T> extends BaseResponse {
    esims?: T
}

export interface ESIMDataHistoryResponse<T> extends BaseResponse {
    history?: T
}