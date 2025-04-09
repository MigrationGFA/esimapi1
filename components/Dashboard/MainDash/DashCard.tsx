"use client";

import React from "react";
import Link from "next/link";
import { GetStarted } from "./GetStarted";

interface CardProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  image?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundColor = "bg-blue-800",
  textColor = "text-white",
  buttonColor = "bg-white",
  buttonTextColor = "text-blue-800",
  image,
  className,
}) => {
  const text = buttonText ?? "Default Text";
  return (
    <div
      className={`rounded-lg overflow-hidden ${backgroundColor} ${className} relative`}
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="p-6">
        <div className={`${textColor} max-w-[70%]`}>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {description && (
            <p className="mb-4 text-sm opacity-90">{description}</p>
          )}

          <GetStarted
            buttonColor={buttonColor}
            text={text}
            buttonTextColor={buttonTextColor}
          />
        </div>

        {image && <div className="absolute bottom-0 right-0">{image}</div>}
      </div>
    </div>
  );
};

export default Card;
