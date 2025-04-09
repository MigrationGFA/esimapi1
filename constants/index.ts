import logo from "@/public/logo.png"

export const siteConfig = {
    global: {
        name: "E Sim",
        logo: logo,
    }
}

export const navigation = [
    {
        id: 1,
        name: "Home",
        url: "#home"
    },
    {
        id: 2,
        name: "Plans",
        url: "#plans"
    },
    {
        id: 3,
        name: "About Us",
        url: "#about-us"
    },
    {
        id: 4,
        name: "How It Work",
        url: "#how-it-work"
    },
]



import firstImg from "@/public/Init.png"
import secondImg from "@/public/instruction.png"
import thirdImg from "@/public/init2.png"



export const howItWorsk = [
    {
        id: 1,
        title: "Check that your device is eSIM-compatible and buy your data plan.",
        desc: "Your phone must be compatible with eSIM. After verifying, look for your destination and buy a data plan",
        img: firstImg
    },
    {
        id: 2,
        title: "Follow the installation instructions",
        desc: "Please check the instructions email we sent you upon purchasing your eSIM to complete the installation process and activate your data plan.",
        img: secondImg
    },
    {
        id: 3,
        title: "Get online right after landing. Start using your data plan as soon as you arrive at your destination",
        desc: "Your phone will automatically connect to the internet network upon arrival.",
        img: thirdImg
    }
]


import instant from "@/public/instant.png"
import global from "@/public/global.png"
import affordable from "@/public/affordable.png"
import support from "@/public/support.png"

export const whyZig = [
    {
        title: "Instant Connectivity",
        desc: "Purchase your eSim from anywhere",
        img: instant
    },
    {
        title: "Global Coverage",
        desc: "Get connected in 200+ countries and regions around the world",
        img: global
    },
    {
        title: "Affordable and Transparent",
        desc: "No hidden fees and entirely prepaid",
        img: affordable
    },
    {
        title: "24/7 Support",
        desc: "Our support team is available every day across all time zones",
        img: support
    }
]


interface FAQItem {
    question: string;
    answer: string;
  }

export const faqs: FAQItem[] = [
    {
      question: 'What is an eSim?',
      answer: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a mobile plan without a physical SIM card. It’s built into your device and can be programmed remotely for connectivity.'
    },
    {
      question: 'How can I Topup?',
      answer: 'You can top up your eSIM plan through the Holafly app or website by logging into your account, selecting your plan, and adding credit or purchasing additional data as needed.'
    },
    {
      question: 'How do I activate eSIM on my Phone?',
      answer: 'To activate an eSIM on your phone, scan the QR code provided by Holafly, follow the prompts in your phone’s settings under “Cellular” or “Mobile Data,” and install the eSIM profile.'
    },
    {
      question: 'Can I share to other device?',
      answer: 'No, eSIMs are tied to a specific device and cannot be shared or transferred to other devices. Each device requires its own eSIM activation.'
    },
    {
      question: 'Does Zig Mobile work for Nigeria also?',
      answer: 'Zig Mobile’s eSIM coverage depends on partnerships with local networks. As of now, it may not support Nigeria, but check the Holafly website or app for the latest coverage details.'
    }
  ];