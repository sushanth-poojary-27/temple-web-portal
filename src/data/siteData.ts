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

export interface EventScheduleItem {
  time: string;
  timeKn: string;
  title: string;
  titleKn: string;
  note: string;
  noteKn: string;
}

export interface EventItem {
  slug: string;
  badge: string;
  badgeKn: string;
  title: string;
  titleKn: string;
  dateLabel: string;
  dateLabelKn: string;
  isoDate: string;
  pastLabel: string;
  pastLabelKn: string;
  image: string;
  shortInviteNote: string;
  shortInviteNoteKn: string;
  fullDescription: string;
  fullDescriptionKn: string;
  schedule: EventScheduleItem[];
  scheduleDisclaimer?: string;
  scheduleDisclaimerKn?: string;
  sevaType: string;
  sevaTypeKn: string;
  ctaLabel: string;
  ctaLabelKn: string;
}

export const eventsData: EventItem[] = [
  {
    slug: "varshika-utsava",
    badge: "Flagship Annual Utsava",
    badgeKn: "ಪ್ರಮುಖ ವಾರ್ಷಿಕ ಉತ್ಸವ",
    title: "Varshika Utsava (Varshik Pooja)",
    titleKn: "ವಾರ್ಷಿಕ ಉತ್ಸವ (ವಾರ್ಷಿಕ ಪೂಜಾ ಮಹೋತ್ಸವ)",
    dateLabel: "Friday, 22 January 2027",
    dateLabelKn: "ಶುಕ್ರವಾರ, 22 ಜನವರಿ 2027",
    isoDate: "2027-01-22T06:00:00+05:30",
    pastLabel: "Celebration Completed",
    pastLabelKn: "ಉತ್ಸವ ಸಂಪನ್ನಗೊಂಡಿದೆ",
    image: "/images/varshika-utsava.png",
    shortInviteNote:
      "Join us with family and friends for the annual Pratishthapana & Varshika Utsava celebrations at Ullur.",
    shortInviteNoteKn:
      "ಕುಟುಂಬ ಮತ್ತು ಬಂಧುಮಿತ್ರರೊಂದಿಗೆ ಉಳ್ಳೂರಿನ ವಾರ್ಷಿಕ ಪ್ರತಿಷ್ಠಾಪನಾ ಉತ್ಸವದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ.",
    fullDescription:
      "The annual Pratishthapana & Varshika Utsava of Shree Durgaparameshwari Sannidana Trust, Ullur brings devotees together in sacred devotion for morning Vedic rituals, Chandika Homa, Dharmika Sabha, community Anna Santarpana, and evening Ranga Pooja.",
    fullDescriptionKn:
      "ಉಳ್ಳೂರು ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಟ್ರಸ್ಟ್‌ನ ವಾರ್ಷಿಕ ಪ್ರತಿಷ್ಠಾಪನಾ ಮಹೋತ್ಸವವು ಭಕ್ತಾದಿಗಳ ಸಮ್ಮುಖದಲ್ಲಿ ಬೆಳಗಿನ ವೈದಿಕ ವಿಧಿವಿಧಾನಗಳು, ಪವಿತ್ರ ಚಂಡಿಕಾ ಹೋಮ, ಧಾರ್ಮಿಕ ಸಭೆ, ಸಾರ್ವಜನಿಕ ಅನ್ನಸಂತರ್ಪಣೆ ಹಾಗೂ ಸಂಜೆಯ ರಂಗಪೂಜೆಯೊಂದಿಗೆ ವಿಜೃಂಭಣೆಯಿಂದ ನೆರವೇರಲಿದೆ.",
    schedule: [
      {
        time: "06:00 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 06:00",
        title: "Punyaha Vachana, Ganahoma & Navaka Pradhana Kalashabhisheka",
        titleKn: "ಪುಣ್ಯಾಹ ವಾಚನ, ಗಣಹೋಮ ಮತ್ತು ನವಕ ಪ್ರಧಾನ ಕಲಶಾಭಿಷೇಕ",
        note: "Auspicious dawn sanctification, Ganapathi Homa, and sacred Kalasha abhisheka to Goddess Durgaparameshwari.",
        noteKn:
          "ಶುಭ ಪ್ರಾತಃಕಾಲದ ಪುಣ್ಯಾಹ ವಾಚನ, ಗಣಪತಿ ಹೋಮ ಹಾಗೂ ಶ್ರೀ ದೇವಿಗೆ ನವಕ ಪ್ರಧಾನ ಕಲಶಾಭಿಷೇಕ.",
      },
      {
        time: "07:30 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 07:30",
        title: "Sacred Chandika Homa",
        titleKn: "ಪವಿತ್ರ ಚಂಡಿಕಾ ಹೋಮ",
        note: "Vedic Durga Saptashati parayana and Chandika Homa invoking Devi's grace for universal well-being.",
        noteKn:
          "ಲೋಕಕಲ್ಯಾಣಾರ್ಥವಾಗಿ ದುರ್ಗಾ ಸಪ್ತಶತಿ ಪಾರಾಯಣದೊಂದಿಗೆ ಪವಿತ್ರ ಚಂಡಿಕಾ ಹೋಮ.",
      },
      {
        time: "11:30 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 11:30",
        title:
          "Poornahuti, Maha Naivedya, Mahapooja, Dharmika Sabha & Anna Prasada (Anna Santarpana)",
        titleKn:
          "ಪೂರ್ಣಾಹುತಿ, ಮಹಾ ನೈವೇದ್ಯ, ಮಹಾಪೂಜೆ, ಧಾರ್ಮಿಕ ಸಭೆ ಹಾಗೂ ಅನ್ನಪ್ರಸಾದ (ಅನ್ನಸಂತರ್ಪಣೆ)",
        note: "Completion of homa rituals followed by Mahapooja, Dharmika Sabha address, and community Anna Santarpana.",
        noteKn:
          "ಹೋಮದ ಪೂರ್ಣಾಹುತಿ, ಮಹಾಪೂಜೆ, ಧಾರ್ಮಿಕ ಸಭಾ ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಭಕ್ತಾದಿಗಳಿಗೆ ಸಾರ್ವಜನಿಕ ಅನ್ನಸಂತರ್ಪಣೆ.",
      },
      {
        time: "06:30 PM",
        timeKn: "ಸಂಜೆ 06:30",
        title: "Evening Ranga Pooja, Bhajans & Maha Mangalarati",
        titleKn: "ಸಂಜೆ ರಂಗಪೂಜೆ, ಭಜನಾ ಸೇವೆ ಮತ್ತು ಮಹಾಮಂಗಳಾರತಿ",
        note: "Grand evening floral decoration, devotional bhajans, Ranga Pooja, and Maha Mangalarati.",
        noteKn:
          "ಸಂಜೆಯ ವಿಶೇಷ ಪುಷ್ಪಾಲಂಕಾರ, ಭಜನಾ ಕಾರ್ಯಕ್ರಮ, ರಂಗಪೂಜೆ ಹಾಗೂ ಮಹಾಮಂಗಳಾರತಿ.",
      },
    ],
    sevaType: "Alankara Pooja",
    sevaTypeKn: "ಅಲಂಕಾರ ಪೂಜೆ",
    ctaLabel: "Offer Seva for Varshika Utsava",
    ctaLabelKn: "ವಾರ್ಷಿಕ ಉತ್ಸವಕ್ಕೆ ಸೇವೆ ಸಲ್ಲಿಸಿ",
  },
  {
    slug: "sharannavaratri-mahotsava",
    badge: "9-Day Festival",
    badgeKn: "೯ ದಿನಗಳ ಮಹೋತ್ಸವ",
    title: "Sharannavaratri Mahotsava",
    titleKn: "ಶರನ್ನವರಾತ್ರಿ ಮಹೋತ್ಸವ",
    dateLabel: "October 2027 (Navaratri & Vijayadashami)",
    dateLabelKn: "ಅಕ್ಟೋಬರ್ 2027 (ನವರಾತ್ರಿ ಮತ್ತು ವಿಜಯದಶಮಿ)",
    isoDate: "2027-10-01T06:00:00+05:30",
    pastLabel: "Celebration Completed",
    pastLabelKn: "ಉತ್ಸವ ಸಂಪನ್ನಗೊಂಡಿದೆ",
    image: "/images/sharannavaratri.png",
    shortInviteNote:
      "Nine sacred days of Devi Alankara, Kumkumarchane, Deepotsava, and Vijayadashami celebrations.",
    shortInviteNoteKn:
      "ಒಂಬತ್ತು ದಿನಗಳ ದೇವಿ ಅಲಂಕಾರ, ಕುಂಕುಮಾರ್ಚನೆ, ದೀಪೋತ್ಸವ ಮತ್ತು ವಿಜಯದಶಮಿ ಆಚರಣೆಗಳು.",
    fullDescription:
      "Celebrated over nine auspicious days of Sharannavaratri culminating in Vijayadashami, devotees gather at Ullur Sannidhana for daily Devi Alankara, Kumkumarchane, Lalita Sahasranamarchane, Anna Prasada, and illuminated evening Deepotsava and Bhajans.",
    fullDescriptionKn:
      "ವಿಜಯದಶಮಿಯವರೆಗೆ ಒಂಬತ್ತು ಶುಭ ದಿನಗಳ ಕಾಲ ನಡೆಯುವ ಶರನ್ನವರಾತ್ರಿ ಮಹೋತ್ಸವದಲ್ಲಿ ಭಕ್ತಾದಿಗಳು ದೈನಂದಿನ ದೇವಿ ಅಲಂಕಾರ, ಕುಂಕುಮಾರ್ಚನೆ, ಲಲಿತಾ ಸಹಸ್ರನಾಮಾರ್ಚನೆ, ಅನ್ನಪ್ರಸಾದ ಹಾಗೂ ಸಂಜೆಯ ದೀಪೋತ್ಸವ ಮತ್ತು ಭಜನಾ ಸೇವೆಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳುತ್ತಾರೆ.",
    scheduleDisclaimer:
      "Tentative Panchanga timings — final schedule updated closer to festival",
    scheduleDisclaimerKn:
      "ಸಂಭಾವ್ಯ ಪಂಚಾಂಗ ವೇಳಾಪಟ್ಟಿ — ಉತ್ಸವದ ಸಮೀಪದಲ್ಲಿ ಅಂತಿಮ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಪ್ರಕಟಿಸಲಾಗುವುದು",
    schedule: [
      {
        time: "07:00 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 07:00",
        title: "Morning Kalasha Pooja & Devi Alankara",
        titleKn: "ಬೆಳಗಿನ ಕಲಶ ಪೂಜೆ ಮತ್ತು ದೇವಿ ಅಲಂಕಾರ",
        note: "Daily sacred Kalasha worship and special Navaratri floral decoration of Goddess Durgaparameshwari.",
        noteKn:
          "ನವರಾತ್ರಿಯ ನಿತ್ಯ ಕಲಶ ಪೂಜೆ ಹಾಗೂ ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಅಮ್ಮನವರಿಗೆ ವಿಶೇಷ ಅಲಂಕಾರ.",
      },
      {
        time: "10:30 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 10:30",
        title: "Kumkumarchane & Lalita Sahasranamarchane",
        titleKn: "ಕುಂಕುಮಾರ್ಚನೆ ಮತ್ತು ಲಲಿತಾ ಸಹಸ್ರನಾಮಾರ್ಚನೆ",
        note: "Collective chanting of Sri Lalita Sahasranama with sacred Kumkumarchane offerings.",
        noteKn:
          "ಶ್ರೀ ಲಲಿತಾ ಸಹಸ್ರನಾಮ ಪಾರಾಯಣದೊಂದಿಗೆ ಭಕ್ತಾದಿಗಳಿಂದ ಸಾಮೂಹಿಕ ಕುಂಕುಮಾರ್ಚನೆ.",
      },
      {
        time: "12:30 PM",
        timeKn: "ಮಧ್ಯಾಹ್ನ 12:30",
        title: "Mahapooja & Anna Prasada",
        titleKn: "ಮಹಾಪೂಜೆ ಮತ್ತು ಅನ್ನಪ್ರಸಾದ",
        note: "Noon Maha Naivedya, Mahapooja, and prasada distribution for visiting devotees.",
        noteKn:
          "ಮಧ್ಯಾಹ್ನದ ಮಹಾ ನೈವೇದ್ಯ, ಮಹಾಪೂಜೆ ಹಾಗೂ ಆಗಮಿಸಿದ ಭಕ್ತಾದಿಗಳಿಗೆ ಅನ್ನಪ್ರಸಾದ ವಿತರಣೆ.",
      },
      {
        time: "06:30 PM",
        timeKn: "ಸಂಜೆ 06:30",
        title: "Evening Deepotsava, Ranga Pooja & Bhajans",
        titleKn: "ಸಂಜೆ ದೀಪೋತ್ಸವ, ರಂಗಪೂಜೆ ಮತ್ತು ಭಜನೆಗಳು",
        note: "Festive lamp lighting across the sanctum, evening Ranga Pooja, and devotional bhajans.",
        noteKn:
          "ಸನ್ನಿಧಾನದಲ್ಲಿ ದೀಪೋತ್ಸವ, ಸಂಜೆಯ ವಿಶೇಷ ರಂಗಪೂಜೆ ಹಾಗೂ ಭಕ್ತಿಗೀತೆ-ಭಜನಾ ಸೇವೆ.",
      },
    ],
    sevaType: "Kunkumarchane",
    sevaTypeKn: "ಕುಂಕುಮಾರ್ಚನೆ",
    ctaLabel: "Offer Seva for Navaratri",
    ctaLabelKn: "ನವರಾತ್ರಿ ಉತ್ಸವಕ್ಕೆ ಸೇವೆ ಸಲ್ಲಿಸಿ",
  },
  {
    slug: "monthly-sankranti-hunnime",
    badge: "Monthly Seva",
    badgeKn: "ಮಾಸಿಕ ವಿಶೇಷ ಸೇವೆ",
    title: "Monthly Sankranti & Hunnime Pooja",
    titleKn: "ಮಾಸಿಕ ಸಂಕ್ರಮಣ ಮತ್ತು ಹುಣ್ಣಿಮೆ ಪೂಜೆ",
    dateLabel: "Monthly Sankranti & Hunnime (Full Moon)",
    dateLabelKn: "ಮಾಸಿಕ ಸಂಕ್ರಮಣ ಮತ್ತು ಹುಣ್ಣಿಮೆ (ಪೌರ್ಣಮಿ)",
    isoDate: "2026-12-16T06:00:00+05:30",
    pastLabel: "Monthly Observance",
    pastLabelKn: "ಮಾಸಿಕ ವಿಶೇಷ ಆಚರಣೆ",
    image: "/images/monthly-pooja.png",
    shortInviteNote:
      "Monthly auspicious Alankara Pooja, Hunnime Pooja, Trimadhura Naivedya, and evening Karpoora Arati.",
    shortInviteNoteKn:
      "ಮಾಸಿಕ ವಿಶೇಷ ಅಲಂಕಾರ ಪೂಜೆ, ಹುಣ್ಣಿಮೆ ಪೂಜೆ, ತ್ರಿಮಧುರ ನೈವೇದ್ಯ ಮತ್ತು ಸಂಜೆ ಕರ್ಪೂರ ಆರತಿ.",
    fullDescription:
      "Observed every month on auspicious Sankranti and Hunnime (Full Moon) days strictly in accordance with the temple's monthly pooja schedule, devotees offer Alankara Pooja, Huvina Pooja, Trimadhura Naivedya, Kumkumarchane, Lalita Sahasranamarchane, and evening Karpoora Arati.",
    fullDescriptionKn:
      "ಪ್ರತಿ ತಿಂಗಳ ಶುಭ ಸಂಕ್ರಮಣ ಮತ್ತು ಹುಣ್ಣಿಮೆ ದಿನಗಳಂದು ಶ್ರೀ ಕ್ಷೇತ್ರದ ಮಾಸಿಕ ಪೂಜಾ ಪದ್ಧತಿಯಂತೆ ಅಲಂಕಾರ ಪೂಜೆ, ಹೂವಿನ ಪೂಜೆ, ತ್ರಿಮಧುರ ನೈವೇದ್ಯ, ಕುಂಕುಮಾರ್ಚನೆ, ಲಲಿತಾ ಸಹಸ್ರನಾಮಾರ್ಚನೆ ಹಾಗೂ ಸಂಜೆ ಕರ್ಪೂರ ಆರತಿ ನೆರವೇರಿಸಲಾಗುತ್ತದೆ.",
    scheduleDisclaimer:
      "Tentative monthly timings — exact Sankranti & Hunnime dates follow the Udupi Panchanga",
    scheduleDisclaimerKn:
      "ಸಂಭಾವ್ಯ ಮಾಸಿಕ ವೇಳಾಪಟ್ಟಿ — ಸಂಕ್ರಮಣ ಮತ್ತು ಹುಣ್ಣಿಮೆಯ ನಿಖರ ದಿನಾಂಕಗಳು ಉಡುಪಿ ಪಂಚಾಂಗದ ಪ್ರಕಾರ ಇರುತ್ತವೆ",
    schedule: [
      {
        time: "07:30 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 07:30",
        title: "Morning Alankara Pooja & Huvina Pooja",
        titleKn: "ಬೆಳಗಿನ ಅಲಂಕಾರ ಪೂಜೆ ಮತ್ತು ಹೂವಿನ ಪೂಜೆ",
        note: "Special morning floral alankara and Huvina Pooja offered at the sanctum.",
        noteKn:
          "ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಶ್ರೀ ದೇವಿಗೆ ಬೆಳಗಿನ ವಿಶೇಷ ಅಲಂಕಾರ ಪೂಜೆ ಮತ್ತು ಹೂವಿನ ಪೂಜೆ.",
      },
      {
        time: "11:30 AM",
        timeKn: "ಬೆಳಿಗ್ಗೆ 11:30",
        title: "Trimadhura Naivedya, Kumkumarchane & Lalita Sahasranamarchane",
        titleKn: "ತ್ರಿಮಧುರ ನೈವೇದ್ಯ, ಕುಂಕುಮಾರ್ಚನೆ ಮತ್ತು ಲಲಿತಾ ಸಹಸ್ರನಾಮಾರ್ಚನೆ",
        note: "Sacred Trimadhura Naivedya offering accompanied by Kumkumarchane and Lalita Sahasranamarchane.",
        noteKn:
          "ಶ್ರೀ ದೇವಿಗೆ ಪವಿತ್ರ ತ್ರಿಮಧುರ ನೈವೇದ್ಯ ಸಮರ್ಪಣೆ, ಕುಂಕುಮಾರ್ಚನೆ ಹಾಗೂ ಲಲಿತಾ ಸಹಸ್ರನಾಮಾರ್ಚನೆ.",
      },
      {
        time: "07:00 PM",
        timeKn: "ರಾತ್ರಿ 07:00",
        title: "Evening Hunnime / Sankranti Mahapooja & Karpoora Arati",
        titleKn: "ಸಂಜೆ ಹುಣ್ಣಿಮೆ / ಸಂಕ್ರಮಣ ಮಹಾಪೂಜೆ ಮತ್ತು ಕರ್ಪೂರ ಆರತಿ",
        note: "Evening special Hunnime / Sankranti Mahapooja concluding with Karpoora Arati and prasada.",
        noteKn:
          "ಸಂಜೆಯ ವಿಶೇಷ ಹುಣ್ಣಿಮೆ / ಸಂಕ್ರಮಣ ಮಹಾಪೂಜೆ, ಕರ್ಪೂರ ಆರತಿ ಹಾಗೂ ತೀರ್ಥ ಪ್ರಸಾದ ವಿತರಣೆ.",
      },
    ],
    sevaType: "Hunnime Pooja",
    sevaTypeKn: "ಹುಣ್ಣಿಮೆ ಪೂಜೆ",
    ctaLabel: "Book a Monthly Seva",
    ctaLabelKn: "ಮಾಸಿಕ ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ",
  },
];

