"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/actions/contact";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = await submitContactForm(data);
    
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "An error occurred.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-hbf-cream min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-hbf-green/5">
            <h1 className="text-4xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-4">
              Get in Touch
            </h1>
            <p className="text-hbf-muted mb-8">
              Fill out the form below and your message will be sent directly to our team.
            </p>

            {status === "success" ? (
              <div className="bg-green-50 text-hbf-green p-8 rounded-3xl text-center border border-green-100">
                <CheckCircle2 className="mx-auto mb-4 w-12 h-12" />
                <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                <p>Thank you for reaching out. We will get back to you soon.</p>
                <Button 
                  onClick={() => setStatus("idle")} 
                  className="mt-6 bg-hbf-green hover:bg-hbf-green-light"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hbf-dark ml-1">Name</label>
                    <Input name="name" placeholder="Your name" required className="rounded-xl border-hbf-green/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hbf-dark ml-1">Email</label>
                    <Input name="email" type="email" placeholder="email@example.com" required className="rounded-xl border-hbf-green/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hbf-dark ml-1">Subject</label>
                  <Input name="subject" placeholder="What is this about?" required className="rounded-xl border-hbf-green/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-hbf-dark ml-1">Message</label>
                  <Textarea name="message" placeholder="Your message here..." required className="rounded-xl border-hbf-green/10 min-h-[150px]" />
                </div>
                
                {status === "error" && (
                  <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {errorMsg}
                  </p>
                )}

                <Button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full h-14 rounded-xl bg-hbf-green hover:bg-hbf-green-light text-white font-bold text-lg"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
