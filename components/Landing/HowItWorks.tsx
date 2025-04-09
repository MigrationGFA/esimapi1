import { howItWorsk } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import Refund from "@/public/refund.png";

export default function HowItWorks() {
  return (
    <section className="py-20 relative overflow-hidden" id="how-it-work">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-[768px] mx-auto text-center space-y-4">
          <h2 className="font-bold text-3xl md:text-4xl text-[#1428A0]">
            How ZIG Mobile Works
          </h2>
        </div>

        {/* How it works sections */}

        <div className="flex flex-col gap-6 mt-10">
          {howItWorsk.map((item, index) => (
            <div
              key={item.id}
              className="grid md:grid-cols-2 justify-between items-center space-y-4 gap-12 md:gap-32"
            >
              <div
                className={`${
                  index % 2 === 0 ? "order-2 md:order-1" : "order-2 md:order-2"
                } md:max-w-[500px]`}
              >
                <h3 className="text-lg md:text-2xl font-medium text-[#1428A0] leading-8">
                  {item.title}
                </h3>
                <p className="text-[#5A5555] text-base mt-3 leading-6 ">
                  {item.desc}
                </p>
              </div>
              <div
                className={`flex justify-center ${
                  index % 2 === 0 ? "order-1 md:order-2" : "order-1 md:order-1"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Image src={item.img} alt="image" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button className="bg-[#1428A0]  hover:bg-white hover:text-[#1428A0] font-normal border border-[#1428A0]">
            Get Started
          </Button>
        </div>

        <div className="bg-[#FF8732] mt-12 flex items-center justify-between p-6 rounded-lg md:flex-row flex-col">
          {/* Image on the left (or top on mobile) */}
          <div className="mb-4 md:mb-0">
            <Image
              src={Refund}
              alt="Refund policy illustration"
              //   width={100} // Adjust width as needed
              //   height={100} // Adjust height as needed
              className="object-contain"
            />
          </div>

          {/* Text content */}
          <div className="max-w-[600px] mr-auto text-center md:text-left">
            <h3 className="text-lg md:text-[32px] font-medium text-[#FAFAFA] leading-8">
              Change of plans? No problem at all!
            </h3>
            <p className="text-[#FAFAFA] text-base mt-3 leading-8">
              Purchase your Holafly eSIM with added peace of mind. You have up
              to&nbsp;6 months&nbsp;to request a refund.
            </p>
          </div>

          {/* Button */}
          <Button className="bg-[#1428A0] text-lg p-5 hover:bg-white hover:text-[#1428A0] font-normal border border-[#1428A0] mt-4 md:mt-0">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
