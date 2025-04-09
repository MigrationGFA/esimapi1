import heroImg from "@/public/hero.png";
import apple from "@/public/apple.png";
import andriod from "@/public/andriod.png";
import Image from "next/image";

import { Button } from "../ui/button";

export default function Hero() {
  return (
    //   <section >
    <section className="relative" id="home">
      <div className="relative flex items-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-20 grid md:grid-cols-2 gap-10 items-center justify-between">
          {/* text-content */}
          <div className="flex flex-col space-y-6">
            <h1 className="font-bold text-3xl md:text-6xl text-[#1428A0] md:leading-[89px]">
              Stay <span className="text-[#FF8732]">connected,</span> wherever
              you travel, at affordable rates
            </h1>
            <p className="leading-8 text-[#433E3F] max-w-[500px]">
              With ZIG Mobile, enjoy internet connection on every adventure and
              forget about expensive roaming bills upon your return.
            </p>

            <div>
              <Button className="bg-[#1428A0]  hover:bg-white hover:text-[#1428A0] font-normal border border-[#1428A0]">
                Find Out More
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Image src={apple} alt="apple" />
              <Image src={andriod} alt="andriod" />
            </div>
          </div>
          {/* Imgae content */}
          <div className="space-y-6 flex">
            <Image src={heroImg} alt="hero" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
