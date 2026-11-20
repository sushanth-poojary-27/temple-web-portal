export interface SupervisorInfo {
  name: string;
  nameKn: string;
  designation: string;
  designationKn: string;
}

export interface CommitteeMember {
  id: string;
  role: string;
  roleKn: string;
  name: string;
  nameKn: string;
  category: "executive" | "clergy";
  image?: string;
}

export interface AartiTiming {
  id: string;
  name: string;
  nameKn: string;
  time: string;
  timeKn: string;
  description?: string;
  descriptionKn?: string;
}

export interface DarshanTimings {
  title: string;
  titleKn: string;
  morningLabel: string;
  morningLabelKn: string;
  eveningLabel: string;
  eveningLabelKn: string;
  morning: string;
  morningKn: string;
  evening: string;
  eveningKn: string;
  note?: string;
}

export interface NavItem {
  label: string;
  labelKn: string;
  href: string;
}

export interface HeroCtaItem {
  id: string;
  label: string;
  labelKn: string;
  href: string;
  variant: "primary" | "secondary" | "accent";
}

export interface FestivalItem {
  id: string;
  name: string;
  nameKn: string;
  dateLabel: string;
  dateLabelKn: string;
  isoDate: string;
  badge: string;
  badgeKn: string;
  description: string;
  descriptionKn: string;
  image: string;
  isPlaceholderDate?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  altKn: string;
  category: "Deity & Sanctum" | "Varshik Pooja" | "Navaratri" | "Monthly Seva";
  categoryKn: string;
}

export interface ContactInfo {
  village: string;
  villageKn: string;
  post: string;
  postKn: string;
  region: string;
  regionKn: string;
  pincode: string;
  plusCode: string;
  officeHours: string;
  officeHoursKn: string;
  phoneDisplay: string;
  phoneDisplayKn: string;
  phoneHref: string;
  emailDisplay: string;
  emailHref: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
}

export interface SevaItem {
  id: string;
  name: string;
  nameKn: string;
  price: number;
}

export const sevaList: SevaItem[] = [
  {
    id: "alankara-pooja",
    name: "Alankara Pooja",
    nameKn: "ಅಲಂಕಾರ ಪೂಜೆ",
    price: 1000,
  },
  {
    id: "hunnime-pooja",
    name: "Hunnime Pooja",
    nameKn: "ಹುಣ್ಣಿಮೆ ಪೂಜೆ",
    price: 750,
  },
  {
    id: "havina-pooja",
    name: "Havina Pooja",
    nameKn: "ಹೂವಿನ ಪೂಜೆ",
    price: 151,
  },
  {
    id: "trimadhura-naivedya",
    name: "Trimadhura Naivedya",
    nameKn: "ತ್ರಿಮಧುರ ನೈವೇದ್ಯ",
    price: 51,
  },
  {
    id: "kunkumarchane",
    name: "Kunkumarchane",
    nameKn: "ಕುಂಕುಮಾರ್ಚನೆ",
    price: 30,
  },
  {
    id: "lalita-sahasra-namarchane",
    name: "Lalita Sahasra Namarchane",
    nameKn: "ಲಲಿತಾ ಸಹಸ್ರನಾಮಾರ್ಚನೆ",
    price: 50,
  },
  {
    id: "karpura-arati",
    name: "Karpura Arati",
    nameKn: "ಕರ್ಪೂರ ಆರತಿ",
    price: 25,
  },
];

export interface SiteData {
  trustName: string;
  trustNameKn: string;
  shortName: string;
  shortNameKn: string;
  address: string;
  addressKn: string;
  fullAddress: string;
  fullAddressKn: string;
  registrationNo: string;
  registrationNoKn: string;
  announcementBar: string;
  announcementBarKn: string;
  taxExemptionNote: string;
  taxExemptionNoteKn: string;
  demoDisclaimer: string;
  demoDisclaimerKn: string;
  assets: {
    logo: string;
    heroBanner: string;
  };
  supervisor: SupervisorInfo;
  navigation: NavItem[];
  heroCtas: HeroCtaItem[];
  committee: CommitteeMember[];
  aartiTimings: AartiTiming[];
  darshanTimings: DarshanTimings;
  festivals: FestivalItem[];
  gallery: GalleryItem[];
  contact: ContactInfo;
  sevaList: SevaItem[];
  placeholders: {
    historyNote: string;
    historyNoteKn: string;
    contactPhone: string;
    contactPhoneKn: string;
    contactEmail: string;
    googleMapsEmbedUrl: string;
    bankDetailsNote: string;
    bankDetailsNoteKn: string;
  };
}

