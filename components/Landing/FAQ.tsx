"use client";

import { faqs } from "@/constants";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle FAQ visibility
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="py-20 relative overflow-hidden bg-[#1428A00D]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-[768px] mx-auto text-center space-y-4">
          <h2 className="font-bold text-3xl md:text-4xl text-[#1428A0]">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="leading-8 text-[#433E3F] ">
            Find helpful information to answer your questions
          </p>
        </div>

        {/* faqs item */}
        <div className="max-w-[1000px] mx-auto space-y-4 mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=" rounded-lg shadow-sm overflow-hidden border border-[#26323833]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 text-left text-gray-800 font-medium flex items-center justify-between border-b-0 rounded-b-none  rounded-lg focus:outline-none"
              >
                {faq.question}

                <span
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  } p-2 bg-[#1428A0] text-white rounded-full`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-600 leading-6">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
