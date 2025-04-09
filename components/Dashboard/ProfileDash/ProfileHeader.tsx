"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  useCustomerStore, 
  useCustomerFullName, 
  useCustomerVerificationStatus,
  useIsActiveCustomer
} from "@/store/customStore";
import { useAuthStore } from "@/store/authstore";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Check, Edit } from "lucide-react";

// Avatar Component with improved styling and fallback handling
const AvatarWithInitials = ({ 
  firstName, 
  lastName,
  size = "large"
}: { 
  firstName?: string; 
  lastName?: string;
  size?: "small" | "medium" | "large"
}) => {
  // Get initials
  const firstInitial = firstName?.[0]?.toUpperCase() || '';
  const lastInitial = lastName?.[0]?.toUpperCase() || '';
  const initials = firstInitial && lastInitial 
    ? `${firstInitial}${lastInitial}` 
    : firstInitial || 'U';

  // Size classes
  const sizeClasses = {
    small: "w-10 h-10 text-lg",
    medium: "w-14 h-14 text-xl",
    large: "w-20 h-20 text-2xl"
  };

  // Generate consistent color based on initials
  const getColorFromInitial = (initial: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    
    // If no initial, return a default color
    if (!initial) return 'bg-gray-400';
    
    const charCode = initial.charCodeAt(0);
    const colorIndex = charCode % colors.length;
    return colors[colorIndex];
  };

  const bgColor = getColorFromInitial(firstInitial || lastInitial);

  return (
    <div className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${bgColor} text-white font-semibold shadow-sm`}>
      {initials}
    </div>
  );
};

// Verification Badge Component
const VerificationBadge = ({ isVerified }: { isVerified: boolean }) => {
  return isVerified ? (
    <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
      <Check size={16} />
      <span>Verified</span>
    </div>
  ) : (
    <div className="flex items-center gap-1 text-sm text-amber-600 font-medium">
      <AlertCircle size={16} />
      <span>Unverified</span>
    </div>
  );
};

export default function ProfileHeader() {
  const [showError, setShowError] = useState(false);
  const { loggedInEmail } = useAuthStore();
  const { customer, isLoading, error, fetchCustomer, clearError } = useCustomerStore();
  const fullName = useCustomerFullName();
  const isVerified = useCustomerVerificationStatus();
  const isActive = useIsActiveCustomer();

  useEffect(() => {
    if (loggedInEmail) {
      fetchCustomer(loggedInEmail).catch(() => {
        setShowError(true);
      });
    }
    
    // Clean up error on unmount
    return () => {
      clearError();
    };
  }, [loggedInEmail, fetchCustomer, clearError]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-5 p-6 bg-white rounded-lg shadow-sm">
        <Skeleton className="rounded-full w-20 h-20" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-24 mt-2" />
        </div>
      </div>
    );
  }

  if (showError || error) {
    return (
      <div className="flex items-center gap-4 p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <AlertCircle className="h-8 w-8" />
        <div>
          <h2 className="font-medium">Failed to load profile</h2>
          <p className="text-sm">{error || "Could not fetch user information"}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setShowError(false);
              clearError();
              if (loggedInEmail) {
                fetchCustomer(loggedInEmail);
              }
            }}
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-6 bg-white rounded-lg shadow-sm">
      <AvatarWithInitials 
        firstName={customer?.firstName} 
        lastName={customer?.lastName} 
      />
      
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{fullName || "User Name"}</h2>
        <p className="text-gray-600">{loggedInEmail}</p>
        
        {/* {customer && (
          <VerificationBadge isVerified={isVerified} />
        )} */}
        
        <div className="flex gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <Link href={customer?.customerId ? `/dashboard/profile/${customer.customerId}` : '#'}>
              <Edit size={16} />
              <span>Edit Profile</span>
            </Link>
          </Button>
          
          {!isVerified && (
            <Button 
              variant="default" 
              size="sm"
              asChild
            >
              <Link href="/verify-email">
                Verify Email
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      {!isActive && customer && (
        <div className="mt-3 sm:mt-0 sm:ml-auto bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm">
          Account Inactive
        </div>
      )}
    </div>
  );
}