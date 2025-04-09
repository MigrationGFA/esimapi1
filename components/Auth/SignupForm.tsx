// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import PhoneNumberInput from "./PhoneNumberInput";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { useForm } from "react-hook-form";
// import { RegisterSchema } from "@/schema";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuthStore } from "@/store/authstore";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// // Define the type for form values
// type RegisterFormValues = z.infer<typeof RegisterSchema>;

// export default function SignupForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formError, setFormError] = useState<string | null>(null);

//   const { setRegistrationEmail, register, registrationError } = useAuthStore();

//   const router = useRouter();

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       emailAddress: "",
//       password: "",
//       phoneNumber: "",
//       countryOfResidence: "",
//     },
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     try {
//       setIsSubmitting(true);
//       setFormError(null);

//       // console.log("Form  to be submitted:", data);
//       await register(data);
//       setRegistrationEmail(data.emailAddress);

//       router.push("/verify-email");
//     } catch (error) {
//       console.error("Registration error:", error);
//       let errorMessage = "Registration failed. Please try again.";

//       if (typeof error === "object" && error !== null && "detail" in error) {
//         errorMessage = (error as { detail: string }).detail;
//       }

//       setFormError(errorMessage );
//       // Handle errors appropriately
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={cn("flex flex-col gap-6", className)}
//         {...props}
//       >
//         <div className="flex flex-col items-center gap-2 text-center">
//           <h1 className="text-4xl text-[#1428A0] font-bold">
//             Create an account
//           </h1>
//           <p className="text-balance text-[#151314] text-lg">
//             Welcome to <span className="text-[#1428A0]">ZIG Mobile</span> Please
//             to set up your account, enter your full name.
//           </p>
//         </div>

//         {/* Display form error if present */}
//         {formError && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//             {formError}
//           </div>
//         )}
//         <div className="grid gap-6">
//           <FormField
//             control={form.control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Emmanuel"
//                     {...field}
//                     disabled={isSubmitting}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Kelvin"
//                     {...field}
//                     disabled={isSubmitting}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="emailAddress"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="johndoe@gmail.com"
//                     {...field}
//                     disabled={isSubmitting}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="phoneNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <PhoneNumberInput
//                     value={field.value}
//                     onChange={field.onChange}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="countryOfResidence"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Country of Residence</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Nigeria"
//                     {...field}
//                     disabled={isSubmitting}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="***************"
//                     {...field}
//                     disabled={isSubmitting}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Signing up..." : "Sign Up"}
//           </Button>
//         </div>
//         <div className="text-center text-sm">
//           Already have an account{" "}
//           <Link href="/login" className="text-[#1428A0] font-bold">
//             Login
//           </Link>
//         </div>
//       </form>
//     </Form>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import PhoneNumberInput from "./PhoneNumberInput";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/authstore";
import { ApiError } from "@/services/test/api.test";

// Define the type for form values
type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { 
    setRegistrationEmail, 
    register, 
    registrationError,
    registrationLoading,
    clearErrors 
  } = useAuthStore();

  const router = useRouter();

  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      countryOfResidence: "",
    },
  });

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      // Call register from auth store
      const response = await register(data);
      
      if (response.success) {
        // Store the email for the verification page
        setRegistrationEmail(data.emailAddress);
        router.push("/verify-email");
      } else {
        // Handle unsuccessful registration
        setFormError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      // Handle standardized API error format
      if (error && typeof error === 'object') {
        const apiError = error as ApiError;
        if (apiError.message) {
          errorMessage = apiError.message;
        }
        
        // Handle field-specific errors if available
        if (apiError.errors) {
          const firstErrorField = Object.keys(apiError.errors)[0];
          if (firstErrorField && apiError.errors[firstErrorField].length > 0) {
            const fieldError = apiError.errors[firstErrorField][0];
            form.setError(firstErrorField as any, { 
              type: "manual", 
              message: fieldError 
            });
          }
        }
      }
      
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use either local or store error
  const displayError = formError || registrationError;
  const isLoading = isSubmitting || registrationLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl text-[#1428A0] font-bold">
            Create an account
          </h1>
          <p className="text-balance text-[#151314] text-lg">
            Welcome to <span className="text-[#1428A0]">ZIG Mobile</span> Please
            set up your account by entering your details.
          </p>
        </div>

        {/* Display form error if present */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <span>{displayError}</span>
          </div>
        )}
        
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Emmanuel"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Kelvin"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    value={field.value}
                    onChange={field.onChange}
                    // disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOfResidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Residence</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nigeria"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="***************"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1428A0] font-semibold hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}