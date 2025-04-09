// // AuthProvider.tsx

// "use client";

// import {
//   createContext,
//   useContext,
//   ReactNode,
//   useEffect,
//   useState,
// } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useAuthStore } from "@/store/authstore";

// // Create context
// const AuthContext = createContext<{
//   isAuthenticated: boolean;
//   loading: boolean;
// }>({
//   isAuthenticated: false,
//   loading: true,
// });

// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { isAuthenticated, loading, checkAuth } = useAuthStore();
//   const [mounted, setMounted] = useState(false);

//   // Check authentication on mount
//   useEffect(() => {
//     checkAuth();
//     setMounted(true);
//   }, [checkAuth]);

//   // Handle redirects
//   useEffect(() => {
//     // if (mounted && !loading && !isAuthenticated) {
//     if (mounted && !loading) {
//       const isProtectedRoute =
//         pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile");

//       // if (isProtectedRoute) {
//       if (isProtectedRoute && !isAuthenticated) {
//         // Save the current path for redirect after login
//         sessionStorage.setItem("redirectAfterLogin", pathname || "/dashboard");
//         router.replace("/login");
//       } else if (isAuthenticated && pathname === "/login") {
//         // After login, redirect to saved path or dashboard
//         const callbackUrl = searchParams.get("callbackUrl");
//         const redirectPath = callbackUrl
//           ? decodeURIComponent(callbackUrl)
//           : sessionStorage.getItem("redirectAfterLogin") || "/dashboard";

//         router.replace(redirectPath);
//         sessionStorage.removeItem("redirectAfterLogin");
//       }
//     }
//   }, [isAuthenticated, loading, pathname, router, mounted, searchParams]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  Suspense,
} from "react";
import { 
  useRouter, 
  usePathname, 
  useSearchParams 
} from "next/navigation";
import { useAuthStore } from "@/store/authstore";

// Separate component for search params logic
function AuthRedirectHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
    setMounted(true);
  }, [checkAuth]);

  // Handle redirects
  useEffect(() => {
    if (mounted && !loading) {
      const isProtectedRoute =
        pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile");

      if (isProtectedRoute && !isAuthenticated) {
        // Save the current path for redirect after login
        sessionStorage.setItem("redirectAfterLogin", pathname || "/dashboard");
        router.replace("/login");
      } else if (isAuthenticated && pathname === "/login") {
        // After login, redirect to saved path or dashboard
        const callbackUrl = searchParams.get("callbackUrl");
        const redirectPath = callbackUrl
          ? decodeURIComponent(callbackUrl)
          : sessionStorage.getItem("redirectAfterLogin") || "/dashboard";

        router.replace(redirectPath);
        sessionStorage.removeItem("redirectAfterLogin");
      }
    }
  }, [isAuthenticated, loading, pathname, router, mounted, searchParams]);

  return null;
}

// Create context
const AuthContext = createContext<{
  isAuthenticated: boolean;
  loading: boolean;
}>({
  isAuthenticated: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuthStore();

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      <Suspense fallback={null}>
        <AuthRedirectHandler />
      </Suspense>
      {children}
    </AuthContext.Provider>
  );
}

// // Wrapper component for pages using search params
// export function SearchParamsWrapper({ 
//   children 
// }: { 
//   children: React.ReactNode 
// }) {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       {children}
//     </Suspense>
//   );
// }