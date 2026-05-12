"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ── Password strength helper ──────────────────────────────────────────────────

function getStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score, label: "Trop faible",  color: "bg-red-500" };
  if (score <= 2) return { score, label: "Faible",       color: "bg-orange-400" };
  if (score <= 3) return { score, label: "Moyen",        color: "bg-yellow-400" };
  if (score === 4) return { score, label: "Fort",        color: "bg-blue-500" };
  return              { score, label: "Très fort",      color: "bg-green-500" };
}

// ── Eye button ────────────────────────────────────────────────────────────────

function EyeButton({ show, onClick }: { show: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
    >
      {show ? (
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
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [showConf, setShowConf]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);
  const [error, setError]           = useState("");

  const strength = getStrength(password);
  const passwordsMatch = password && confirm && password === confirm;
  const mismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) { setError("Veuillez remplir tous les champs."); return; }
    if (password !== confirm)  { setError("Les mots de passe ne correspondent pas."); return; }
    if (strength.score < 2)    { setError("Votre mot de passe est trop faible."); return; }
    setError("");
    setLoading(true);
    // TODO: call real API with token
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 900);
  };

  // Invalid / missing token guard
  if (!token && !done) {
    return (
      <div className="min-h-screen bg-[#f4f5f9] flex items-center justify-center px-6">
        <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] px-10 py-14 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
          <h2 className="text-xl font-black text-[#0e1133] mb-3 tracking-tight">Lien invalide ou expiré</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Ce lien de réinitialisation n&apos;est plus valide. Il a peut-être expiré ou déjà été utilisé.
          </p>
          <Link href="/forgot-password">
            <Button className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] font-bold rounded-xl shadow-md shadow-blue-500/20">
              Demander un nouveau lien
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex flex-col items-center justify-start pt-12 px-6 pb-20">

      {/* Back — hidden after success */}
      {!done && (
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
      )}

      {/* Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] px-10 py-12 flex flex-col items-center">

        {!done ? (
          <>
            {/* Tilted title */}
            <div className="mb-10">
              <h1 className="text-[30px] font-black text-white bg-[#1a73e8] px-8 py-2 rounded-lg -rotate-1 tracking-tight leading-tight select-none text-center">
                Nouveau mot de passe
              </h1>
            </div>

            <p className="text-sm text-muted-foreground text-center leading-relaxed mb-8 px-2">
              Choisissez un mot de passe sécurisé d&apos;au moins 8 caractères.
            </p>

            {/* Error */}
            {error && (
              <div className="w-full mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full space-y-6">

              {/* New password */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-bold text-[#0e1133]">Nouveau mot de passe</Label>
                <Input
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="h-12 pr-12 rounded-xl border-gray-200 focus-visible:ring-[#1a73e8]/20 focus-visible:border-[#1a73e8]/40"
                />
                <EyeButton show={showPwd} onClick={() => setShowPwd(p => !p)} />

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div
                          key={i}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-300",
                            i <= strength.score ? strength.color : "bg-gray-100"
                          )}
                        />
                      ))}
                    </div>
                    <p className={cn(
                      "text-[11px] font-bold",
                      strength.score <= 1 ? "text-red-500" :
                      strength.score <= 2 ? "text-orange-400" :
                      strength.score <= 3 ? "text-yellow-500" :
                      strength.score === 4 ? "text-blue-500" : "text-green-500"
                    )}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-bold text-[#0e1133]">Confirmer le mot de passe</Label>
                <Input
                  type={showConf ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className={cn(
                    "h-12 pr-12 rounded-xl border-gray-200 focus-visible:ring-[#1a73e8]/20 focus-visible:border-[#1a73e8]/40 transition-colors",
                    mismatch        && "border-red-300 focus-visible:ring-red-500/20",
                    passwordsMatch  && "border-green-300 focus-visible:ring-green-500/20"
                  )}
                />
                <EyeButton show={showConf} onClick={() => setShowConf(p => !p)} />

                {/* Match indicator */}
                {confirm.length > 0 && (
                  <div className={cn(
                    "flex items-center gap-1.5 text-[11px] font-bold",
                    mismatch ? "text-red-500" : "text-green-600"
                  )}>
                    {mismatch ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        Les mots de passe ne correspondent pas
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        Les mots de passe correspondent
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Conseils :</p>
                {[
                  { text: "Au moins 8 caractères",       ok: password.length >= 8 },
                  { text: "Une lettre majuscule (A-Z)",  ok: /[A-Z]/.test(password) },
                  { text: "Un chiffre (0-9)",            ok: /[0-9]/.test(password) },
                  { text: "Un caractère spécial (!@#…)", ok: /[^A-Za-z0-9]/.test(password) },
                ].map(tip => (
                  <div key={tip.text} className={cn(
                    "flex items-center gap-2 text-[12px] font-medium transition-colors",
                    tip.ok ? "text-green-600" : "text-muted-foreground"
                  )}>
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                      tip.ok ? "bg-green-500" : "bg-gray-200"
                    )}>
                      {tip.ok && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      )}
                    </div>
                    {tip.text}
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                disabled={loading || !!mismatch || strength.score < 2}
                className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] text-base font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                    Réinitialisation…
                  </div>
                ) : "Réinitialiser le mot de passe"}
              </Button>
            </form>
          </>
        ) : (
          /* ── Success state ─────────────────────────────────── */
          <>
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>

            <h2 className="text-2xl font-black text-[#0e1133] text-center mb-3 tracking-tight">
              Mot de passe réinitialisé !
            </h2>
            <p className="text-sm text-muted-foreground text-center leading-relaxed mb-10 px-2">
              Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>

            <Button
              onClick={() => router.push("/login")}
              className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] text-base font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              Aller à la connexion
            </Button>
          </>
        )}

      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f9]">
        <div className="w-10 h-10 border-4 border-[#1a73e8]/20 border-t-[#1a73e8] rounded-full animate-spin"/>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
