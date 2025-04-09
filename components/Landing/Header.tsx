"use client";

import { navigation, siteConfig } from "@/constants";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex  border-b-2 bg-white">
      <nav className="max-w-7xl flex items-center w-full mx-auto px-4 lg:px-10 py-6 ">
        {/* Desktop nav */}
        <div className="hidden w-full items-center justify-between md:flex">
          <Link href="/">
            <Image src={siteConfig.global.logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-4">
            <Nav items={navigation} />
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button className="bg-white text-[#1428A0] border border-[#1428A0] hover:text-white hover:bg-[#1428A0]">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#1428A0]  hover:bg-white hover:text-[#1428A0] border border-[#1428A0]">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile Nav */}
        <div className="flex w-full  justify-between items-center gap-4 md:hidden">
          <Link href="/">
            <Image src={siteConfig.global.logo} alt="logo" className="w-28" />
          </Link>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <MenuIcon className="size-8" />
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col px-4 py-6">
                <Nav
                  items={navigation}
                  direction="col"
                  onNavItemClick={handleDrawerClose}
                />
              </div>
              <div className="flex items-center justify-center mb-4 gap-4">
                <Link href="/login">
                  <Button className="bg-white text-[#1428A0] border border-[#1428A0] hover:text-white hover:bg-[#1428A0]">
                    Log In
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-[#1428A0]  hover:bg-white hover:text-[#1428A0] border border-[#1428A0]">
                    Sign up
                  </Button>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      {/* <nav>My nav</nav>
      <Button>Drawer</Button> */}
    </header>
  );
};

export default Header;

interface NavItem {
  name: string;
  url?: string;
}

interface NavProps {
  items: NavItem[];
  direction?: "col" | "row";
  onNavItemClick?: () => void;
}

const Nav = (props: NavProps) => {
  const { items, direction = "row", onNavItemClick } = props;
  // const pathname = useLocation().pathname;

  return (
    <nav
      className={cn("flex items-center gap-0 sm:gap-2", {
        "flex-col gap-2 ": direction === "col",
      })}
    >
      {items.map(
        (item, index) =>
          item.url && (
            <a
              className="flex items-center justify-center gap-2 rounded px-4 py-1 text-sm font-medium text-[#1428A0] transition-colors"
              href={item.url}
              key={index}
              onClick={onNavItemClick}
            >
              {item.url === "/" && (
                //   <img
                //     src={siteConfig.global.logo}
                //     alt={siteConfig.global.name}
                //     loading="lazy"
                //     width={24}
                //     height={24}
                //   />
                <Image src={siteConfig.global.logo} alt="logo" />
              )}
              <span>{item.name}</span>
            </a>
          )
      )}
    </nav>
  );
};
