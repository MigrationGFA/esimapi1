import { navigation, siteConfig } from "@/constants";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="py-20 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div>
          <Link href="/">
            <Image src={siteConfig.global.logo} alt="logo" />
          </Link>
        </div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
}
