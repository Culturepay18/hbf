"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitApplication } from "@/lib/actions/submit-application";
import { Button } from "@/components/ui/button";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Invalid phone number"),
  school: z.string().min(2, "School name is required"),
  grade: z.string().min(1, "Grade is required"),
  message: z.string().min(10, "Please share a bit more about your motivations (at least 10 characters)"),
});

type FormData = z.infer<typeof schema>;

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await submitApplication(data);
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setError(result.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-6 rounded-[2.5rem] bg-white p-12 text-center shadow-soft border border-hbf-green/5"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-hbf-green/10 text-hbf-green shadow-inner">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-hbf-dark">Application Received!</h2>
          <p className="max-w-md text-hbf-muted mx-auto">
            Thank you for your application. A confirmation email has been sent to your inbox. Our team will review your file with care.
          </p>
        </div>
        <Button onClick={() => setIsSuccess(false)} variant="ghost" className="text-hbf-green hover:bg-hbf-green/5 font-semibold">
          Submit another application
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 rounded-[2.5rem] bg-white p-8 shadow-soft sm:p-12 border border-hbf-green/5">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">First Name</label>
            <input
              {...register("firstName")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.firstName ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="e.g., Jean"
            />
            {errors.firstName && <p className="text-xs font-medium text-red-500 ml-1">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Last Name</label>
            <input
              {...register("lastName")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.lastName ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="e.g., Dupont"
            />
            {errors.lastName && <p className="text-xs font-medium text-red-500 ml-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.email ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="jean.dupont@email.com"
            />
            {errors.email && <p className="text-xs font-medium text-red-500 ml-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Phone</label>
            <input
              {...register("phone")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.phone ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="+509 XXXX XXXX"
            />
            {errors.phone && <p className="text-xs font-medium text-red-500 ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Current School</label>
            <input
              {...register("school")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.school ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="Name of your institution"
            />
            {errors.school && <p className="text-xs font-medium text-red-500 ml-1">{errors.school.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Grade</label>
            <select
              {...register("grade")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white appearance-none ${errors.grade ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
            >
              <option value="">Select your grade</option>
              <option value="NS1">NS1</option>
              <option value="NS2">NS2</option>
              <option value="NS3">NS3</option>
              <option value="Rheto">Rheto</option>
              <option value="Philo">Philo</option>
              <option value="Other">Other</option>
            </select>
            {errors.grade && <p className="text-xs font-medium text-red-500 ml-1">{errors.grade.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-hbf-dark ml-1">Motivation Message</label>
          <textarea
            {...register("message")}
            rows={4}
            className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.message ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
            placeholder="Tell us more about your motivations..."
          />
          {errors.message && <p className="text-xs font-medium text-red-500 ml-1">{errors.message.message}</p>}
        </div>

        {error && (
          <p className="text-sm font-bold text-red-500 text-center bg-red-50 p-3 rounded-xl">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-16 w-full rounded-2xl bg-hbf-green text-lg font-bold text-white shadow-lift hover:bg-hbf-green/90 disabled:opacity-70 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={24} />
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Submit My Application
              <Send size={20} />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
