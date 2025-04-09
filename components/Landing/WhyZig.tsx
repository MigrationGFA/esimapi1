import { whyZig } from "@/constants";
import WhyZigCard from "./WhyZigCard";

export default function WhyZig() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#1428A00D]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-start space-y-4">
          <h2 className="font-bold text-3xl md:text-4xl text-[#1428A0]">
            Why ZIG Mobile
          </h2>
        </div>
        {/* Why Zig grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {whyZig.map((item, index) => (
            <WhyZigCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
