"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "form" | "sent";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep]     = useState<Step>("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: call real API
    setTimeout(() => {
      setLoading(false);
      setStep("sent");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex flex-col items-center justify-start pt-12 px-6 pb-20">

      {/* Back */}
      <div className="w-full max-w-[480px] mb-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-[#0e1133] font-bold text-sm hover:opacity-70 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Retour à la connexion
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] px-10 py-12 flex flex-col items-center">

        {step === "form" ? (
          <>
            {/* Tilted title */}
            <div className="mb-10">
              <h1 className="text-[32px] font-black text-white bg-[#1a73e8] px-8 py-2 rounded-lg -rotate-1 tracking-tight leading-tight select-none text-center">
                Mot de passe oublié ?
              </h1>
            </div>

            {/* Envelope icon */}
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
            </div>

            <p className="text-sm text-muted-foreground text-center leading-relaxed mb-8 px-2">
              Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#0e1133]">Adresse e-mail</Label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#1a73e8]/20 focus-visible:border-[#1a73e8]/40"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] text-base font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                    Envoi en cours…
                  </div>
                ) : "Envoyer le lien"}
              </Button>
            </form>

            <p className="text-[13px] text-muted-foreground font-medium mt-8">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link href="/login" className="text-[#1a73e8] font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-black text-[#0e1133] text-center mb-3 tracking-tight">
                E-mail envoyé !
              </h2>
              <p className="text-sm text-muted-foreground text-center leading-relaxed px-2">
                Un lien de réinitialisation a été envoyé à{" "}
                <span className="font-bold text-[#0e1133]">{email}</span>.
                Vérifiez votre boîte de réception (et vos spams).
              </p>
            </div>

            {/* Resend */}
            <div className="w-full space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-[#1a73e8] text-[#1a73e8] font-bold hover:bg-blue-50 transition-all"
                onClick={() => { setStep("form"); setEmail(""); }}
              >
                Renvoyer le lien
              </Button>
              <Link href="/login">
                <Button className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] text-base font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all">
                  Retour à la connexion
                </Button>
              </Link>
            </div>

            <p className="text-[11px] text-center text-muted-foreground leading-relaxed mt-8 px-2">
              Si vous ne recevez pas l&apos;e-mail dans les 5 minutes, vérifiez votre dossier spam ou contactez notre{" "}
              <Link href="/contact" className="underline font-semibold text-[#0e1133]">support</Link>.
            </p>
          </>
        )}

      </div>
    </div>
  );
}
