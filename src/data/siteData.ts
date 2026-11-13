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

export interface FestivalItem {
  id: string;
  name: string;
  dateLabel: string;
  isoDate: string;
  badge: string;
  description: string;
  image: string;
  isPlaceholderDate?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "Deity & Sanctum" | "Varshik Pooja" | "Navaratri" | "Monthly Seva";
}

export interface ContactInfo {
  village: string;
  post: string;
  region: string;
  pincode: string;
  officeHours: string;
  phoneDisplay: string;
  phoneHref: string;
  emailDisplay: string;
  emailHref: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
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
  festivals: FestivalItem[];
  gallery: GalleryItem[];
  contact: ContactInfo;
  web3formsKey: string;
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
  festivals: [
    {
      id: "varshik-pooja",
      name: "Varshik Pooja (Annual Temple Festival)",
      dateLabel: "February 2027 [PLACEHOLDER: Exact Panchanga Date Pending]",
      isoDate: "2027-02-03T06:00:00+05:30",
      badge: "Next Major Utsava",
      description:
        "Annual Pratishtha & Varshik Mahotsava featuring Kalasha Pooja, Maha Ranga Pooja, Daiva Darshana, and community Annaprasada.",
      image: "/assets/varshik-pooja/2026/2026-devi.jpg",
      isPlaceholderDate: true,
    },
    {
      id: "navaratri-utsava",
      name: "Sharannavaratri Mahotsava",
      dateLabel: "October 2027 [PLACEHOLDER: Exact Panchanga Date Pending]",
      isoDate: "2027-10-01T06:00:00+05:30",
      badge: "9-Day Festival",
      description:
        "Nine auspicious days of special Devi Alankara, Chandika Homa, Kumkumarchana, Bhajans, and Maha Mangalarathi.",
      image: "/assets/navaratri/2026/IMG-20261011-WA0006.jpg",
      isPlaceholderDate: true,
    },
    {
      id: "monthly-sankramana",
      name: "Masa Sankramana & Special Ranga Pooja",
      dateLabel: "Monthly (Solar Transition Day) [PLACEHOLDER: Next Date Pending]",
      isoDate: "2026-12-16T06:00:00+05:30",
      badge: "Monthly Seva",
      description:
        "Monthly Sankramana special abhisheka, Pushpalankara, and evening Ranga Pooja offered to Goddess Durgaparameshwari.",
      image: "/assets/gallery/monthly-pooja.webp",
      isPlaceholderDate: true,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      src: "/assets/gallery/devi-1.webp",
      alt: "Goddess Shri Durgaparameshwari Sanctum Alankara",
      category: "Deity & Sanctum",
    },
    {
      id: "gal-2",
      src: "/assets/varshik-pooja/2026/2026-devi.jpg",
      alt: "Varshik Pooja 2026 Special Devi Alankara",
      category: "Varshik Pooja",
    },
    {
      id: "gal-3",
      src: "/assets/varshik-pooja/2026/2026-kalashadevi.jpg",
      alt: "Kalasha Pooja Rituals during Varshik Mahotsava",
      category: "Varshik Pooja",
    },
    {
      id: "gal-4",
      src: "/assets/gallery/ranga.webp",
      alt: "Traditional Ranga Pooja Offering",
      category: "Monthly Seva",
    },
    {
      id: "gal-5",
      src: "/assets/navaratri/2026/IMG-20261011-WA0006.jpg",
      alt: "Sharannavaratri Special Floral Decoration",
      category: "Navaratri",
    },
    {
      id: "gal-6",
      src: "/assets/varshik-pooja/2026/annaprasada.jpg",
      alt: "Devotees partaking in Mahaprasada / Annaprasada",
      category: "Varshik Pooja",
    },
    {
      id: "gal-7",
      src: "/assets/varshik-pooja/2026/2026-rangoli.jpg",
      alt: "Traditional Temple Rangoli and Deepa Decoration",
      category: "Varshik Pooja",
    },
    {
      id: "gal-8",
      src: "/assets/gallery/monthly-pooja.webp",
      alt: "Monthly Pooja & Sanctum Deeparadhana",
      category: "Monthly Seva",
    },
  ],
  contact: {
    village: "Ulluru Village, Yellur",
    post: "Post Kemundel",
    region: "Udupi District, Karnataka",
    pincode: "574119",
    officeHours: "Morning 6:00 AM - 2:00 PM | Evening 4:00 PM - 8:30 PM",
    phoneDisplay: "[PLACEHOLDER: Official Trust Phone Number]",
    phoneHref: "tel:+910000000000",
    emailDisplay: "shridurgaparameshwariullur@gmail.com",
    emailHref:
      "https://mail.google.com/mail/?view=cm&fs=1&to=shridurgaparameshwariullur@gmail.com",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.228546!2d74.7924429!3d13.1634892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcaddb334977bf%3A0xf294e0dc4628342f!2sUlluru%20Durgaparameshwari!5e0!3m2!1sen!2sin!4v1731314000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir//5Q7W%2B92R+Ulluru+Durgaparameshwari,+Post,+Kemundel,+Ulluru+Village,+Yellur,+Karnataka+574119/@13.1634892,74.7924429,17z/data=!4m16!1m7!3m6!1s0x3bbcaddb334977bf:0xf294e0dc4628342f!2sUlluru+Durgaparameshwari!8m2!3d13.1634892!4d74.7950178!16s%2Fg%2F11hzz5k8rp!4m7!1m0!1m5!1m1!1s0x3bbcaddb334977bf:0xf294e0dc4628342f!2m2!1d74.7950178!2d13.1634892?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D",
  },
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY_PLACEHOLDER",
  placeholders: {
    historyNote: "[PLACEHOLDER: Temple history text to be provided by the Trust]",
    contactPhone: "[PLACEHOLDER: Official trust phone number]",
    contactEmail: "shridurgaparameshwariullur@gmail.com",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.228546!2d74.7924429!3d13.1634892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcaddb334977bf%3A0xf294e0dc4628342f!2sUlluru%20Durgaparameshwari!5e0!3m2!1sen!2sin!4v1731314000000!5m2!1sen!2sin",
    bankDetailsNote: "[PLACEHOLDER: Official trust bank & UPI details]",
  },
};