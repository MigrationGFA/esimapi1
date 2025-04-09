import Image from "next/image";
import cta from "@/public/CTAImg.png";
import apple from "@/public/apple.png";
import andriod from "@/public/andriod.png";

// Pay icons
import master from "@/public/payment/master.png";
import paySafe from "@/public/payment/paySafe.png";
import visa from "@/public/payment/visa.png";
import googlePay from "@/public/payment/googlePay.png";
import applePay from "@/public/payment/applePay.png";
import payPal from "@/public/payment/paypal.png";

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-center justify-between">
          <div className="flex flex-col space-y-6">
            <h2 className="font-bold text-3xl md:text-4xl text-[#1428A0] ">
              Ready to try ZIG Mobile and change the way you stay connected?
            </h2>
            <p className="text-[#5A5555]  mt-3 leading-6">
              Download the ZIG Mobile app to purchase, manage, and top up your
              eSIMs anytime, anywhere!
            </p>
            <div className="flex items-center gap-4">
              <Image src={apple} alt="apple" />
              <Image src={andriod} alt="andriod" />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Image src={cta} alt="CTA" />
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-8 mt-20">
          <Image src={paySafe} alt="playSafe" />
          <Image src={visa} alt="visa" />
          <Image src={master} alt="master" />
          <Image src={googlePay} alt="googlePay" />
          <Image src={payPal} alt="payPal" />
          <Image src={applePay} alt="applePay" />
        </div>
      </div>
    </section>
  );
}
