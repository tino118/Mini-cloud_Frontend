"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ── Icons ─────────────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
    </svg>
  );
}

// ── Main (wrapped in Suspense to read searchParams) ───────────────────────────

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // All checkout state is forwarded via query params
  const plan       = searchParams.get("plan")       || "starter";
  const period     = searchParams.get("period")     || "12";
  const total      = searchParams.get("total")      || "0";
  const monitoring = searchParams.get("monitoring") || "false";

  // Builds the payment URL preserving all cart state
  const paymentUrl = `/checkout/payment?plan=${plan}&period=${period}&total=${total}&monitoring=${monitoring}`;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    // TODO: hook to real auth API
    // For now, forward directly to payment page
    setTimeout(() => {
      router.push(paymentUrl);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex flex-col items-center justify-start pt-12 px-6 pb-20">

      {/* Back */}
      <div className="w-full max-w-[480px] mb-8">
        <Link
          href={`/checkout?plan=${plan}`}
          className="inline-flex items-center gap-1.5 text-[#0e1133] font-bold text-sm hover:opacity-70 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Retour
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] px-10 py-12 flex flex-col items-center">

        {/* Tilted title — matching the screenshot */}
        <div className="mb-10">
          <h1 className="text-[38px] font-black text-white bg-[#1a73e8] px-10 py-2 rounded-lg -rotate-1 tracking-tight leading-tight select-none">
            S&apos;inscrire
          </h1>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <button
            type="button"
            onClick={() => router.push(paymentUrl)}
            className="h-14 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-[#0e1133]"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            onClick={() => router.push(paymentUrl)}
            className="h-14 rounded-xl bg-[#24292e] hover:bg-[#1a1e23] transition-colors flex items-center justify-center gap-2 text-sm font-medium text-white"
          >
            <GithubIcon />
            Github
          </button>
        </div>

        {/* Divider */}
        <div className="relative w-full mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"/>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-muted-foreground font-medium">ou</span>
          </div>
        </div>

        {/* Form */}
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

          <div className="space-y-2 relative">
            <Label className="text-sm font-bold text-[#0e1133]">Mot de passe</Label>
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 pr-12 rounded-xl border-gray-200 focus-visible:ring-[#1a73e8]/20 focus-visible:border-[#1a73e8]/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] text-base font-bold rounded-xl mt-2 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                Création du compte…
              </div>
            ) : "S'inscrire"}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-[15px] text-[#0e1133] font-medium mt-7">
          Vous avez déjà un compte ?{" "}
          <Link href={`/login?redirect=${encodeURIComponent(paymentUrl)}`} className="text-[#1a73e8] font-bold hover:underline">
            Se connecter
          </Link>
        </p>

        {/* Legal */}
        <p className="text-[11px] text-center text-muted-foreground leading-relaxed mt-8 px-2">
          En continuant, vous acceptez nos{" "}
          <Link href="#" className="underline font-semibold text-[#0e1133]">Conditions d&apos;utilisation</Link>
          {" "}et confirmez avoir lu notre{" "}
          <Link href="#" className="underline font-semibold text-[#0e1133]">Politique de Confidentialité</Link>.
          Vous pouvez vous désabonner des offres produit à tout moment.
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f9]">
        <div className="w-10 h-10 border-4 border-[#1a73e8]/20 border-t-[#1a73e8] rounded-full animate-spin"/>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
