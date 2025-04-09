// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import OtpInput from "../ui/otp";

// // Schema for OTP verification
// const VerificationSchema = z.object({
//   otp: z.string().length(6, "Please enter all 6 digits")
// });

// type VerificationFormValues = z.infer<typeof VerificationSchema>;

// interface VerificationFormProps {
//   email?: string;
//   phone?: string;
//   onVerificationComplete?: (otp: string) => void;
//   className?: string;
//   redirectPath?: string;
//   isLoading?: boolean;
//   error?: string | null;
// }

// export default function VerificationForm({
//   email,
//   phone,
//   onVerificationComplete,
//   className,
//   redirectPath = "/login",
//   isLoading = false,
//   error = null
// }: VerificationFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [verificationError, setVerificationError] = useState<string | null>(null);
//   const router = useRouter();

//   const form = useForm<VerificationFormValues>({
//     resolver: zodResolver(VerificationSchema),
//     defaultValues: {
//       otp: ""
//     }
//   });

//   const destination = email || phone || "your contact information";
//   const isEmail = !!email;

//   const handleVerification = async (values: VerificationFormValues) => {
//     setIsSubmitting(true);
//     setVerificationError(null);

//     try {
//       if (onVerificationComplete) {
//         await onVerificationComplete(values.otp);
//       } else {
//         // Fallback to default behavior if no callback is provided
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         router.push(redirectPath);
//       }
//     } catch (error) {
//       console.error("Verification failed:", error);
//       setVerificationError("The verification code is invalid or has expired. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       // Replace with your actual resend OTP API
//       // await resendOtp({ email, phone });
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       console.log("OTP resent to:", {
//         email,
//         phone,
//         timestamp: new Date().toISOString()
//       });
      
//       return Promise.resolve();
//     } catch (error) {
//       console.error("Failed to resend OTP:", error);
//       return Promise.reject(error);
//     }
//   };

//   // Use external error if provided
//   const displayError = error || verificationError;

//   return (
//     <Form {...form}>
//       <form 
//         onSubmit={form.handleSubmit(handleVerification)}
//         className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
//       >
//         {displayError && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             {displayError}
//           </div>
//         )}

//         <OtpInput
//           length={6}
//           title="Verify your account"
//           subtitle={`We've sent a verification code to ${destination}`}
//           value={form.watch("otp")}
//           onChange={(otp) => form.setValue("otp", otp, { shouldValidate: true })}
//           disabled={isSubmitting || isLoading}
//           isLoading={isSubmitting || isLoading}
//           resendOtp={handleResendOtp}
//           autoFocus
//         />

//         <Button 
//           type="submit" 
//           className="w-full mt-4"
//           disabled={isSubmitting || isLoading || form.watch("otp").length !== 6}
//         >
//           {isSubmitting || isLoading ? "Verifying..." : "Verify"}
//         </Button>

//         <div className="text-center text-sm text-gray-500">
//           {isEmail ? 
//             "Please check your email inbox and spam folder if you don't see the code." : 
//             "Please check your phone for the SMS with your verification code."
//           }
//         </div>
//       </form>
//     </Form>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import OtpInput from "../ui/otp";
import { useAuthStore } from "@/store/authstore"; 
import { ApiError } from "@/services/test/api.test";

// Schema for OTP verification
const VerificationSchema = z.object({
  otp: z.string().length(6, "Please enter all 6 digits")
});

type VerificationFormValues = z.infer<typeof VerificationSchema>;

interface VerificationFormProps {
  email?: string;
  phone?: string;
  onVerificationComplete?: (otp: string) => void;
  className?: string;
  redirectPath?: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function VerificationForm({
  email,
  phone,
  onVerificationComplete,
  className,
  redirectPath = "/login",
  isLoading = false,
  error = null
}: VerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const router = useRouter();
  
  // Get email from auth store if not provided via props
  const { registrationEmail, verifyUserEmail, verificationError: storeError, clearErrors } = useAuthStore();
  const emailToUse = email || registrationEmail || "";

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      otp: ""
    }
  });

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  const destination = emailToUse || phone || "your contact information";
  const isEmail = !!emailToUse;

  const handleVerification = async (values: VerificationFormValues) => {
    if (!emailToUse && !onVerificationComplete) {
      setVerificationError("No email address found for verification");
      return;
    }

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      if (onVerificationComplete) {
        await onVerificationComplete(values.otp);
      } else if (emailToUse) {
        // Use the store's verify method if no callback provided
        const response = await verifyUserEmail({
          emailAddress: emailToUse,
          otp: values.otp
        });
        
        if (response.success) {
          router.push(redirectPath);
        } else {
          throw new Error("Verification failed");
        }
      }
    } catch (error) {
      console.error("Verification failed:", error);
      
      let errorMessage = "The verification code is invalid or has expired. Please try again.";
      
      // Handle API error format
      if (error && typeof error === 'object') {
        const apiError = error as ApiError;
        if (apiError.message) {
          errorMessage = apiError.message;
        }
      }
      
      setVerificationError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Replace with your actual resend OTP API
      // await resendOtp({ email: emailToUse, phone });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("OTP resent to:", {
        email: emailToUse,
        phone,
        timestamp: new Date().toISOString()
      });
      
      // Show success message
      setVerificationError("A new verification code has been sent");
      setTimeout(() => setVerificationError(null), 3000);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      
      let errorMessage = "Failed to resend verification code";
      
      // Handle API error format
      if (error && typeof error === 'object') {
        const apiError = error as ApiError;
        if (apiError.message) {
          errorMessage = apiError.message;
        }
      }
      
      setVerificationError(errorMessage);
      return Promise.reject(error);
    }
  };

  // Prioritize errors: props > local state > store
  const displayError = error || verificationError || storeError;

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleVerification)}
        className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-[#1428A0]">Verify your account</h1>
          <p className="text-balance text-gray-700">
            We've sent a verification code to {destination}
          </p>
        </div>

        {displayError && (
          <div className={cn(
            "px-4 py-3 rounded-md text-sm",
            displayError.includes("sent") 
              ? "bg-green-50 border border-green-200 text-green-700" 
              : "bg-red-50 border border-red-200 text-red-700"
          )}>
            {displayError}
          </div>
        )}

        <OtpInput
          length={6}
          value={form.watch("otp")}
          onChange={(otp) => form.setValue("otp", otp, { shouldValidate: true })}
          disabled={isSubmitting || isLoading}
          isLoading={isSubmitting || isLoading}
          resendOtp={handleResendOtp}
          autoFocus
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || isLoading || form.watch("otp").length !== 6}
        >
          {isSubmitting || isLoading ? "Verifying..." : "Verify"}
        </Button>

        <div className="text-center text-sm text-gray-500">
          {isEmail ? 
            "Please check your email inbox and spam folder if you don't see the verification code." : 
            "Please check your phone for the SMS with your verification code."
          }
        </div>
      </form>
    </Form>
  );
}