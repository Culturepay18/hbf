import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Scholarships as ScholarshipsSection } from "@/components/sections/Scholarships";

export const metadata = {
  title: "Scholarships | Haiti Bright Futures",
  description: "Explore scholarship opportunities for Haitian youth. We support students through education and sports programs.",
};

export default function ScholarshipsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <ScholarshipsSection />
      </div>
      <Footer />
    </main>
  );
}
