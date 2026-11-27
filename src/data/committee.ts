export type CommitteeGender = "male" | "female";

export type CommitteeSectionId =
  | "core-office-bearers"
  | "priests-and-convener"
  | "executive-committee"
  | "womens-wing-and-advisory";

export interface CommitteeMemberRecord {
  id: string;
  name: string;
  nameKn: string;
  role: string;
  roleKn: string;
  gender: CommitteeGender;
  sectionId: CommitteeSectionId;
  subGroup?: "womens-wing" | "advisory-committee";
  subGroupLabel?: string;
  subGroupLabelKn?: string;
}

export interface ResolvedCommitteeMember extends CommitteeMemberRecord {
  image: string;
  isPlaceholder: boolean;
}

export interface CommitteeSectionMeta {
  id: CommitteeSectionId;
  title: string;
  titleKn: string;
  subtitle: string;
  subtitleKn: string;
}

export interface ResolvedCommitteeSection extends CommitteeSectionMeta {
  members: ResolvedCommitteeMember[];
}

export const COMMITTEE_TERM_META = {
  termShort: "Term 2026–2028 • Shri Durgaparameshwari Sannidhana (Regd.)",
  termShortKn: "ಅವಧಿ 2026–2028 • ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ (ರಿ.)",
  termFullBadge:
    "New Managing Committee for the Term 2026–2028 (Formed at Annual Meeting on May 11, 2026)",
  termFullBadgeKn:
    "2026–2028ನೇ ಸಾಲಿನ ನೂತನ ವ್ಯವಸ್ಥಾಪನಾ ಸಮಿತಿ (ಮೇ 11, 2026ರ ವಾರ್ಷಿಕ ಸಭೆಯಲ್ಲಿ ರಚಿಸಲಾಗಿದೆ)",
};

export const HOMEPAGE_LEADER_IDS: readonly string[] = [
  "shekhar-shanthi",
  "harish-kotian",
  "dhananjay-shanthi",
  "dinesh-shanthi",
];

export const COMMITTEE_SECTIONS_META: CommitteeSectionMeta[] = [
  {
    id: "core-office-bearers",
    title: "Core Office Bearers",
    titleKn: "ಪ್ರಮುಖ ಪದಾಧಿಕಾರಿಗಳು",
    subtitle: "Office bearers guiding temple administration and trust welfare",
    subtitleKn: "ಕ್ಷೇತ್ರದ ಆಡಳಿತ ಮತ್ತು ಟ್ರಸ್ಟ್ ಸೇವಾ ಕಾರ್ಯಗಳ ಪ್ರಮುಖ ಪದಾಧಿಕಾರಿಗಳು",
  },
  {
    id: "priests-and-convener",
    title: "Priests & Convener",
    titleKn: "ಅರ್ಚಕ ವೃಂದ ಮತ್ತು ಸಂಚಾಲಕರು",
    subtitle: "Sanctum clergy performing daily poojas, utsavas, and sevas",
    subtitleKn: "ನಿತ್ಯ ಪೂಜೆ, ಉತ್ಸವ ಹಾಗೂ ಧಾರ್ಮಿಕ ಕೈಂಕರ್ಯಗಳನ್ನು ನೆರವೇರಿಸುವ ಅರ್ಚಕ ವೃಂದ ಮತ್ತು ಸಂಚಾಲಕರು",
  },
  {
    id: "executive-committee",
    title: "Executive Committee Members",
    titleKn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
    subtitle: "Members supporting festival organization and Vidyanidhi outreach",
    subtitleKn: "ಉತ್ಸವ ಆಯೋಜನೆ ಮತ್ತು ವಿದ್ಯಾನಿಧಿ ಸಮಾಜಮುಖಿ ಕಾರ್ಯಗಳ ಕಾರ್ಯಕಾರಿ ಸದಸ್ಯರು",
  },
  {
    id: "womens-wing-and-advisory",
    title: "Women's Wing & Advisory Committee",
    titleKn: "ಮಹಿಳಾ ವಿಭಾಗ ಮತ್ತು ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    subtitle: "Women's Wing leadership and advisory members serving temple initiatives",
    subtitleKn: "ಮಹಿಳಾ ವಿಭಾಗದ ಪದಾಧಿಕಾರಿಗಳು ಹಾಗೂ ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿಯ ಸದಸ್ಯರು",
  },
];

