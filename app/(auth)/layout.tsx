import Link from "next/link";
import { ReactNode } from "react";
import apple from "@/public/apple.png";
import andriod from "@/public/andriod.png";
import Image from "next/image";
import { GalleryVerticalEnd } from "lucide-react";
import AuthLogo from "@/public/auth-logo.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid md:grid-cols-2 min-h-svh bg-[#FFFFFF] max-w-[1800px] mx-auto">
      {/* Left Side: Form Section */}

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            
            <Image src={AuthLogo} alt="Auth logo" width={15}/>
            
            ZigMobile.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white">{children}</div>
        </div>
      </div>

      {/* <div className="">{children}</div> */}

      {/* Right Side: Marketing Section */}
      <div className=" bg-[#2603C6] text-[#FAFAFA] items-center justify-center p-32 hidden md:flex">
        <div className="space-y-6">
          <h2 className="text-4xl leading-[60px] font-bold">
            Ready to try ZIG Mobile and change the way you stay connected?
          </h2>
          <p className="text-xl font-normal">
            Download the ZIG Mobile app to purchase, manage, and top up your
            eSIMs anytime, anywhere!
          </p>
          <div className="flex space-x-4">
            <Image src={apple} alt="apple" />
            <Image src={andriod} alt="andriod" />
          </div>
        </div>
      </div>
    </div>
  );
}