export const siteData: SiteData = {
  trustName: "Shree Durgaparameshwari Sannidhana (Regd.), Ullur",
  trustNameKn: "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ (ರಿ.), ಉಳ್ಳೂರು",
  shortName: "Shri Durgaparameshwari Sannidhana",
  shortNameKn: "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ",
  address:
    "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
  addressKn:
    "ಪೋಸ್ಟ್ ಕೆಮುಂಡೇಲ್, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಎಲ್ಲೂರು, ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ - 574119",
  fullAddress:
    "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119 (Plus Code: 5Q7W+92R)",
  fullAddressKn:
    "ಪೋಸ್ಟ್ ಕೆಮುಂಡೇಲ್, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಎಲ್ಲೂರು, ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ - 574119 (ಪ್ಲಸ್ ಕೋಡ್: 5Q7W+92R)",
  registrationNo: "Regd. Trust 2007",
  registrationNoKn: "ನೋಂದಾಯಿತ ಟ್ರಸ್ಟ್ 2007",
  announcementBar:
    "🙏 Om Shri Durgayai Namaha • Check Upcoming Festivals, Seva Details, Pre-Seva Bookings & Temple Updates — Thank You 🙏",
  announcementBarKn:
    "🙏 ಓಂ ಶ್ರೀ ದುರ್ಗಾಯೈ ನಮಃ • ಮುಂಬರುವ ಉತ್ಸವಗಳು, ಸೇವೆಗಳ ವಿವರ, ಮುಂಗಡ ಸೇವೆ ಬುಕ್ಕಿಂಗ್ ಮತ್ತು ದೇವಾಲಯದ ಮಾಹಿತಿಯನ್ನು ವೀಕ್ಷಿಸಿ — ಧನ್ಯವಾದಗಳು 🙏",
  taxExemptionNote:
    "Note: Contributions to the trust are not eligible for Section 80G tax exemption.",
  taxExemptionNoteKn:
    "ಸೂಚನೆ: ಟ್ರಸ್ಟ್ಗೆ ನೀಡುವ ದೇಣಿಗೆಗಳಿಗೆ ಆದಾಯ ತೆರಿಗೆ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 80G ವಿನಾಯಿತಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.",
  demoDisclaimer: "DEMO / TEST, not a valid receipt",
  demoDisclaimerKn: "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ",
  assets: {
    logo: "/trust-logo.png",
    heroBanner: "/assets/website-assets/banner.png",
  },
  supervisor: {
    name: "Shri Dhananjay Shanthi",
    nameKn: "ಶ್ರೀ ಧನಂಜಯ ಶಾಂತಿ",
    designation: "Convener",
    designationKn: "ಸಂಚಾಲಕರು",
  },
  navigation: [
    { label: "Home", labelKn: "ಮುಖಪುಟ", href: "#home" },
    { label: "About & Trust", labelKn: "ಕ್ಷೇತ್ರ ಪರಿಚಯ ಮತ್ತು ಟ್ರಸ್ಟ್", href: "#about" },
    { label: "Festivals", labelKn: "ಉತ್ಸವಗಳು", href: "#events" },
    { label: "Gallery", labelKn: "ಛಾಯಾಚಿತ್ರಗಳು", href: "#gallery" },
    { label: "Donate", labelKn: "ಸೇವೆ / ದೇಣಿಗೆ", href: "#donate" },
    { label: "Contact", labelKn: "ಸಂಪರ್ಕಿಸಿ", href: "#contact" },
  ],
  heroCtas: [
    {
      id: "upcoming-events",
      label: "Upcoming Events",
      labelKn: "ಮುಂಬರುವ ಉತ್ಸವಗಳು",
      href: "#events",
      variant: "primary",
    },
    {
      id: "book-seva",
      label: "Book a Seva",
      labelKn: "ಸೇವೆ ಬುಕ್ ಮಾಡಿ",
      href: "/donate/seva",
      variant: "secondary",
    },
    {
      id: "support-edu-trust",
      label: "Support Edu Trust",
      labelKn: "ವಿದ್ಯಾ ಟ್ರಸ್ಟ್ ದೇಣಿಗೆ",
      href: "/donate/education-trust",
      variant: "accent",
    },
  ],
  committee: [
    {
      id: "president",
      role: "President",
      roleKn: "ಅಧ್ಯಕ್ಷರು",
      name: "Shri Shekhar Shanthi",
      nameKn: "ಶ್ರೀ ಶೇಖರ್ ಶಾಂತಿ",
      category: "executive",
      image: "/assets/committee-members/shekhar-shanti.png",
    },
    {
      id: "vp-1",
      role: "Vice President",
      roleKn: "ಉಪಾಧ್ಯಕ್ಷರು",
      name: "Shri Jagannath T. Kotian",
      nameKn: "ಶ್ರೀ ಜಗನ್ನಾಥ್ ಟಿ. ಕೋಟ್ಯಾನ್",
      category: "executive",
      image: "/assets/committee-members/jaganath-kotian.png",
    },
    {
      id: "gen-secretary",
      role: "Honorary General Secretary",
      roleKn: "ಗೌರವ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
      name: "Shri Harish Kotian",
      nameKn: "ಶ್ರೀ ಹರೀಶ್ ಕೋಟ್ಯಾನ್",
      category: "executive",
      image: "/assets/committee-members/harish-kotian.jpg",
    },
    {
      id: "treasurer",
      role: "Treasurer",
      roleKn: "ಕೋಶಾಧಿಕಾರಿ",
      name: "CS Jayarama U. Poojary",
      nameKn: "ಸಿ.ಎಸ್. ಜಯರಾಮ ಯು. ಪೂಜಾರಿ",
      category: "executive",
      image: "/assets/committee-members/jayaram-poojary.png",
    },
    {
      id: "convener",
      role: "Convener",
      roleKn: "ಸಂಚಾಲಕರು",
      name: "Shri Dhananjay Shanthi",
      nameKn: "ಶ್ರೀ ಧನಂಜಯ ಶಾಂತಿ",
      category: "executive",
      image: "/assets/committee-members/dhananjay-shanti.png",
    },
    {
      id: "head-priest",
      role: "Head Priest",
      roleKn: "ಪ್ರಧಾನ ಅರ್ಚಕರು",
      name: "Shri Dinesh Shanthi",
      nameKn: "ಶ್ರೀ ದಿನೇಶ್ ಶಾಂತಿ",
      category: "clergy",
      image: "/assets/committee-members/dinesh-shanti.png",
    },
  ],
  aartiTimings: [
    {
      id: "kakad-aarti",
      name: "Kakad Aarti",
      nameKn: "ಪ್ರಾತಃಕಾಲ ಕಾಕಡ ಆರತಿ",
      time: "6:00 AM - 6:30 AM",
      timeKn: "ಬೆಳಿಗ್ಗೆ 6:00 - 6:30",
    },
    {
      id: "maha-pooja",
      name: "Maha Pooja & Naivedya",
      nameKn: "ಮಧ್ಯಾಹ್ನದ ಮಹಾಪೂಜೆ ಮತ್ತು ನೈವೇದ್ಯ",
      time: "12:30 PM - 1:30 PM",
      timeKn: "ಮಧ್ಯಾಹ್ನ 12:30 - 1:30",
    },
    {
      id: "night-aarti",
      name: "Night Aarti & Shej Aarti",
      nameKn: "ರಾತ್ರಿ ಮಹಾಮಂಗಳಾರತಿ ಮತ್ತು ಶೇಜ್ ಆರತಿ",
      time: "7:30 PM - 8:30 PM",
      timeKn: "ರಾತ್ರಿ 7:30 - 8:30",
    },
  ],
  darshanTimings: {
    title: "Daily Darshan Timings",
    titleKn: "ದೈನಂದಿನ ದರ್ಶನ ಸಮಯ",
    morningLabel: "Morning Darshan",
    morningLabelKn: "ಬೆಳಗಿನ ದರ್ಶನ",
    eveningLabel: "Evening Darshan",
    eveningLabelKn: "ಸಂಜೆಯ ದರ್ಶನ",
    morning: "6:00 AM - 2:00 PM",
    morningKn: "ಬೆಳಿಗ್ಗೆ 6:00 - ಮಧ್ಯಾಹ್ನ 2:00",
    evening: "4:00 PM - 8:30 PM",
    eveningKn: "ಸಂಜೆ 4:00 - ರಾತ್ರಿ 8:30",
  },
  festivals: [
    {
      id: "varshik-pooja",
      name: "Varshik Pooja (Annual Temple Festival)",
      nameKn: "ವಾರ್ಷಿಕ ಪೂಜಾ ಮಹೋತ್ಸವ (ಪ್ರತಿಷ್ಠಾ ವಾರ್ಷಿಕೋತ್ಸವ)",
      dateLabel: "February 2027 [PLACEHOLDER: Exact Panchanga Date Pending]",
      dateLabelKn:
        "ಫೆಬ್ರವರಿ 2027 [PLACEHOLDER: ಪಂಚಾಂಗದ ನಿಖರ ದಿನಾಂಕವನ್ನು ಟ್ರಸ್ಟ್ ಪ್ರಕಟಿಸಲಿದೆ]",
      isoDate: "2027-02-03T06:00:00+05:30",
      badge: "Next Major Utsava",
      badgeKn: "ಮುಂದಿನ ಪ್ರಮುಖ ಉತ್ಸವ",
      description:
        "Annual Pratishtha & Varshik Mahotsava featuring Kalasha Pooja, Maha Ranga Pooja, Daiva Darshana, and community Annaprasada.",
      descriptionKn:
        "ಶ್ರೀ ಕ್ಷೇತ್ರದ ವಾರ್ಷಿಕ ಪ್ರತಿಷ್ಠಾ ಮಹೋತ್ಸವದ ಪ್ರಯುಕ್ತ ವಿಶೇಷ ಕಲಶ ಪೂಜೆ, ಮಹಾ ರಂಗಪೂಜೆ, ದೈವ ದರ್ಶನ ಹಾಗೂ ಸಾರ್ವಜನಿಕ ಅನ್ನಸಂತರ್ಪಣೆ ನಡೆಯುತ್ತದೆ.",
      image: "/assets/varshik-pooja/2026/2026-devi.jpg",
      isPlaceholderDate: true,
    },
    {
      id: "navaratri-utsava",
      name: "Sharannavaratri Mahotsava",
      nameKn: "ಶರನ್ನವರಾತ್ರಿ ಮಹೋತ್ಸವ",
      dateLabel: "October 2027 [PLACEHOLDER: Exact Panchanga Date Pending]",
      dateLabelKn:
        "ಅಕ್ಟೋಬರ್ 2027 [PLACEHOLDER: ಪಂಚಾಂಗದ ನಿಖರ ದಿನಾಂಕವನ್ನು ಟ್ರಸ್ಟ್ ಪ್ರಕಟಿಸಲಿದೆ]",
      isoDate: "2027-10-01T06:00:00+05:30",
      badge: "9-Day Festival",
      badgeKn: "೯ ದಿನಗಳ ನವರಾತ್ರಿ ಉತ್ಸವ",
      description:
        "Nine auspicious days of special Devi Alankara, Chandika Homa, Kumkumarchana, Bhajans, and Maha Mangalarathi.",
      descriptionKn:
        "ಒಂಬತ್ತು ದಿನಗಳ ಕಾಲ ಶ್ರೀ ದೇವಿಗೆ ವಿಶೇಷ ಅಲಂಕಾರ ಪೂಜೆ, ಚಂಡಿಕಾ ಹೋಮ, ಕುಂಕುಮಾರ್ಚನೆ, ಭಜನಾ ಕಾರ್ಯಕ್ರಮ ಹಾಗೂ ಮಹಾಮಂಗಳಾರತಿ ನೆರವೇರುತ್ತದೆ.",
      image: "/assets/navaratri/2026/IMG-20261011-WA0006.jpg",
      isPlaceholderDate: true,
    },
    {
      id: "monthly-sankramana",
      name: "Masa Sankramana & Special Ranga Pooja",
      nameKn: "ಮಾಸ ಸಂಕ್ರಮಣ ಮತ್ತು ವಿಶೇಷ ರಂಗಪೂಜೆ",
      dateLabel: "Monthly (Solar Transition Day) [PLACEHOLDER: Next Date Pending]",
      dateLabelKn:
        "ಪ್ರತಿ ತಿಂಗಳ ಸಂಕ್ರಮಣ ದಿನ [PLACEHOLDER: ಮುಂದಿನ ಸಂಕ್ರಮಣ ದಿನಾಂಕ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ]",
      isoDate: "2026-12-16T06:00:00+05:30",
      badge: "Monthly Seva",
      badgeKn: "ಮಾಸಿಕ ವಿಶೇಷ ಸೇವೆ",
      description:
        "Monthly Sankramana special abhisheka, Pushpalankara, and evening Ranga Pooja offered to Goddess Durgaparameshwari.",
      descriptionKn:
        "ಪ್ರತಿ ಮಾಸ ಸಂಕ್ರಮಣದಂದು ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಅಮ್ಮನವರಿಗೆ ವಿಶೇಷ ಅಭಿಷೇಕ, ಪುಷ್ಪಾಲಂಕಾರ ಹಾಗೂ ಸಂಜೆ ವಿಶೇಷ ರಂಗಪೂಜೆ ಸಮರ್ಪಿಸಲಾಗುತ್ತದೆ.",
      image: "/assets/gallery/monthly-pooja.webp",
      isPlaceholderDate: true,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      src: "/assets/gallery/devi-1.webp",
      alt: "Goddess Shri Durgaparameshwari Sanctum Alankara",
      altKn: "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಅಮ್ಮನವರ ಗರ್ಭಗುಡಿ ವಿಶೇಷ ಅಲಂಕಾರ",
      category: "Deity & Sanctum",
      categoryKn: "ಶ್ರೀ ದೇವಿ ದರ್ಶನ",
    },
    {
      id: "gal-2",
      src: "/assets/varshik-pooja/2026/2026-devi.jpg",
      alt: "Varshik Pooja 2026 Special Devi Alankara",
      altKn: "ವಾರ್ಷಿಕ ಪೂಜಾ ಮಹೋತ್ಸವ 2026ರ ಶ್ರೀ ದೇವಿಯ ವಿಶೇಷ ಅಲಂಕಾರ",
      category: "Varshik Pooja",
      categoryKn: "ವಾರ್ಷಿಕ ಪೂಜೆ",
    },
    {
      id: "gal-3",
      src: "/assets/varshik-pooja/2026/2026-kalashadevi.jpg",
      alt: "Kalasha Pooja Rituals during Varshik Mahotsava",
      altKn: "ವಾರ್ಷಿಕ ಮಹೋತ್ಸವದ ಕಲಶ ಪೂಜಾ ವಿಧಿವಿಧಾನಗಳು",
      category: "Varshik Pooja",
      categoryKn: "ವಾರ್ಷಿಕ ಪೂಜೆ",
    },
    {
      id: "gal-4",
      src: "/assets/gallery/ranga.webp",
      alt: "Traditional Ranga Pooja Offering",
      altKn: "ಸಾಂಪ್ರದಾಯಿಕ ರಂಗಪೂಜೆ ಸಮರ್ಪಣೆ",
      category: "Monthly Seva",
      categoryKn: "ಮಾಸಿಕ ಸೇವೆ",
    },
    {
      id: "gal-5",
      src: "/assets/navaratri/2026/IMG-20261011-WA0006.jpg",
      alt: "Sharannavaratri Special Floral Decoration",
      altKn: "ಶರನ್ನವರಾತ್ರಿ ಮಹೋತ್ಸವದ ವಿಶೇಷ ಪುಷ್ಪಾಲಂಕಾರ",
      category: "Navaratri",
      categoryKn: "ನವರಾತ್ರಿ ಉತ್ಸವ",
    },
    {
      id: "gal-6",
      src: "/assets/varshik-pooja/2026/annaprasada.jpg",
      alt: "Devotees partaking in Mahaprasada / Annaprasada",
      altKn: "ಮಹಾ ಅನ್ನಸಂತರ್ಪಣೆಯಲ್ಲಿ ಅನ್ನಪ್ರಸಾದ ಸ್ವೀಕರಿಸುತ್ತಿರುವ ಭಕ್ತಾದಿಗಳು",
      category: "Varshik Pooja",
      categoryKn: "ವಾರ್ಷಿಕ ಪೂಜೆ",
    },
    {
      id: "gal-7",
      src: "/assets/varshik-pooja/2026/2026-rangoli.jpg",
      alt: "Traditional Temple Rangoli and Deepa Decoration",
      altKn: "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಸಾಂಪ್ರದಾಯಿಕ ರಂಗೋಲಿ ಮತ್ತು ದೀಪಾಲಂಕಾರ",
      category: "Varshik Pooja",
      categoryKn: "ವಾರ್ಷಿಕ ಪೂಜೆ",
    },
    {
      id: "gal-8",
      src: "/assets/gallery/monthly-pooja.webp",
      alt: "Monthly Pooja & Sanctum Deeparadhana",
      altKn: "ಮಾಸಿಕ ಪೂಜೆ ಮತ್ತು ಗರ್ಭಗುಡಿ ದೀಪಾರಾಧನೆ",
      category: "Monthly Seva",
      categoryKn: "ಮಾಸಿಕ ಸೇವೆ",
    },
    {
      id: "gal-9",
      src: "/assets/gallery/donation.webp",
      alt: "Community Welfare & Educational Aid Initiative by the Trust",
      altKn: "ಟ್ರಸ್ಟ್ ವತಿಯಿಂದ ಶೈಕ್ಷಣಿಕ ನೆರವು ಮತ್ತು ಸಮಾಜಮುಖಿ ಸೇವಾ ಕಾರ್ಯಕ್ರಮ",
      category: "Varshik Pooja",
      categoryKn: "ವಾರ್ಷಿಕ ಪೂಜೆ",
    },
  ],
  contact: {
    village: "Ulluru Village, Yellur",
    villageKn: "ಉಳ್ಳೂರು ಗ್ರಾಮ, ಎಲ್ಲೂರು",
    post: "Post Kemundel",
    postKn: "ಪೋಸ್ಟ್ ಕೆಮುಂಡೇಲ್",
    region: "Udupi District, Karnataka",
    regionKn: "ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ",
    pincode: "574119",
    plusCode: "5Q7W+92R",
    officeHours: "Morning 6:00 AM - 2:00 PM | Evening 4:00 PM - 8:30 PM",
    officeHoursKn: "ಬೆಳಿಗ್ಗೆ 6:00 - ಮಧ್ಯಾಹ್ನ 2:00 | ಸಂಜೆ 4:00 - ರಾತ್ರಿ 8:30",
    phoneDisplay: "+91 9820790032",
    phoneDisplayKn: "+91 9820790032",
    phoneHref: "tel:+919820790032",
    emailDisplay: "shridurgaparameshwariullur@gmail.com",
    emailHref:
      "mailto:shridurgaparameshwariullur@gmail.com?subject=Temple%20Trust%20Inquiry",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.228546!2d74.7924429!3d13.1634892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcaddb334977bf%3A0xf294e0dc4628342f!2sUlluru%20Durgaparameshwari!5e0!3m2!1sen!2sin!4v1731314000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir//5Q7W%2B92R+Ulluru+Durgaparameshwari,+Post,+Kemundel,+Ulluru+Village,+Yellur,+Karnataka+574119/@13.1634892,74.7924429,17z/data=!4m16!1m7!3m6!1s0x3bbcaddb334977bf:0xf294e0dc4628342f!2sUlluru+Durgaparameshwari!8m2!3d13.1634892!4d74.7950178!16s%2Fg%2F11hzz5k8rp!4m7!1m0!1m5!1m1!1s0x3bbcaddb334977bf:0xf294e0dc4628342f!2m2!1d74.7950178!2d13.1634892?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D",
  },
  sevaList,
  placeholders: {
    historyNote: "[PLACEHOLDER: Temple history text to be provided by the Trust]",
    historyNoteKn:
      "[PLACEHOLDER: ಶ್ರೀ ಕ್ಷೇತ್ರದ ಇತಿಹಾಸ ಮತ್ತು ಸ್ಥಳ ಪುರಾಣದ ಮಾಹಿತಿಯನ್ನು ಟ್ರಸ್ಟ್ ವತಿಯಿಂದ ಒದಗಿಸಲಾಗುವುದು]",
    contactPhone: "+91 9820790032",
    contactPhoneKn: "+91 9820790032",
    contactEmail: "shridurgaparameshwariullur@gmail.com",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.228546!2d74.7924429!3d13.1634892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcaddb334977bf%3A0xf294e0dc4628342f!2sUlluru%20Durgaparameshwari!5e0!3m2!1sen!2sin!4v1731314000000!5m2!1sen!2sin",
    bankDetailsNote: "[PLACEHOLDER: Official trust bank & UPI details]",
    bankDetailsNoteKn:
      "[PLACEHOLDER: ಟ್ರಸ್ಟ್ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಯುಪಿಐ (UPI) ವಿವರಗಳನ್ನು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ]",
  },
};
