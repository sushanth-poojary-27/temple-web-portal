"use client";

import type { ResolvedCommitteeMember } from "@/data/committee";
import { useLanguage } from "@/context/LanguageContext";

interface CommitteeMemberCardProps {
  member: ResolvedCommitteeMember;
  showSubGroupLabel?: boolean;
}

export default function CommitteeMemberCard({
  member,
  showSubGroupLabel = false,
}: CommitteeMemberCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group min-w-0 flex flex-col items-center text-center rounded-2xl bg-[#FDF8EE] border border-[#C59B27]/60 p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-[#7A1C1C]/70 hover:-translate-y-0.5 transition-all duration-200">
      {/* Circular Portrait */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-full overflow-hidden border-2 border-[#C59B27] bg-[#EFE6D4] shadow-sm shrink-0 mb-3">
        <img
          src={member.image}
          alt={t(member.name, member.nameKn)}
          loading="lazy"
          decoding="async"
          className="w-full h-full aspect-square rounded-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Gold Role Pill Badge */}
      <span className="inline-block max-w-full rounded-full bg-[#F7F0E2] border border-[#C59B27]/75 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-[#7A1C1C] leading-snug break-words mb-1.5">
        {t(member.role, member.roleKn)}
      </span>

      {/* Member Name */}
      <h4 className="min-w-0 max-w-full text-xs sm:text-base font-extrabold text-[#2B1810] leading-snug break-words">
        {t(member.name, member.nameKn)}
      </h4>

      {/* Optional Subtle Sub-Label (Women's Wing vs Advisory Committee) */}
      {showSubGroupLabel && member.subGroupLabel && member.subGroupLabelKn && (
        <p className="mt-1 text-[10px] sm:text-xs font-semibold text-[#9A7214] leading-tight">
          {t(member.subGroupLabel, member.subGroupLabelKn)}
        </p>
      )}
    </div>
  );
}