export interface TrustObjectiveItem {
  id: string;
  title: string;
  titleKn: string;
  description: string;
  descriptionKn: string;
}

export interface TrustProfile {
  legalName: string;
  legalNameKn: string;
  educationalWing: string;
  educationalWingKn: string;
  registrationDetails: string;
  registrationDetailsKn: string;
  officialAddress: string;
  officialAddressKn: string;
  founderLabel: string;
  founderLabelKn: string;
  founderName: string;
  founderNameKn: string;
  motto: string;
  mottoKn: string;
  mottoSubline: string;
  mottoSublineKn: string;
  heritageSummary: string;
  heritageSummaryKn: string;
  inclusionNote: string;
  inclusionNoteKn: string;
  coreObjectives: TrustObjectiveItem[];
}

export interface EducationTierItem {
  id: string;
  label: string;
  labelKn: string;
  amountLabel: string;
  amountLabelKn: string;
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

export type SocialPlatform = "youtube" | "instagram" | "facebook" | "whatsapp";

export interface SocialLinkItem {
  id: SocialPlatform;
  label: string;
  labelKn: string;
  url: string;
}

export interface SocialConnectLabels {
  floatingLabel: string;
  floatingLabelKn: string;
  sectionHeading: string;
  sectionHeadingKn: string;
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
    id: "huvina-pooja",
    name: "Huvina Pooja",
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
  trustProfile: TrustProfile;
  educationTiers: EducationTierItem[];
  navigation: NavItem[];
  heroCtas: HeroCtaItem[];
  committee: CommitteeMember[];
  aartiTimings: AartiTiming[];
  darshanTimings: DarshanTimings;
  events: EventItem[];
  gallery: GalleryItem[];
  contact: ContactInfo;
  socialLinks: SocialLinkItem[];
  socialConnectLabels: SocialConnectLabels;
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
  trustProfile: {
    legalName: "Shree Durgaparameshwari Sannidana Trust, Udupi",
    legalNameKn: "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಟ್ರಸ್ಟ್, ಉಡುಪಿ",
    educationalWing:
      "Conductors of Shree Durgaparameshwari Education Trust (Vidyanidhi)",
    educationalWingKn:
      "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಎಜುಕೇಶನ್ ಟ್ರಸ್ಟ್ (ವಿದ್ಯಾನಿಧಿ) ಸಂಚಾಲಕರು",
    registrationDetails:
      "Established in 2007 and formally registered on 4th November 2008 at the Sub-Registrar Office, Udupi (Reg. No. IV-85/2008-09).",
    registrationDetailsKn:
      "2007ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾಗಿ, 4 ನವೆಂಬರ್ 2008ರಂದು ಉಡುಪಿ ಉಪನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಅಧಿಕೃತವಾಗಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ (ನೋಂದಣಿ ಸಂಖ್ಯೆ: IV-85/2008-09).",
    officialAddress:
      "Shree Devi Kripa, Ullur Village, Kemundel Post, Via Yermal, Udupi Taluk & District – 574 119, Karnataka",
    officialAddressKn:
      "ಶ್ರೀ ದೇವಿ ಕೃಪಾ, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಕೆಮುಂಡೇಲ್ ಪೋಸ್ಟ್, ಯರ್ಮಾಳ್ ಮೂಲಕ, ಉಡುಪಿ ತಾಲೂಕು ಮತ್ತು ಜಿಲ್ಲೆ – 574 119, ಕರ್ನಾಟಕ",
    founderLabel: "Founder & Chief Archaka",
    founderLabelKn: "ಸಂಸ್ಥಾಪಕರು ಮತ್ತು ಪ್ರಧಾನ ಅರ್ಚಕರು",
    founderName: "Sri Dinesh Shanthi",
    founderNameKn: "ಶ್ರೀ ದಿನೇಶ್ ಶಾಂತಿ",
    motto:
      "Be Strong by Unity, Be Independent by Education — Brahmashree Narayana Guru",
    mottoKn:
      "ಸಂಘಟನೆಯಿಂದ ಬಲಯುತರಾಗಿ, ವಿದ್ಯೆಯಿಂದ ಸ್ವತಂತ್ರರಾಗಿ — ಬ್ರಹ್ಮಶ್ರೀ ನಾರಾಯಣ ಗುರು",
    mottoSubline:
      "Guiding principle behind our community unity and Vidyanidhi educational support for deserving students.",
    mottoSublineKn:
      "ನಮ್ಮ ಸಮುದಾಯದ ಒಗ್ಗಟ್ಟು ಮತ್ತು ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನೀಡುವ ವಿದ್ಯಾನಿಧಿ ಶೈಕ್ಷಣಿಕ ನೆರವಿನ ಮಾರ್ಗದರ್ಶಿ ತತ್ವ.",
    heritageSummary:
      "Rooted in devotion and community service at Ullur, the Trust is dedicated to preserving active temple sevas — Daily Poojas, Navaratri & Dussehra celebrations, Varshika Utsava, Chandika Homa, and Anna Santarpana — and supporting deserving students through Vidyanidhi Education Aid.",
    heritageSummaryKn:
      "ಉಳ್ಳೂರಿನಲ್ಲಿ ಭಕ್ತಿ ಮತ್ತು ಸಮಾಜ ಸೇವೆಯಲ್ಲಿ ಬೇರೂರಿರುವ ಈ ಟ್ರಸ್ಟ್, ನಿತ್ಯ ಪೂಜೆಗಳು, ನವರಾತ್ರಿ ಮತ್ತು ದಸರಾ ಉತ್ಸವಗಳು, ವಾರ್ಷಿಕ ಉತ್ಸವ, ಚಂಡಿಕಾ ಹೋಮ ಹಾಗೂ ಅನ್ನಸಂತರ್ಪಣೆಯಂತಹ ದೇವಾಲಯ ಸೇವೆಗಳನ್ನು ಉಳಿಸಿಕೊಂಡು ಬರುವುದರ ಜೊತೆಗೆ ವಿದ್ಯಾನಿಧಿ ಶೈಕ್ಷಣಿಕ ನೆರವಿನ ಮೂಲಕ ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಬೆಂಬಲ ನೀಡಲು ಸಮರ್ಪಿತವಾಗಿದೆ.",
    inclusionNote:
      "All Trust benefits and charitable initiatives are open to everyone irrespective of caste, creed, or religion.",
    inclusionNoteKn:
      "ಟ್ರಸ್ಟ್‌ನ ಎಲ್ಲಾ ಸೇವಾ ಯೋಜನೆಗಳು ಮತ್ತು ಧರ್ಮಕಾರ್ಯಗಳು ಜಾತಿ, ಮತ ಅಥವಾ ಧರ್ಮದ ಭೇದಭಾವವಿಲ್ಲದೆ ಎಲ್ಲರಿಗೂ ಮುಕ್ತವಾಗಿವೆ.",
    coreObjectives: [
      {
        id: "worship-utsava",
        title: "Daily Poojas & Sacred Utsavas",
        titleKn: "ನಿತ್ಯ ಪೂಜೆ ಮತ್ತು ವಾರ್ಷಿಕ ಉತ್ಸವಗಳು",
        description:
          "Preserving Daily Poojas, Varshika Utsava, Chandika Homa, and community Anna Santarpana.",
        descriptionKn:
          "ನಿತ್ಯ ಪೂಜೆಗಳು, ವಾರ್ಷಿಕ ಉತ್ಸವ, ಚಂಡಿಕಾ ಹೋಮ ಹಾಗೂ ಸಾರ್ವಜನಿಕ ಅನ್ನಸಂತರ್ಪಣೆ.",
      },
      {
        id: "vidyanidhi",
        title: "Vidyanidhi Education Aid",
        titleKn: "ವಿದ್ಯಾನಿಧಿ ಶೈಕ್ಷಣಿಕ ನೆರವು",
        description:
          "Supporting deserving students with scholarships, free notebooks, uniforms, and merit cash awards.",
        descriptionKn:
          "ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ, ಉಚಿತ ನೋಟ್‌ಬುಕ್‌ಗಳು, ಸಮವಸ್ತ್ರ ಮತ್ತು ಪ್ರತಿಭಾ ಪುರಸ್ಕಾರ ನಗದು ಬಹುಮಾನಗಳು.",
      },
    ],
  },
  educationTiers: [
    {
      id: "primary",
      label: "Primary School Student Support",
      labelKn: "ಪ್ರಾಥಮಿಕ ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿ ಬೆಂಬಲ",
      amountLabel: "₹3,000",
      amountLabelKn: "₹3,000",
    },
    {
      id: "puc",
      label: "Higher Secondary (PUC) Student Support",
      labelKn: "ಪದವಿಪೂರ್ವ (PUC) ವಿದ್ಯಾರ್ಥಿ ಬೆಂಬಲ",
      amountLabel: "₹7,000",
      amountLabelKn: "₹7,000",
    },
    {
      id: "college",
      label: "College Level Student Support",
      labelKn: "ಕಾಲೇಜು ಹಂತದ ವಿದ್ಯಾರ್ಥಿ ಬೆಂಬಲ",
      amountLabel: "₹10,000 & above",
      amountLabelKn: "₹10,000 ಮತ್ತು ಮೇಲ್ಪಟ್ಟು",
    },
  ],
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
  events: eventsData,
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
  socialLinks: [
    {
      id: "youtube",
      label: "YouTube",
      labelKn: "ಯೂಟ್ಯೂಬ್",
      url: "https://www.youtube.com/@ShriDurgaParameshwariUllur/shorts",
    },
    {
      id: "instagram",
      label: "Instagram",
      labelKn: "ಇನ್ಸ್ಟಾಗ್ರಾಮ್",
      url: "https://www.instagram.com/shri_durgaparameshwari_ullur/",
    },
    {
      id: "facebook",
      label: "Facebook",
      labelKn: "ಫೇಸ್ಬುಕ್",
      url: "https://www.facebook.com/61595604200198/",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      labelKn: "ವಾಟ್ಸಾಪ್",
      url: "https://wa.me/919820790032",
    },
  ],
  socialConnectLabels: {
    floatingLabel: "Connect",
    floatingLabelKn: "ಸಂಪರ್ಕಿಸಿ",
    sectionHeading: "Connect With Us",
    sectionHeadingKn: "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ",
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
