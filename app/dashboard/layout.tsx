"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import Banner from "@/public/Dashboard/Banner.png";
import {
  HomeIcon,
  EsimIcon,
  PlansIcon,
  ProfileIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/Dashboard/icons";
import Image from "next/image";
import { useAuthStore } from "@/store/authstore";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    // Specific handling for dashboard to prevent it from being active for all routes
    if (href === "/dashboard") return false;

    // Check if current path starts with the base route
    // This handles nested routes like /dashboard/profile/:customerId
    return pathname.startsWith(href + "/") || pathname === href;
  };

  // Navigation items for the sidebar
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
    { name: "eSIM", href: "/dashboard/esim", icon: <EsimIcon /> },
    { name: "My Plans", href: "/dashboard/plan", icon: <PlansIcon /> },
    { name: "Profile", href: "/dashboard/profile", icon: <ProfileIcon /> },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getPageTitle = () => {
    const titleMap: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/dashboard/esim": "eSIM Management",
      "/dashboard/plan": "Subscription Plans",
      "/dashboard/profile": "User Profile",
      "/dashboard/profile/:customerId": "Edit Profile",
      "/dashboard/plan/details": "Plan Details",
      "/dashboard/esim/details": "eSIM Details",
    };

    // Check for exact match first
    if (titleMap[pathname]) return titleMap[pathname];

    // Handle nested routes
    for (const [route, title] of Object.entries(titleMap)) {
      if (pathname.startsWith(route)) return title;
    }

    return "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 max-w-[1800px] mx-auto">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar for Desktop and Mobile */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-80 
          transform transition-transform duration-300 
          lg:relative lg:translate-x-0
          bg-white
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Close Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden absolute top-4 right-4 z-50"
          >
            <CloseIcon />
          </button>

          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Image src={Banner} alt="ZIG Mobile" className="w-full" />
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMobileMenu}
                className={`flex items-center p-2 rounded-md ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="transition-opacity duration-300 opacity-100">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="text-blue-700 cursor-pointer hover:underline flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Responsive Header */}
        <div className="bg-white p-4 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="lg:hidden mr-4">
            <MenuIcon />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white p-4 sm:p-6 min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
