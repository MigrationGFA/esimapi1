import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface ESIMDataHistory {
  uid: string;
  name: string;
  dataQuotaMb: string;
  dataQuotaBytes: string;
  validityDays: number;
  amount: number;
  transactionId: string;
  date_created: string;
}

interface ESIMDataHistoryCardProps {
  data: ESIMDataHistory;
  icon?: React.ReactNode;
}

const ESIMDataHistoryCard: React.FC<ESIMDataHistoryCardProps> = ({
  data,
  icon,
}) => {
  // Format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = formatDate(data.date_created);

  // Default icon if none provided
  const defaultIcon = (
    <div className="bg-blue-100 p-3 rounded-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17H7C5.89543 17 5 16.1046 5 15V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V9"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 15L16.5 17.5L21 13"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
    <Card className="w-full border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {icon || defaultIcon}
            
            <div>
              <h3 className="font-medium text-gray-900">{data.name}</h3>
              <p className="text-sm text-gray-600">{data.dataQuotaMb} ({data.validityDays} days)</p>
              <p className="text-xs text-gray-500 mt-1">Transaction ID</p>
              <p className="text-xs text-gray-500">{data.transactionId}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-semibold text-gray-900">${data.amount.toFixed(2)}</p>
            <p className="text-xs text-green-500">completed</p>
            <p className="text-xs text-gray-500 mt-1">{date}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ESIMDataHistoryCard;