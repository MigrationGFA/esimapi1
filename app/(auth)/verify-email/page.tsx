"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import VerificationForm from "@/components/Auth/VerificationForm";
import { useAuthStore } from "@/store/authstore";

export default function VerifyEmailPage() {
  const {
    registrationEmail,
    verifyUserEmail,
    verificationLoading,
    verificationError,
  } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If no email is stored in the auth store, redirect to registration
    if (!registrationEmail) {
      router.replace("/register");
    }
  }, [registrationEmail, router]);

  const handleVerificationComplete = async (otp: string) => {
    try {
      if (registrationEmail) {
        await verifyUserEmail({ emailAddress: registrationEmail, otp });
        router.push("/login");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <VerificationForm
        email={registrationEmail || ""}
        onVerificationComplete={handleVerificationComplete}
        isLoading={verificationLoading}
        error={verificationError}
      />
    </div>
  );
}
