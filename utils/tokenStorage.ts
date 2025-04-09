// // TokenStorage.ts
// const ACCESS_TOKEN = 'accessToken';
// const REFRESH_TOKEN = 'refreshToken';

// // Access token functions
// export const setAccessToken = (token: string) => {
//     localStorage.setItem(ACCESS_TOKEN, token);
// }

// export const getAccessToken = (): string | null => {
//     return localStorage.getItem(ACCESS_TOKEN);
// }

// // Refresh token functions
// export const setRefreshToken = (token: string) => {
//     localStorage.setItem(REFRESH_TOKEN, token);
// }

// export const getRefreshToken = (): string | null => {
//     return localStorage.getItem(REFRESH_TOKEN);
// }

// // Clear all tokens
// export const removeTokens = () => {
//     localStorage.removeItem(ACCESS_TOKEN);
//     localStorage.removeItem(REFRESH_TOKEN);
// }

// // For backward compatibility
// export const removeAccessToken = removeTokens;


import Cookies from "js-cookie"

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';


// Access token function
export const setAccessToken = (token: string) => {
    // set to both cookie and localstorage 
    Cookies.set(ACCESS_TOKEN, token, {
        expires: 7,
        path: "/"
    })

    localStorage.setItem(ACCESS_TOKEN, token)
}

export const getAccessToken = (): string | null => {
    return Cookies.get(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN)
}

// Refresh token function
export const setRefreshToken = (token: string) => {
    // set to both cookie and localstorage 
    Cookies.set(REFRESH_TOKEN, token, {
        expires: 30,
        path: "/"
    })

    localStorage.setItem(REFRESH_TOKEN, token)
}

export const getRefreshToken = (): string | null => {
    return Cookies.get(REFRESH_TOKEN) || localStorage.getItem(REFRESH_TOKEN)
}

// Clear all tokens
export const removeTokens = () => {
    Cookies.remove(ACCESS_TOKEN, { path: '/' });
    Cookies.remove(REFRESH_TOKEN, { path: '/' });
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

export const removeAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN, { path: '/' });
    localStorage.removeItem(ACCESS_TOKEN);
}