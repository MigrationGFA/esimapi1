import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  value?: string;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  resendOtp?: () => Promise<void>;
  title?: string;
  subtitle?: string;
  className?: string;
  autoFocus?: boolean;
}

const OtpInput = ({
  length = 6,
  onComplete,
  value = "",
  onChange,
  disabled = false,
  isLoading = false,
  resendOtp,
  title = "Enter verification code",
  subtitle = "We've sent a verification code to your email",
  className,
  autoFocus = true,
}: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(
    value.split("").length > 0 ? value.split("") : Array(length).fill("")
  );
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null)
  );
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Set focus on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Handle countdown for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Handle external value changes
  useEffect(() => {
    if (value) {
      const valueArray = value.split("").slice(0, length);
      setOtp([...valueArray, ...Array(length - valueArray.length).fill("")]);
    }
  }, [value, length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;

    // Only accept single digit
    if (val.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Call onChange prop
    const otpString = newOtp.join("");
    if (onChange) onChange(otpString);

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }

    // Call onComplete when all digits are filled
    if (otpString.length === length && onComplete && !otpString.includes("")) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace when current is empty
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Only process if we have numeric data
    if (!/^\d+$/.test(pastedData)) return;

    const pastedArray = pastedData.split("").slice(0, length);
    const newOtp = [...Array(length).fill("")];

    pastedArray.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });

    setOtp(newOtp);

    // Call onChange prop
    const otpString = newOtp.join("");
    if (onChange) onChange(otpString);

    // Call onComplete if full length
    if (pastedArray.length === length && onComplete) {
      onComplete(otpString);
    }

    // Focus last filled input or first empty one
    const focusIndex = Math.min(pastedArray.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
    setActiveInput(focusIndex);
  };

  const handleResendOtp = async () => {
    if (resendOtp && resendCountdown === 0) {
      setIsResending(true);
      try {
        await resendOtp();
        setResendCountdown(60); // 60 second countdown
        console.log("OTP resend initiated");
      } catch (error) {
        console.error("Failed to resend OTP:", error);
      } finally {
        setIsResending(false);
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div className="flex flex-col items-center mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#1428A0] mb-2">{title}</h2>
        <p className="text-[#151314] text-sm">{subtitle}</p>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            pattern="[0-9]"
            // ref={(el) => (inputRefs.current[index] = el)}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={disabled || isLoading}
            className={cn(
              "w-12 h-12 text-center text-lg font-bold",
              activeInput === index && "border-[#1428A0]"
            )}
            aria-label={`Digit ${index + 1} of OTP`}
          />
        ))}
      </div>

      {resendOtp && (
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            onClick={handleResendOtp}
            disabled={resendCountdown > 0 || isResending || disabled}
            className="text-sm text-[#1428A0] font-semibold"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : resendCountdown > 0 ? (
              `Resend code in ${resendCountdown}s`
            ) : (
              "Resend code"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OtpInput;
