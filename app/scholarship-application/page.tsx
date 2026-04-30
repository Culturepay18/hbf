import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ApplicationForm } from "@/components/sections/ApplicationForm";

export const metadata = {
  title: "Candidature | Haiti Bright Futures",
  description: "Postulez pour une bourse d'études avec Haiti Bright Futures. Remplissez le formulaire pour rejoindre notre prochain programme.",
};

export default function ScholarshipApplicationPage() {
  return (
    <main className="min-h-screen bg-hbf-cream/50">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hbf-orange">Formulaire de demande</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-hbf-dark">
            Commencez votre <span className="text-hbf-green">Futur</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-hbf-muted">
            Veuillez remplir le formulaire ci-dessous avec précision. Une fois soumis, vous recevrez un email de confirmation et notre équipe vous contactera pour la suite du processus.
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
