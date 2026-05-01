"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { submitApplication } from "@/lib/actions/submit-application";

const requiredFile = (message: string) =>
  z
    .custom<FileList>()
    .refine((files) => files instanceof FileList && files.length > 0 && files[0].size > 0, message);

const optionalFile = z.custom<FileList>().optional();

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  school: z.string().min(2, "School is required"),
  grade: z.string().min(1, "Current grade is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  sex: z.enum(["Male", "Female"], { error: "Sex is required" }),
  nifCin: z.string().min(2, "NIF/CIN number is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(8, "Guardian phone is required"),
  guardianEmail: z.string().email("Invalid guardian email address"),
  essay: requiredFile("Essay file is required"),
  studentNifFile: optionalFile,
  photo: optionalFile,
  consent: z.literal(true, { error: "Consent agreement is required" }),
});

type FormData = z.infer<typeof schema>;
type FieldName = keyof FormData;

const steps: { title: string; description: string; fields: FieldName[] }[] = [
  {
    title: "Student information",
    description: "Basic identity and contact details.",
    fields: ["firstName", "lastName", "dateOfBirth", "sex", "phone", "email"],
  },
  {
    title: "School and address",
    description: "Current school information and ID.",
    fields: ["school", "grade", "address", "nifCin"],
  },
  {
    title: "Guardian",
    description: "Parent or guardian contact information.",
    fields: ["guardianName", "guardianPhone", "guardianEmail"],
  },
  {
    title: "Documents",
    description: "Upload the required documents and confirm consent.",
    fields: ["essay", "studentNifFile", "photo", "consent"],
  },
];

