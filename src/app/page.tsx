import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import TimingsSection from "@/components/TimingsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-amber-900">
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Task 5: About, Temple History & Managing Committee Section */}
        <AboutSection />

        {/* Task 6: Timings & Services Section with Tabs */}
        <TimingsSection />
      </main>

      {/* Temple Trust Footer */}
      <Footer />
    </div>
  );
}
