import type { Metadata } from "next";
import { siteData } from "@/data/siteData";
import { COMMITTEE_TERM_META } from "@/data/committee";
import { getCommitteeSections } from "@/lib/committee.server";
import CommitteePageClient from "@/components/CommitteePageClient";

export const metadata: Metadata = {
  title: `Managing Committee & Temple Priests (2026–2028) | ${siteData.trustName}`,
  description: `${COMMITTEE_TERM_META.termFullBadge} — ${siteData.trustName}.`,
};

export default function CommitteePage() {
  const sections = getCommitteeSections();

  return <CommitteePageClient sections={sections} />;
}
