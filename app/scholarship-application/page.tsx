import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ApplicationForm } from "@/components/sections/ApplicationForm";

export const metadata = {
  title: "Scholarship Application | Haiti Bright Futures",
  description: "Apply for a scholarship with Haiti Bright Futures. Fill out the form to join our next program and build your future.",
};

export default function ScholarshipApplicationPage() {
  return (
    <main className="min-h-screen bg-hbf-cream/50">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hbf-orange">Scholarship Application</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)]">
            Start Your <span className="text-hbf-green">Future</span> Today
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-hbf-muted">
            Please fill out the form below with accuracy. Once submitted, you will receive a confirmation email and our team will contact you for the next steps of the process.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
