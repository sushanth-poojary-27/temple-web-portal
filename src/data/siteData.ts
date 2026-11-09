export interface SupervisorInfo {
  name: string;
  designation: string;
}

export interface CommitteeMember {
  id: string;
  role: string;
  name: string;
  category: "executive" | "clergy";
  image?: string;
}

export interface AartiTiming {
  id: string;
  name: string;
  time: string;
  description?: string;
}

export interface DarshanTimings {
  morning: string;
  evening: string;
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteData {
  trustName: string;
  shortName: string;
  address: string;
  fullAddress: string;
  registrationNo: string;
  assets: {
    logo: string;
    heroBanner: string;
  };
  supervisor: SupervisorInfo;
  navigation: NavItem[];
  committee: CommitteeMember[];
  aartiTimings: AartiTiming[];
  darshanTimings: DarshanTimings;
  placeholders: {
    historyNote: string;
    contactPhone: string;
    contactEmail: string;
    googleMapsEmbedUrl: string;
    bankDetailsNote: string;
  };
}

export const siteData: SiteData = {
  trustName: "Shree Durgaparameshwari Sannidhana (Regd.) Ullur",
  shortName: "Shri Durgaparameshwari Sannidhana",
  address: "Ullur, Karnataka",
  fullAddress:
    "Shri Durgaparameshwari Sannidhana (Regd.), Post Kemundel, Ulluru Village, Yellur, Karnataka 574119",
  registrationNo: "Regd. Trust 2007",
  assets: {
    logo: "/assets/website-assets/trust-logo.png",
    heroBanner: "/assets/website-assets/banner.png",
  },
  supervisor: {
    name: "Shri Dhananjay Shanthi",
    designation: "Convener",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About & Trust", href: "#about" },
    { label: "Timings & Sevas", href: "#timings" },
    { label: "Festivals", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Donate", href: "#donate" },
    { label: "Contact", href: "#contact" },
  ],
  committee: [
    {
      id: "president",
      role: "President",
      name: "Shri Shekhar Shanthi",
      category: "executive",
      image: "/assets/committee-members/shekhar-shanti.png",
    },
    {
      id: "vp-1",
      role: "Vice President",
      name: "Shri Jagannath T. Kotian",
      category: "executive",
      image: "/assets/committee-members/jaganath-kotian.png",
    },
    {
      id: "gen-secretary",
      role: "Honorary General Secretary",
      name: "Shri Harish Kotian",
      category: "executive",
      image: "/assets/committee-members/harish-kotian.jpg",
    },
    {
      id: "treasurer",
      role: "Treasurer",
      name: "CS Jayarama U. Poojary",
      category: "executive",
      image: "/assets/committee-members/jayaram-poojary.png",
    },
    {
      id: "convener",
      role: "Convener",
      name: "Shri Dhananjay Shanthi",
      category: "executive",
      image: "/assets/committee-members/dhananjay-shanti.png",
    },
    {
      id: "head-priest",
      role: "Head Priest",
      name: "Shri Dinesh Shanthi",
      category: "clergy",
      image: "/assets/committee-members/dinesh-shanti.png",
    },
  ],
  aartiTimings: [
    {
      id: "kakad-aarti",
      name: "Kakad Aarti",
      time: "6:00 AM - 6:30 AM",
    },
    {
      id: "maha-pooja",
      name: "Maha Pooja & Naivedya",
      time: "12:30 PM - 1:30 PM",
    },
    {
      id: "night-aarti",
      name: "Night Aarti & Shej Aarti",
      time: "7:30 PM - 8:30 PM",
    },
  ],
  darshanTimings: {
    morning: "6:00 AM - 2:00 PM",
    evening: "4:00 PM - 8:30 PM",
  },
  placeholders: {
    historyNote: "[PLACEHOLDER: Temple history text to be provided by the Trust]",
    contactPhone: "[PLACEHOLDER: Official trust phone number]",
    contactEmail: "[PLACEHOLDER: Official trust email]",
    googleMapsEmbedUrl: "[PLACEHOLDER: Google Maps embed URL]",
    bankDetailsNote: "[PLACEHOLDER: Official trust bank & UPI details]",
  },
};