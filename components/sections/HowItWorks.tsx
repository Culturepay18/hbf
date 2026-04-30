import { methodSteps } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="our-work" className="bg-hbf-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-orange">Our work</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-hbf-dark">
              Listen, build, support: a field-driven approach.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {methodSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg bg-white p-6 shadow-soft">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hbf-green text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-medium text-hbf-dark">{step.title}</h3>
                <p className="mt-3 text-sm text-hbf-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
