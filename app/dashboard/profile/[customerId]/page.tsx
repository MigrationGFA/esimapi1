"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authstore";
import { useCustomerStore } from "@/store/customStore"; // Fixed import path
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast"; // Assuming toast component exists

// Enhanced Zod schema with more comprehensive validation
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[A-Za-z\s'-]+$/, { message: "Invalid characters in first name" })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[A-Za-z\s'-]+$/, { message: "Invalid characters in last name" })
    .optional(),
  countryOfResidence: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." })
    .max(100, { message: "Country name too long." })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { loggedInEmail } = useAuthStore();
  const { 
    customer, 
    fetchCustomer, 
    updateCustomer, // Use correct function name from store
    isLoading: storeLoading, 
    error 
  } = useCustomerStore();

  // Initialize form with safe defaults
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryOfResidence: '',
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  // Load customer data when component mounts
  useEffect(() => {
    async function loadCustomerData() {
      if (!loggedInEmail) {
        router.push('/login'); // Redirect if no email
        return;
      }

      try {
        setIsLoading(true);
        await fetchCustomer(loggedInEmail);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadCustomerData();
  }, [loggedInEmail, fetchCustomer, router]);

  // Update form when customer data is loaded
  useEffect(() => {
    if (customer) {
      form.reset({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        countryOfResidence: customer.countryOfResidence || '',
      });
    }
  }, [customer, form]);

  // Form submit handler with comprehensive error handling
  const onSubmit = async (values: FormValues) => {
    if (!customer?.customerId) {
      toast({
        title: "Error",
        description: "Customer ID not found",
        variant: "destructive",
      });
      return;
    }

    try {
      // Only submit fields that have changed
      const dirtyFields = form.formState.dirtyFields;
      const changedData: Partial<FormValues> = {};
      
      Object.keys(dirtyFields).forEach(key => {
        const fieldKey = key as keyof FormValues;
        if (dirtyFields[fieldKey]) {
          changedData[fieldKey] = values[fieldKey];
        }
      });
      
      // Don't submit if no changes
      if (Object.keys(changedData).length === 0) {
        router.push('/dashboard/profile');
        return;
      }
      
      await updateCustomer(customer.customerId, changedData);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      router.push('/dashboard/profile');
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to update profile";
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (isLoading || storeLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading profile data...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
        <h3 className="font-semibold mb-2">Error Loading Profile</h3>
        <p>{error}</p>
        <Button 
          onClick={() => router.push('/dashboard')} 
          className="mt-4"
          variant="outline"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter first name" 
                    {...field} 
                    disabled={form.formState.isSubmitting}
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
                    placeholder="Enter last name" 
                    {...field}
                    disabled={form.formState.isSubmitting}
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
                    placeholder="Enter country" 
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="w-1/2" 
              onClick={() => router.push('/dashboard/profile')}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-1/2" 
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}