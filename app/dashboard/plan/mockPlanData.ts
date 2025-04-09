// mockPlanData.ts

export interface PlanData {
    id: string;
    name: string;
    dataTotal: number;
    dataUsed: number;
    status: 'Active' | 'Expired';
    validityDays: number;
    country: string;
    countryCode: string; // For flag selection
    purchaseDate: string;
    expiryDate: string;
    unit: 'GB' | 'MB';
}

export interface Transaction {
    id: string;
    type: string;
    source: string;
    amount: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    date: string;
    time: string;
    category?: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
    description?: string;
    recipientName?: string;
    recipientAccount?: string;
}

export const mockPlans: PlanData[] = [
    {
        id: "plan-001",
        name: "Fra",
        dataTotal: 10,
        dataUsed: 5.3,
        status: "Active",
        validityDays: 30,
        country: "France",
        countryCode: "FR",
        purchaseDate: "2025-02-03",
        expiryDate: "2025-03-05",
        unit: "GB"
    },
    {
        id: "plan-002",
        name: "Esp",
        dataTotal: 5,
        dataUsed: 3.8,
        status: "Active",
        validityDays: 20,
        country: "Spain",
        countryCode: "ES",
        purchaseDate: "2025-02-10",
        expiryDate: "2025-03-02",
        unit: "GB"
    },
    {
        id: "plan-003",
        name: "Ita",
        dataTotal: 8,
        dataUsed: 7.9,
        status: "Active",
        validityDays: 15,
        country: "Italy",
        countryCode: "IT",
        purchaseDate: "2025-02-15",
        expiryDate: "2025-03-02",
        unit: "GB"
    },
    {
        id: "plan-004",
        name: "Ger",
        dataTotal: 12,
        dataUsed: 11.2,
        status: "Active",
        validityDays: 10,
        country: "Germany",
        countryCode: "DE",
        purchaseDate: "2025-02-20",
        expiryDate: "2025-03-02",
        unit: "GB"
    },
    {
        id: "plan-005",
        name: "UK",
        dataTotal: 15,
        dataUsed: 14.3,
        status: "Expired",
        validityDays: 30,
        country: "United Kingdom",
        countryCode: "GB",
        purchaseDate: "2025-01-05",
        expiryDate: "2025-02-04",
        unit: "GB"
    },
    {
        id: "plan-006",
        name: "Por",
        dataTotal: 500,
        dataUsed: 276,
        status: "Expired",
        validityDays: 14,
        country: "Portugal",
        countryCode: "PT",
        purchaseDate: "2025-01-20",
        expiryDate: "2025-02-03",
        unit: "MB"
    },
    {
        id: "plan-007",
        name: "USA",
        dataTotal: 20,
        dataUsed: 5.7,
        status: "Expired",
        validityDays: 30,
        country: "United States",
        countryCode: "US",
        purchaseDate: "2025-01-02",
        expiryDate: "2025-02-01",
        unit: "GB"
    },
    {
        id: "plan-008",
        name: "Can",
        dataTotal: 8,
        dataUsed: 0.1,
        status: "Active",
        validityDays: 30,
        country: "Canada",
        countryCode: "CA",
        purchaseDate: "2025-02-28",
        expiryDate: "2025-03-30",
        unit: "GB"
    }
];

// Function to get plans by status
export const getPlansByStatus = (status: 'Active' | 'Expired'): PlanData[] => {
    return mockPlans.filter(plan => plan.status === status);
};

// Function to get plan by ID
export const getPlanById = (id: string): PlanData | undefined => {
    return mockPlans.find(plan => plan.id === id);
};



export const mockTransactions: Transaction[] = [
    {
        id: "564925374920",
        type: "Cash-in",
        source: "ABC Bank ATM",
        amount: 100.00,
        status: "confirmed",
        date: "17 Sep 2023",
        time: "10:34 AM",
        category: "deposit",
        description: "ATM deposit at Main Street branch"
    },
    {
        id: "564925374921",
        type: "Transfer",
        source: "Mobile Banking App",
        amount: 250.50,
        status: "confirmed",
        date: "16 Sep 2023",
        time: "3:22 PM",
        category: "transfer",
        description: "Fund transfer to savings account",
        recipientName: "John Doe",
        recipientAccount: "****5678"
    },
    {
        id: "564925374922",
        type: "Bill Payment",
        source: "Online Banking",
        amount: 85.75,
        status: "pending",
        date: "15 Sep 2023",
        time: "9:15 AM",
        category: "payment",
        description: "Monthly electricity bill payment",
        recipientName: "City Power Co."
    },
    {
        id: "564925374923",
        type: "Cash-out",
        source: "XYZ Bank ATM",
        amount: 200.00,
        status: "confirmed",
        date: "14 Sep 2023",
        time: "5:47 PM",
        category: "withdrawal",
        description: "ATM withdrawal at Downtown branch"
    },
    {
        id: "564925374924",
        type: "Mobile Top-up",
        source: "eSIM App",
        amount: 20.00,
        status: "confirmed",
        date: "13 Sep 2023",
        time: "11:30 AM",
        category: "payment",
        description: "Mobile data plan renewal"
    },
    {
        id: "564925374925",
        type: "International Transfer",
        source: "Online Banking",
        amount: 500.00,
        status: "pending",
        date: "12 Sep 2023",
        time: "2:15 PM",
        category: "transfer",
        description: "Transfer to international account",
        recipientName: "Maria Garcia",
        recipientAccount: "****9012"
    },
    {
        id: "564925374926",
        type: "Subscription Payment",
        source: "Automatic Debit",
        amount: 14.99,
        status: "confirmed",
        date: "11 Sep 2023",
        time: "12:00 AM",
        category: "payment",
        description: "Monthly streaming service subscription"
    },
    {
        id: "564925374927",
        type: "Refund",
        source: "Online Store",
        amount: 45.30,
        status: "confirmed",
        date: "10 Sep 2023",
        time: "1:24 PM",
        category: "deposit",
        description: "Refund for returned item"
    },
    {
        id: "564925374928",
        type: "eSIM Purchase",
        source: "ZIG Mobile App",
        amount: 30.00,
        status: "confirmed",
        date: "09 Sep 2023",
        time: "4:45 PM",
        category: "payment",
        description: "New eSIM purchase for travel"
    },
    {
        id: "564925374929",
        type: "Failed Transfer",
        source: "Mobile Banking App",
        amount: 150.00,
        status: "cancelled",
        date: "08 Sep 2023",
        time: "7:18 AM",
        category: "transfer",
        description: "Transfer failed due to insufficient funds",
        recipientName: "Jane Smith",
        recipientAccount: "****3456"
    },
    {
        id: "564925374930",
        type: "Service Fee",
        source: "Bank",
        amount: 5.99,
        status: "confirmed",
        date: "07 Sep 2023",
        time: "11:59 PM",
        category: "payment",
        description: "Monthly account maintenance fee"
    },
    {
        id: "564925374931",
        type: "Cash-in",
        source: "Bank Deposit",
        amount: 1000.00,
        status: "confirmed",
        date: "06 Sep 2023",
        time: "10:15 AM",
        category: "deposit",
        description: "Salary deposit"
    }
];
 