import fs from "node:fs";
import path from "node:path";
import {
  COMMITTEE_ROSTER_2026_2028,
  COMMITTEE_SECTIONS_META,
  HOMEPAGE_LEADER_IDS,
  type CommitteeMemberRecord,
  type ResolvedCommitteeMember,
  type ResolvedCommitteeSection,
} from "@/data/committee";

const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

const HONORIFIC_TOKENS = new Set([
  "shri",
  "sri",
  "smt",
  "kum",
  "kumari",
  "cs",
]);

const PHONETIC_CANONICAL_MAP: Record<string, string> = {
  shanthi: "shanti",
  jagannath: "jaganath",
  jagannatha: "jaganath",
  jayarama: "jayaram",
  kotyan: "kotian",
  dayananda: "dayanand",
  shakunthala: "shakuntala",
  shakuntla: "shakuntala",
  koushalya: "kaushalya",
  vasant: "vasanth",
  vasantha: "vasanth",
  shweta: "shwetha",
  swetha: "shwetha",
  nithin: "nitin",
  jayanti: "jayanthi",
  soumyashree: "sowmyashree",
};

interface PortraitCandidate {
  filename: string;
  encodedUrl: string;
  tokens: string[];
}

function encodeCommitteeAssetUrl(filename: string): string {
  return `/assets/committee-members/${encodeURIComponent(filename)}`;
}

function normalizeNameTokens(raw: string): string[] {
  const cleaned = raw
    .toLowerCase()
    .replace(/\./g, " ")
    .replace(/[^a-z0-9\s_-]+/g, " ");

  const rawTokens = cleaned
    .split(/[\s_-]+/)
    .map((tok) => tok.trim())
    .filter(Boolean);

  const filtered = rawTokens.filter(
    (tok) => !HONORIFIC_TOKENS.has(tok) && tok.length > 1
  );

  return filtered.map((tok) => PHONETIC_CANONICAL_MAP[tok] ?? tok);
}

function scanCommitteePortraitDirectory(): {
  portraits: PortraitCandidate[];
  malePlaceholderUrl: string;
  femalePlaceholderUrl: string;
} {
  const dirPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "committee-members"
  );

  const defaultMale = encodeCommitteeAssetUrl("temp_male_member.png");
  const defaultFemale = encodeCommitteeAssetUrl("temp_female_member.png");

  if (!fs.existsSync(dirPath)) {
    return {
      portraits: [],
      malePlaceholderUrl: defaultMale,
      femalePlaceholderUrl: defaultFemale,
    };
  }

  const files = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isFile()) return false;
      const ext = path.extname(entry.name).toLowerCase();
      return SUPPORTED_IMAGE_EXTENSIONS.has(ext);
    })
    .map((entry) => entry.name)
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );

  const maleFile =
    files.find((f) => /^temp[_-]?male/i.test(f)) ?? "temp_male_member.png";
  const femaleFile =
    files.find((f) => /^temp[_-]?female/i.test(f)) ?? "temp_female_member.png";

  const portraits: PortraitCandidate[] = files
    .filter((filename) => !/^temp[_-]/i.test(filename))
    .map((filename) => {
      const baseName = path.parse(filename).name;
      return {
        filename,
        encodedUrl: encodeCommitteeAssetUrl(filename),
        tokens: normalizeNameTokens(baseName),
      };
    })
    .filter((item) => item.tokens.length > 0);

  return {
    portraits,
    malePlaceholderUrl: encodeCommitteeAssetUrl(maleFile),
    femalePlaceholderUrl: encodeCommitteeAssetUrl(femaleFile),
  };
}

function isOrderedSubset(needle: string[], haystack: string[]): boolean {
  let searchFrom = 0;
  for (const token of needle) {
    const idx = haystack.indexOf(token, searchFrom);
    if (idx === -1) return false;
    searchFrom = idx + 1;
  }
  return true;
}

function resolveAllMembers(): ResolvedCommitteeMember[] {
  const { portraits, malePlaceholderUrl, femalePlaceholderUrl } =
    scanCommitteePortraitDirectory();

  const memberTokensMap = new Map<string, string[]>();

  for (const member of COMMITTEE_ROSTER_2026_2028) {
    memberTokensMap.set(member.id, normalizeNameTokens(member.name));
  }

  return COMMITTEE_ROSTER_2026_2028.map((member: CommitteeMemberRecord) => {
    const memberTokens = memberTokensMap.get(member.id) ?? [];
    const memberKey = memberTokens.join("-");
    const memberFirstName = memberTokens[0];

    // 1. Exact normalized token sequence match (e.g. shekhar-shanti, jaganath-kotian)
    const exactMatch = portraits.find(
      (candidate) => candidate.tokens.join("-") === memberKey
    );
    if (exactMatch) {
      return {
        ...member,
        image: exactMatch.encodedUrl,
        isPlaceholder: false,
      };
    }

    // 2. Multi-token ordered subset match (e.g. shakuntala-poojary -> shakuntala gopal poojary)
    const subsetMatch = portraits.find(
      (candidate) =>
        candidate.tokens.length >= 2 &&
        isOrderedSubset(candidate.tokens, memberTokens)
    );
    if (subsetMatch) {
      return {
        ...member,
        image: subsetMatch.encodedUrl,
        isPlaceholder: false,
      };
    }

    // 3. First-name match against file's leading name token (e.g. vasant.png, chandra.png, sowmyashree-kotian.png)
    if (memberFirstName) {
      const firstNameMatch = portraits.find(
        (candidate) => candidate.tokens[0] === memberFirstName
      );
      if (firstNameMatch) {
        return {
          ...member,
          image: firstNameMatch.encodedUrl,
          isPlaceholder: false,
        };
      }
    }

    // 4. Gender-based fallback placeholder
    return {
      ...member,
      image:
        member.gender === "female" ? femalePlaceholderUrl : malePlaceholderUrl,
      isPlaceholder: true,
    };
  });
}

export function getResolvedCommitteeRoster(): ResolvedCommitteeMember[] {
  return resolveAllMembers();
}

export function getHomepageCommitteePreview(): ResolvedCommitteeMember[] {
  const resolved = resolveAllMembers();
  const byId = new Map(resolved.map((member) => [member.id, member]));
  return HOMEPAGE_LEADER_IDS.map((id) => byId.get(id)).filter(
    (item): item is ResolvedCommitteeMember => Boolean(item)
  );
}

export function getCommitteeSections(): ResolvedCommitteeSection[] {
  const resolved = resolveAllMembers();
  return COMMITTEE_SECTIONS_META.map((section) => ({
    ...section,
    members: resolved.filter((member) => member.sectionId === section.id),
  }));
}
