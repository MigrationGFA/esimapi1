import Image from "next/image";
import { StaticImageData } from "next/image";

interface WhyZigContent {
  title: string;
  desc: string;
  img: StaticImageData;
}

interface WhyZigCardProps {
  item: WhyZigContent;
}

export default function WhyZigCard({ item }: WhyZigCardProps) {
  return (
    <div className="p-10 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <div>
        <Image src={item.img} alt="image" />
      </div>
      <h3 className="text-lg md:text-2xl font-medium text-[#1428A0] leading-8">
        {item.title}
      </h3>
      <p className="text-[#5A5555] text-base mt-3 leading-6 ">{item.desc}</p>
    </div>
  );
}