function inputClass(hasError?: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
    "focus:border-hbf-green focus:ring-4 focus:ring-hbf-green/10",
    hasError ? "border-red-400 bg-red-50/40" : "border-black/10",
  ].join(" ");
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-red-500">{message}</p>;
}

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const goNext = async () => {
    const isValid = await trigger(steps[currentStep].fields);
    if (isValid) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    }
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const onSubmit = async (_data: FormData, event?: React.BaseSyntheticEvent) => {
    const form = event?.target as HTMLFormElement | undefined;
    if (!form) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitApplication(new FormData(form));
      if (result.success) {
        setIsSuccess(true);
        setCurrentStep(0);
        reset();
      } else {
        setError(result.error || "An error occurred. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl border border-hbf-green/10 bg-white p-8 text-center shadow-soft sm:p-10"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hbf-green/10 text-hbf-green">
          <CheckCircle2 size={38} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-hbf-dark">Application received</h2>
          <p className="mt-2 text-sm leading-6 text-hbf-muted">
            Thank you. A confirmation email will be sent to the applicant.
          </p>
        </div>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="ghost"
          className="text-hbf-green hover:bg-hbf-green/5"
        >
          Submit another application
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft sm:p-8"
      >
        <div className="mb-8">
          <div className="mx-auto grid w-fit grid-cols-[auto_3rem_auto_3rem_auto_3rem_auto] items-center justify-center gap-2 sm:grid-cols-[auto_6rem_auto_6rem_auto_6rem_auto]">
            {steps
              .map((step, index) => {
                const isActive = index === currentStep;
                const isDone = index < currentStep;

                return (
                  <div
                    key={step.title}
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                      isActive || isDone ? "bg-hbf-green text-white" : "bg-hbf-cream text-hbf-muted",
                    ].join(" ")}
                  >
                    {isDone ? <CheckCircle2 size={18} /> : index + 1}
                  </div>
                );
              })
              .flatMap((step, index) =>
                index < steps.length - 1
                  ? [
                      step,
                      <div
                        key={`line-${index}`}
                        className={[
                          "h-0.5 w-full",
                          index < currentStep ? "bg-hbf-green" : "bg-black/10",
                        ].join(" ")}
                      />,
                    ]
                  : [step],
              )}
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hbf-orange">
              Step {currentStep + 1} of {steps.length}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">{steps[currentStep].title}</h2>
            <p className="mt-1 text-sm text-hbf-muted">{steps[currentStep].description}</p>
          </div>
        </div>

        {currentStep === 0 ? (
          <motion.div
            key="student"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">First name</label>
              <input {...register("firstName")} className={inputClass(Boolean(errors.firstName))} placeholder="First Name" />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Last name</label>
              <input {...register("lastName")} className={inputClass(Boolean(errors.lastName))} placeholder="Last Name" />
              <FieldError message={errors.lastName?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Date of birth</label>
              <input {...register("dateOfBirth")} type="date" className={inputClass(Boolean(errors.dateOfBirth))} />
              <FieldError message={errors.dateOfBirth?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Sex</label>
              <div className="grid grid-cols-2 gap-3">
                {["Male", "Female"].map((option) => (
                  <label key={option} className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm">
                    <input {...register("sex")} type="radio" value={option} className="accent-hbf-green" />
                    {option}
                  </label>
                ))}
              </div>
              <FieldError message={errors.sex?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Phone number</label>
              <input {...register("phone")} type="tel" className={inputClass(Boolean(errors.phone))} placeholder="Phone number" />
              <FieldError message={errors.phone?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Email</label>
              <input {...register("email")} type="email" className={inputClass(Boolean(errors.email))} placeholder="Email" />
              <FieldError message={errors.email?.message} />
            </div>
          </motion.div>
        ) : null}

        {currentStep === 1 ? (
          <motion.div
            key="school"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">School</label>
              <input {...register("school")} className={inputClass(Boolean(errors.school))} placeholder="School" />
              <FieldError message={errors.school?.message} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hbf-dark">Current grade</label>
                <input {...register("grade")} className={inputClass(Boolean(errors.grade))} placeholder="Current Grade" />
                <FieldError message={errors.grade?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hbf-dark">NIF/CIN number</label>
                <input {...register("nifCin")} className={inputClass(Boolean(errors.nifCin))} placeholder="ID" />
                <FieldError message={errors.nifCin?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Address</label>
              <input {...register("address")} className={inputClass(Boolean(errors.address))} placeholder="Address" />
              <FieldError message={errors.address?.message} />
            </div>
          </motion.div>
        ) : null}

        {currentStep === 2 ? (
          <motion.div
            key="guardian"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Name of guardian</label>
              <input {...register("guardianName")} className={inputClass(Boolean(errors.guardianName))} placeholder="Name" />
              <FieldError message={errors.guardianName?.message} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hbf-dark">Guardian phone number</label>
                <input
                  {...register("guardianPhone")}
                  className={inputClass(Boolean(errors.guardianPhone))}
                  placeholder="Phone number"
                />
                <FieldError message={errors.guardianPhone?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hbf-dark">Guardian email address</label>
                <input
                  {...register("guardianEmail")}
                  type="email"
                  className={inputClass(Boolean(errors.guardianEmail))}
                  placeholder="Email"
                />
                <FieldError message={errors.guardianEmail?.message} />
              </div>
            </div>
          </motion.div>
        ) : null}

        {currentStep === 3 ? (
          <motion.div
            key="documents"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-hbf-dark">Essay</label>
              <input {...register("essay")} type="file" className={inputClass(Boolean(errors.essay))} />
              <FieldError message={errors.essay?.message?.toString()} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hbf-dark">Student NIF/CIN</label>
                <input {...register("studentNifFile")} type="file" className={inputClass(Boolean(errors.studentNifFile))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hbf-dark">Photo</label>
                <input {...register("photo")} type="file" accept="image/*" className={inputClass(Boolean(errors.photo))} />
              </div>
            </div>
            <label className="flex gap-3 rounded-xl border border-black/10 bg-hbf-cream/30 p-4 text-sm leading-6 text-hbf-dark">
              <input {...register("consent")} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-hbf-green" />
              <span>
                I grant Haiti Bright Futures permission to use my name, image, and quotes from my submitted essay for
                promotional and educational purposes.
              </span>
            </label>
            <FieldError message={errors.consent?.message} />
          </motion.div>
        ) : null}

        {error ? <p className="mt-6 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600">{error}</p> : null}

        <div
          className={[
            "mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center",
            currentStep === 0 ? "sm:justify-end" : "sm:justify-between",
          ].join(" ")}
        >
          {currentStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={isSubmitting}
              className="h-12 rounded-full px-6"
            >
              <ArrowLeft size={18} />
              Back
            </Button>
          ) : null}

          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={goNext} className="h-12 rounded-full bg-hbf-green px-7 font-bold text-white">
              Continue
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-full bg-hbf-green px-7 font-bold text-white hover:bg-hbf-green/90 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending
                </>
              ) : (
                <>
                  Submit application
                  <Send size={18} />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
