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
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  school: z.string().min(2, "Le nom de l'école est requis"),
  grade: z.string().min(1, "La classe est requise"),
  message: z.string().optional(),
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
        setError(result.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Une erreur inattendue est survenue.");
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
          <h2 className="text-3xl font-bold text-hbf-dark">Demande reçue !</h2>
          <p className="max-w-md text-hbf-muted mx-auto">
            Merci pour votre candidature. Un email de confirmation vient de vous être envoyé. Notre équipe examinera votre dossier avec attention.
          </p>
        </div>
        <Button onClick={() => setIsSuccess(false)} variant="ghost" className="text-hbf-green hover:bg-hbf-green/5 font-semibold">
          Soumettre une autre demande
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 rounded-[2.5rem] bg-white p-8 shadow-soft sm:p-12 border border-hbf-green/5">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Prénom</label>
            <input
              {...register("firstName")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.firstName ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="Ex: Jean"
            />
            {errors.firstName && <p className="text-xs font-medium text-red-500 ml-1">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Nom</label>
            <input
              {...register("lastName")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.lastName ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="Ex: Dupont"
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
            <label className="text-sm font-bold text-hbf-dark ml-1">Téléphone</label>
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
            <label className="text-sm font-bold text-hbf-dark ml-1">École actuelle</label>
            <input
              {...register("school")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white ${errors.school ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
              placeholder="Nom de votre établissement"
            />
            {errors.school && <p className="text-xs font-medium text-red-500 ml-1">{errors.school.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-hbf-dark ml-1">Classe</label>
            <select
              {...register("grade")}
              className={`w-full rounded-2xl border bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:bg-white appearance-none ${errors.grade ? "border-red-400 bg-red-50/30" : "border-hbf-green/10 focus:border-hbf-green"}`}
            >
              <option value="">Sélectionnez votre classe</option>
              <option value="NS1">NS1</option>
              <option value="NS2">NS2</option>
              <option value="NS3">NS3</option>
              <option value="Rheto">Rheto</option>
              <option value="Philo">Philo</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.grade && <p className="text-xs font-medium text-red-500 ml-1">{errors.grade.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-hbf-dark ml-1">Message (Optionnel)</label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full rounded-2xl border border-hbf-green/10 bg-hbf-cream/30 p-4 outline-none transition-all focus:ring-2 focus:ring-hbf-green/20 focus:border-hbf-green focus:bg-white"
            placeholder="Dites-nous en plus sur vos motivations..."
          />
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
              Envoi en cours...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Soumettre ma candidature
              <Send size={20} />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
