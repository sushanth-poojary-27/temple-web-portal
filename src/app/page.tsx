import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import FloatingSocialPill from "@/components/FloatingSocialPill";
import { getHomepageCommitteePreview } from "@/lib/committee.server";
import { getGalleryCategories } from "@/lib/gallery.server";

export default function Home() {
  const galleryCategories = getGalleryCategories();
  const homepageLeaders = getHomepageCommitteePreview();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-amber-50 text-amber-900">
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 max-w-full">
        {/* Hero Banner Section */}
        <Hero />

        {/* Task 5: About, Temple History & Managing Committee Section */}
        <AboutSection leaders={homepageLeaders} />

        {/* Task 7: Upcoming Temple Festivals & Events with Countdown */}
        <EventsSection />

        {/* Task 8: Temple Photo Gallery (Level 1 Category Albums) */}
        <GallerySection categories={galleryCategories} />

        {/* Task 9: Location & Contact Section with Google Maps Embed */}
        <ContactSection />

        {/* Task 11 / 12: Seva Booking & Temple Donations Section */}
        <DonationSection />
      </main>

      {/* Temple Trust Footer */}
      <Footer />

      {/* Floating Social Connect Pill */}
      <FloatingSocialPill />
    </div>
  );
}
