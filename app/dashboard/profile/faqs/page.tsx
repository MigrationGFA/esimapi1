"use client";
import React, { useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { FiChevronDown, FiPlus, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface Question {
  id: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>("q1");

  const categories: Category[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <BsBellFill className="text-purple-700" size={24} />,
      bgColor: "bg-purple-100",
    },
    {
      id: "now-esim",
      title: "Now eSim",
      icon: <IoShieldCheckmarkSharp className="text-green-600" size={24} />,
      bgColor: "bg-green-100",
    },
    {
      id: "payment",
      title: "Payment Method",
      icon: <FaCreditCard className="text-orange-400" size={24} />,
      bgColor: "bg-orange-100",
    },
  ];

  const questions: Question[] = [
    {
      id: "q1",
      question: "How to create a account?",
      answer:
        "Open the Tradebase app to get started and follow the steps. Tradebase doesn't charge a fee to create or maintain your Tradebase account.",
    },
    {
      id: "q2",
      question: "How to add a payment method by this app?",
      answer:
        'To add a payment method, go to Settings > Payment Methods and tap "Add Payment Method". You can add credit/debit cards or connect your bank account securely.',
    },
    {
      id: "q3",
      question: "How to purchase your data plan?",
      answer:
        "Browse available data plans in the Marketplace section, select the plan that suits your needs, add it to cart, and complete the checkout process using your preferred payment method.",
    },
    {
      id: "q4",
      question: "How to activate your plan with ease?",
      answer:
        "Browse available data plans in the Marketplace section, select the plan that suits your needs, add it to cart, and complete the checkout process using your preferred payment method.",
    },
  ];

  const toggleQuestion = (id: string): void => {
    if (openQuestionId === id) {
      setOpenQuestionId(null);
    } else {
      setOpenQuestionId(id);
    }
  };

  return (
    <div>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> */}
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          <span>Go back</span>
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${category.bgColor} rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center mb-2">{category.icon}</div>
            <div>
              <p className="text-sm text-gray-600">Questions about</p>
              <h3 className="font-medium text-lg">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Top Questions Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Top Questions</h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-5 cursor-pointer"
                onClick={() => toggleQuestion(q.id)}
              >
                <h3 className="font-medium">{q.question}</h3>
                <div className="text-orange-500">
                  {openQuestionId === q.id ? (
                    <FiChevronDown size={20} />
                  ) : (
                    <FiPlus size={20} />
                  )}
                </div>
              </div>
              {openQuestionId === q.id && (
                <div className="p-5 pt-0 text-gray-600 border-t border-gray-100">
                  {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