export const COMMITTEE_ROSTER_2026_2028: CommitteeMemberRecord[] = [
  // Section A — Core Office Bearers (8)
  {
    id: "vasanth-c-kotian",
    name: "Shri Vasanth C. Kotian",
    nameKn: "ಶ್ರೀ ವಸಂತ್ ಸಿ. ಕೋಟ್ಯಾನ್",
    role: "Honorary President",
    roleKn: "ಗೌರವಾಧ್ಯಕ್ಷರು",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "shekhar-shanthi",
    name: "Shri Shekhar Shanthi",
    nameKn: "ಶ್ರೀ ಶೇಖರ್ ಶಾಂತಿ",
    role: "President",
    roleKn: "ಅಧ್ಯಕ್ಷರು",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "jagannath-t-kotian",
    name: "Shri Jagannath T. Kotian",
    nameKn: "ಶ್ರೀ ಜಗನ್ನಾಥ್ ಟಿ. ಕೋಟ್ಯಾನ್",
    role: "Vice President",
    roleKn: "ಉಪಾಧ್ಯಕ್ಷರು",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "sudhakar-k-poojary",
    name: "Shri Sudhakar K. Poojary",
    nameKn: "ಶ್ರೀ ಸುಧಾಕರ್ ಕೆ. ಪೂಜಾರಿ",
    role: "Vice President",
    roleKn: "ಉಪಾಧ್ಯಕ್ಷರು",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "harish-kotian",
    name: "Shri Harish Kotian",
    nameKn: "ಶ್ರೀ ಹರೀಶ್ ಕೋಟ್ಯಾನ್",
    role: "Honorary General Secretary",
    roleKn: "ಗೌರವ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "kishan-kotian",
    name: "Shri Kishan Kotian",
    nameKn: "ಶ್ರೀ ಕಿಶನ್ ಕೋಟ್ಯಾನ್",
    role: "Joint Secretary",
    roleKn: "ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "jayarama-u-poojary",
    name: "CS Jayarama U. Poojary",
    nameKn: "ಸಿ.ಎಸ್. ಜಯರಾಮ ಯು. ಪೂಜಾರಿ",
    role: "Treasurer",
    roleKn: "ಕೋಶಾಧಿಕಾರಿ",
    gender: "male",
    sectionId: "core-office-bearers",
  },
  {
    id: "nitin-amin",
    name: "Shri Nitin Amin",
    nameKn: "ಶ್ರೀ ನಿತಿನ್ ಅಮೀನ್",
    role: "Joint Treasurer",
    roleKn: "ಜೊತೆ ಕೋಶಾಧಿಕಾರಿ",
    gender: "male",
    sectionId: "core-office-bearers",
  },

  // Section B — Priests & Convener (3)
  {
    id: "dinesh-shanthi",
    name: "Shri Dinesh Shanthi",
    nameKn: "ಶ್ರೀ ದಿನೇಶ್ ಶಾಂತಿ",
    role: "Head Priest",
    roleKn: "ಪ್ರಧಾನ ಅರ್ಚಕರು",
    gender: "male",
    sectionId: "priests-and-convener",
  },
  {
    id: "shankar-shanthi",
    name: "Shri Shankar Shanthi",
    nameKn: "ಶ್ರೀ ಶಂಕರ್ ಶಾಂತಿ",
    role: "Assistant Priest",
    roleKn: "ಸಹಾಯಕ ಅರ್ಚಕರು",
    gender: "male",
    sectionId: "priests-and-convener",
  },
  {
    id: "dhananjay-shanthi",
    name: "Shri Dhananjay Shanthi",
    nameKn: "ಶ್ರೀ ಧನಂಜಯ ಶಾಂತಿ",
    role: "Convener",
    roleKn: "ಸಂಚಾಲಕರು",
    gender: "male",
    sectionId: "priests-and-convener",
  },

  // Section C — Executive Committee Members (4)
  {
    id: "kishore-poojary",
    name: "Shri Kishore Poojary",
    nameKn: "ಶ್ರೀ ಕಿಶೋರ್ ಪೂಜಾರಿ",
    role: "Executive Committee Member",
    roleKn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
    gender: "male",
    sectionId: "executive-committee",
  },
  {
    id: "dayananda-shanthi",
    name: "Shri Dayananda Shanthi",
    nameKn: "ಶ್ರೀ ದಯಾನಂದ ಶಾಂತಿ",
    role: "Executive Committee Member",
    roleKn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
    gender: "male",
    sectionId: "executive-committee",
  },
  {
    id: "chandra-shekhar",
    name: "Smt. Chandra Shekhar",
    nameKn: "ಶ್ರೀಮತಿ ಚಂದ್ರ ಶೇಖರ್",
    role: "Executive Committee Member",
    roleKn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
    gender: "female",
    sectionId: "executive-committee",
  },
  {
    id: "shashikala-sudhakar",
    name: "Smt. Shashikala Sudhakar",
    nameKn: "ಶ್ರೀಮತಿ ಶಶಿಕಲಾ ಸುಧಾಕರ್",
    role: "Executive Committee Member",
    roleKn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
    gender: "female",
    sectionId: "executive-committee",
  },

  // Section D — Women's Wing & Women's Advisory Committee (8)
  {
    id: "shakuntala-gopal-poojary",
    name: "Smt. Shakuntala Gopal Poojary",
    nameKn: "ಶ್ರೀಮತಿ ಶಕುಂತಲಾ ಗೋಪಾಲ್ ಪೂಜಾರಿ",
    role: "Women's Wing President",
    roleKn: "ಮಹಿಳಾ ವಿಭಾಗದ ಅಧ್ಯಕ್ಷರು",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "womens-wing",
    subGroupLabel: "Women's Wing",
    subGroupLabelKn: "ಮಹಿಳಾ ವಿಭಾಗ",
  },
  {
    id: "sowmyashree-amin",
    name: "Smt. Sowmyashree Amin",
    nameKn: "ಶ್ರೀಮತಿ ಸೌಮ್ಯಶ್ರೀ ಅಮೀನ್",
    role: "Women's Wing Secretary",
    roleKn: "ಮಹಿಳಾ ವಿಭಾಗದ ಕಾರ್ಯದರ್ಶಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "womens-wing",
    subGroupLabel: "Women's Wing",
    subGroupLabelKn: "ಮಹಿಳಾ ವಿಭಾಗ",
  },
  {
    id: "shobha-anchan",
    name: "Smt. Shobha Anchan",
    nameKn: "ಶ್ರೀಮತಿ ಶೋಭಾ ಅಂಚನ್",
    role: "Women's Advisory Committee",
    roleKn: "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "advisory-committee",
    subGroupLabel: "Advisory Committee",
    subGroupLabelKn: "ಸಲಹಾ ಸಮಿತಿ",
  },
  {
    id: "jayanthi",
    name: "Smt. Jayanthi",
    nameKn: "ಶ್ರೀಮತಿ ಜಯಂತಿ",
    role: "Women's Advisory Committee",
    roleKn: "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "advisory-committee",
    subGroupLabel: "Advisory Committee",
    subGroupLabelKn: "ಸಲಹಾ ಸಮಿತಿ",
  },
  {
    id: "divya-amit",
    name: "Smt. Divya Amit",
    nameKn: "ಶ್ರೀಮತಿ ದಿವ್ಯಾ ಅಮಿತ್",
    role: "Women's Advisory Committee",
    roleKn: "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "advisory-committee",
    subGroupLabel: "Advisory Committee",
    subGroupLabelKn: "ಸಲಹಾ ಸಮಿತಿ",
  },
  {
    id: "shwetha-kishore-poojary",
    name: "Smt. Shwetha Kishore Poojary",
    nameKn: "ಶ್ರೀಮತಿ ಶ್ವೇತಾ ಕಿಶೋರ್ ಪೂಜಾರಿ",
    role: "Women's Advisory Committee",
    roleKn: "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "advisory-committee",
    subGroupLabel: "Advisory Committee",
    subGroupLabelKn: "ಸಲಹಾ ಸಮಿತಿ",
  },
  {
    id: "kaushalya-poojary",
    name: "Kum. Kaushalya Poojary",
    nameKn: "ಕುಮಾರಿ ಕೌಶಲ್ಯ ಪೂಜಾರಿ",
    role: "Women's Advisory Committee",
    roleKn: "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "advisory-committee",
    subGroupLabel: "Advisory Committee",
    subGroupLabelKn: "ಸಲಹಾ ಸಮಿತಿ",
  },
  {
    id: "shravya",
    name: "Kum. Shravya",
    nameKn: "ಕುಮಾರಿ ಶ್ರಾವ್ಯ",
    role: "Women's Advisory Committee",
    roleKn: "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ",
    gender: "female",
    sectionId: "womens-wing-and-advisory",
    subGroup: "advisory-committee",
    subGroupLabel: "Advisory Committee",
    subGroupLabelKn: "ಸಲಹಾ ಸಮಿತಿ",
  },
];
