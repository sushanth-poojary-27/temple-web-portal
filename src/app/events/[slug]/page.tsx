import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventsData, siteData } from "@/data/siteData";
import EventDetailClient from "@/components/EventDetailClient";

export function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.find((item) => item.slug === slug);

  if (!event) {
    return {
      title: `Event Not Found | ${siteData.trustName}`,
    };
  }

  return {
    title: `${event.title} | ${siteData.trustName}`,
    description: event.shortInviteNote,
    openGraph: {
      title: `${event.title} — ${event.dateLabel}`,
      description: event.shortInviteNote,
      images: [
        {
          url: event.image,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = eventsData.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
