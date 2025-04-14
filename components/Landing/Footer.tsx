// import { navigation, siteConfig } from "@/constants";
// import Link from "next/link";
// import Image from "next/image";
// export default function Footer() {
//   return (
//     <footer className="py-20 relative overflow-hidden">
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
//         <div>
//           <Link href="/">
//             <Image src={siteConfig.global.logo} alt="logo" />
//           </Link>
//         </div>
//         <div></div>
//         <div></div>
//       </div>
//     </footer>
//   );
// }

import { navigation, siteConfig } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="py-20 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between">
          {/* Left column with logo and contact info */}
          <div className="space-y-6">
            <Link href="/">
              {/* <Image
                src={siteConfig.global.logo}
                alt="logo"
                width={200}
                height={40}
              /> */}
              <Image src={siteConfig.global.logo} alt="logo" />
            </Link>
            <div className="space-y-2 mt-6">
              <p className="text-gray-800">+1 (7635) 547-12-97</p>
              <p className="text-gray-800">support@NowEsim.com</p>
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="font-medium text-lg mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-orange-500"
                >
                  Product
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-orange-500"
                >
                  Information
                </Link>
              </div>
              <div className="space-y-4">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-orange-500"
                >
                  Company
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-orange-500"
                >
                  ZIG Media
                </Link>
              </div>
            </div>
          </div>

          {/* Empty spacing column */}
          {/* <div></div> */}

          {/* Subscribe column */}
          <div>
            <h3 className="font-medium text-lg mb-6">Subscribe</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Get product updates"
                className="flex-grow py-3 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600">
                <MdArrowForward size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-10 md:mb-0">
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <FaLinkedinIn className="text-gray-700" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <FaFacebookF className="text-gray-700" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <FaTwitter className="text-gray-700" />
            </Link>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-600">A product of</span>
            <Image
              src={siteConfig.global.logo}
              alt="ZIG Mobile"
              width={150}
              height={30}
              className="ml-2"
            />
          </div>
          <div className="text-gray-600">
            © 2025 ZigMobile. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
