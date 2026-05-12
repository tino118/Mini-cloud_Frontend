"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CloudLogoIcon } from "../../page";

// ─────────────────────────────────────────────────────────────────────────────
// Types / helpers
// ─────────────────────────────────────────────────────────────────────────────

type PaymentMethod = "card" | "paypal" | "gpay" | "coingate";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  );
}

function CardBrands() {
  return (
    <div className="flex items-center gap-1.5">
      {["Visa", "MC", "Amex"].map(b => (
        <div key={b} className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-black text-gray-500 uppercase tracking-wider">
          {b}
        </div>
      ))}
    </div>
  );
}

function CollapseArrow({ open }: { open: boolean }) {
  return (
    <svg className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

function PaymentContent() {
  const searchParams = useSearchParams();

  const plan  = searchParams.get("plan")   || "starter";
  const period = parseInt(searchParams.get("period") || "12");
  const total  = parseInt(searchParams.get("total")  || "0");
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  // Billing fake — in a real app this would come from the auth session
  const billing = {
    name: "Votre compte",
    address: "Douala, Cameroun",
  };

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [showCard, setShowCard] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isPromoValid, setIsPromoValid] = useState(false);

  const promoValue = Math.round(total * (promoDiscount / 100));
  const finalTotal = total - promoValue;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "MINICLOUD") {
      setPromoDiscount(10);
      setIsPromoValid(true);
      setIsPromoOpen(false);
    } else {
      alert("Code promo invalide");
      setIsPromoValid(false);
      setPromoDiscount(0);
    }
  };

  const handleRemovePromo = () => {
    setIsPromoValid(false);
    setPromoDiscount(0);
    setPromoCode("");
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] pb-24">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CloudLogoIcon/>
            <span className="font-bold text-lg uppercase tracking-tight text-[#0e1133]">
              Mini Cloud
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <ShieldIcon />
            Paiements cryptés et sécurisés
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* ── Left ──────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* 1 — Adresse de facturation */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0e1133]">
                      Adresse de facturation
                    </h2>
                    <div className="text-sm text-muted-foreground mt-2 space-y-0.5">
                      <p>{billing.name}</p>
                      <p>{billing.address}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="text-[#1a73e8] text-sm font-bold hover:underline flex-shrink-0"
                >
                  Modifier
                </Link>
              </div>
            </div>

            {/* 2 — Paiement */}
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
              <h2 className="text-[15px] font-bold text-[#0e1133] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-[#1a73e8] text-[#1a73e8] text-[11px] font-black flex items-center justify-center">
                  2
                </span>
                Paiement
              </h2>
              <p className="text-xs text-muted-foreground -mt-2">
                Paiement immédiat
              </p>

              {/* ── Carte ── */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors"
                  onClick={() => {
                    setMethod("card");
                    setShowCard((p) => (method === "card" ? !p : true));
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        method === "card"
                          ? "border-[#1a73e8]"
                          : "border-gray-300",
                      )}
                    >
                      {method === "card" && (
                        <div className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#0e1133]">
                      Carte
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CardBrands />
                    <CollapseArrow open={method === "card" && showCard} />
                  </div>
                </button>

                {method === "card" && showCard && (
                  <div className="px-5 pb-6 pt-2 space-y-4 border-t border-gray-100">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-muted-foreground">
                        Nom sur la carte
                      </Label>
                      <Input
                        placeholder="Votre nom"
                        className="h-11 rounded-lg border-gray-200 focus-visible:ring-[#1a73e8]/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-muted-foreground">
                        Numéro de carte
                      </Label>
                      <Input
                        placeholder="0000 0000 0000 0000"
                        className="h-11 rounded-lg border-gray-200 focus-visible:ring-[#1a73e8]/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-muted-foreground">
                          Date d&apos;expiration
                        </Label>
                        <Input
                          placeholder="MM/YY"
                          className="h-11 rounded-lg border-gray-200 focus-visible:ring-[#1a73e8]/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-muted-foreground">
                          Code CVC
                        </Label>
                        <Input
                          placeholder="CVC"
                          className="h-11 rounded-lg border-gray-200 focus-visible:ring-[#1a73e8]/20"
                        />
                      </div>
                    </div>

                    <Button className="w-full h-12 bg-[#1a73e8] hover:bg-[#1557b0] font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all mt-2">
                      Soumettre le paiement
                    </Button>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <ShieldIcon />
                      Paiements cryptés et sécurisés
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      En validant votre paiement, vous acceptez nos{" "}
                      <Link
                        href="#"
                        className="underline font-semibold text-[#0e1133]"
                      >
                        Conditions d&apos;utilisation
                      </Link>{" "}
                      et confirmez que vous avez lu notre{" "}
                      <Link
                        href="#"
                        className="underline font-semibold text-[#0e1133]"
                      >
                        Politique de Confidentialité
                      </Link>
                      . Vous pouvez annuler les paiements récurrents à tout
                      moment.
                    </p>
                  </div>
                )}
              </div>

              {/* ── PayPal ── */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors"
                  onClick={() => setMethod("paypal")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        method === "paypal"
                          ? "border-[#1a73e8]"
                          : "border-gray-300",
                      )}
                    >
                      {method === "paypal" && (
                        <div className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#003087]">
                      PayPal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5"
                      viewBox="0 0 101 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2 2H5.2L0 29h5.2l1.8-10h4.2c5.8 0 9.8-3 11-8.4C23.8 4.4 18.8 2 12.2 2zm1.4 9.4c-.5 2.8-2.6 3.6-5 3.6H6.4l1.8-10h2.2c2.6 0 4.4 1.2 3.2 6.4z"
                        fill="#009cde"
                      />
                      <path
                        d="M34 10h-5l-3.6 19h5L34 10zm-2.5-7a3 3 0 100 6 3 3 0 000-6z"
                        fill="#009cde"
                      />
                      <path
                        d="M56 10h-5l-.4 2.4C49.2 10.8 47 10 44 10c-6.2 0-11.4 5-11.4 11.4 0 5 3.2 8 8 8 2.6 0 5-.8 6.8-2.4l-.4 1.8h5L56 10zm-9.6 12.2c-1 1-2.4 1.6-4 1.6-2.4 0-3.6-1.2-3.6-3.2 0-3.2 2.2-5.4 5-5.4 1.4 0 2.4.4 3.2 1.2l-.6 5.8z"
                        fill="#009cde"
                      />
                    </svg>
                    <CollapseArrow open={method === "paypal"} />
                  </div>
                </button>
                {method === "paypal" && (
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                    <p className="text-sm text-muted-foreground mb-4">
                      Vous serez redirigé vers PayPal pour finaliser votre
                      paiement.
                    </p>
                    <Button className="w-full h-12 bg-[#ffc439] hover:bg-[#f0b429] text-[#003087] font-bold rounded-xl active:scale-[0.98] transition-all">
                      Payer avec PayPal
                    </Button>
                  </div>
                )}
              </div>

              {/* ── Google Pay ── */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors"
                  onClick={() => setMethod("gpay")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        method === "gpay"
                          ? "border-[#1a73e8]"
                          : "border-gray-300",
                      )}
                    >
                      {method === "gpay" && (
                        <div className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#0e1133]">
                      Google Pay
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-black text-gray-600 border border-gray-200 px-2 py-0.5 rounded">
                      G Pay
                    </div>
                    <CollapseArrow open={method === "gpay"} />
                  </div>
                </button>
                {method === "gpay" && (
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                    <p className="text-sm text-muted-foreground mb-4">
                      Finalisez votre paiement rapidement avec Google Pay.
                    </p>
                    <Button className="w-full h-12 bg-[#0e1133] hover:bg-[#1c2240] text-white font-bold rounded-xl active:scale-[0.98] transition-all">
                      Payer avec Google Pay
                    </Button>
                  </div>
                )}
              </div>

              {/* ── Coingate ── */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-gray-50 border-b border-gray-100">
                  1 jour ouvrable
                </div>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors"
                  onClick={() => setMethod("coingate")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        method === "coingate"
                          ? "border-[#1a73e8]"
                          : "border-gray-300",
                      )}
                    >
                      {method === "coingate" && (
                        <div className="w-2 h-2 rounded-full bg-[#1a73e8]" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#0e1133]">
                      Coingate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-black text-[#02c58d] border border-[#02c58d]/20 bg-[#02c58d]/5 px-2 py-0.5 rounded">
                      crypto
                    </div>
                    <CollapseArrow open={method === "coingate"} />
                  </div>
                </button>
                {method === "coingate" && (
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                    <p className="text-sm text-muted-foreground mb-4">
                      Payez en crypto-monnaie via Coingate (BTC, ETH, USDT…).
                    </p>
                    <Button className="w-full h-12 bg-[#02c58d] hover:bg-[#01a876] text-white font-bold rounded-xl active:scale-[0.98] transition-all">
                      Payer avec Coingate
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ─────────────────────────────────── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
              <h3 className="text-base font-bold text-[#0e1133]">
                Récapitulatif de la commande
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-[#0e1133]">
                    Pack {planName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Pack de {period} mois
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground line-through">
                      {(total * 1.3).toLocaleString("fr-FR")} FCFA
                    </div>
                    <div className="font-bold text-[#0e1133]">
                      {total.toLocaleString("fr-FR")} FCFA
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-[#0e1133]">0 FCFA</span>
                </div>
                {isPromoValid && (
                  <div className="flex justify-between text-green-600 font-medium italic">
                    <span>Code promo ({promoCode.toUpperCase()})</span>
                    <span>-{promoValue.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-[#0e1133]">
                  Total
                </span>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground line-through">
                    {(total * 1.3).toLocaleString("fr-FR")} FCFA
                  </div>
                  <div className="text-2xl font-black text-[#1a73e8]">
                    {finalTotal.toLocaleString("fr-FR")} FCFA
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsPromoOpen(!isPromoOpen)}
                  className="text-[#1a73e8] text-sm font-medium hover:underline w-full text-left flex items-center justify-between"
                >
                  Vous avez un code promo ?
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isPromoOpen && "rotate-180",
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isPromoOpen && !isPromoValid && (
                  <div className="flex gap-2 animate-in slide-in-from-top-2 duration-300">
                    <Input
                      placeholder="Code"
                      className="h-10 rounded-lg border-gray-200"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="h-10 border-[#1a73e8] text-[#1a73e8] font-bold px-4"
                      onClick={handleApplyPromo}
                    >
                      Appliquer
                    </Button>
                  </div>
                )}
                {isPromoValid && (
                  <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-2.5 animate-in zoom-in-95 duration-300">
                    <div>
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">
                        Code appliqué
                      </p>
                      <p className="text-sm font-bold text-[#0e1133]">
                        {promoCode.toUpperCase()}
                      </p>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Garantie satisfait ou remboursé 30 jours
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="mt-20 border-t border-gray-200 py-6 text-center text-[11px] text-muted-foreground space-x-4">
        <span>© 2024–2026 Mini Cloud. Tous droits réservés.</span>
        <Link href="#" className="underline hover:text-[#0e1133]">
          Conditions d&apos;utilisation
        </Link>
        <Link href="#" className="underline hover:text-[#0e1133]">
          Politique de confidentialité
        </Link>
      </footer>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f9]">
        <div className="w-10 h-10 border-4 border-[#1a73e8]/20 border-t-[#1a73e8] rounded-full animate-spin"/>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
