"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import ProfileHeader from "@/components/Dashboard/ProfileDash/ProfileHeader";

export default function Profile() {
  return (
    <>
      <div>
        <ProfileHeader />

        {/* Profile sections would continue here */}
        <div className="space-y-4 mt-3">
          {/* Security Section */}
          <div className="divide-y border-b">
            <h3 className="text-2xl font-base text-[#1428A080] mb-2">
              Security
            </h3>
            <div className="rounded-lg divide-y ">
              <Link
                href="/update-password"
                className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-xl"
              >
                <span>Update Password</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              {/* <Link
                href="/delete-account"
                className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-xl"
              >
                <span className="text-red-500">Delete Account</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link> */}
            </div>
          </div>
          {/* Help & Feedback Section */}
          <div className="divide-y border-b">
            <h3 className="text-2xl font-base text-[#1428A080] mb-2">
              Help & Feedback
            </h3>
            <div className="rounded-lg divide-y ">
              <Link
                href="/faqs"
                className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-xl"
              >
                <span>FAQs</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/privacy-policy"
                className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-xl"
              >
                <span>Privacy Policy</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/terms-of-service"
                className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-xl"
              >
                <span>Terms of Service</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
