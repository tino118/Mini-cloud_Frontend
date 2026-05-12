"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CloudLogoIcon } from "../page";

// ─────────────────────────────────────────────────────────────────────────────
// Plans centralisés — correspondant exactement aux plans du landing
// ─────────────────────────────────────────────────────────────────────────────
const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    pricePerMonth: 5000,
    desc: "Mini Cloud VPS",
    features: ["2 instances (1 vCPU / 1 GB)", "50 GB SSD", "1 IP publique", "Snapshots manuels", "Support email"],
  },
  pro: {
    id: "pro",
    name: "Pro",
    pricePerMonth: 25000,
    desc: "Mini Cloud VPS",
    features: ["10 instances (4 vCPU / 8 GB)", "500 GB SSD", "5 IP publiques", "Snapshots automatiques", "Support 24/7", "Accès Labs inclus"],
  },
};

const PERIODS = [
  { months: 1,  discount: 0,  label: "1 mois" },
  { months: 12, discount: 15, label: "12 mois", tag: "Économisez 15%" },
  { months: 24, discount: 25, label: "24 mois", tag: "Meilleur prix" },
];

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planKey = (searchParams.get("plan") || "starter") as keyof typeof PLANS;
  const plan = PLANS[planKey] ?? PLANS.starter;

  const [period, setPeriod] = useState(12);
  const [monitoring, setMonitoring] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isPromoValid, setIsPromoValid] = useState(false);

  const currentPeriod = PERIODS.find(p => p.months === period)!;
  const basePricePerMonth = Math.round(plan.pricePerMonth * (1 - currentPeriod.discount / 100));
  const monitoringPrice = monitoring ? 2000 * period : 0;
  const subtotal = basePricePerMonth * period + monitoringPrice;
  const promoValue = Math.round(subtotal * (promoDiscount / 100));
  const totalPrice = subtotal - promoValue;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "MINICLOUD") {
      setPromoDiscount(10);
      setIsPromoValid(true);
      setIsPromoOpen(false); // Hide input after success
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

  const handleContinue = () => {
    router.push(
      `/register?redirect=/checkout/payment&plan=${planKey}&period=${period}&total=${totalPrice}&monitoring=${monitoring}`
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] pb-24">

      {/* ── Header ────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
                        <CloudLogoIcon/>
            
            <span className="font-bold text-lg uppercase tracking-tight text-[#0e1133]">Mini Cloud</span>
          </Link>
          <Link href="/#tarifs" className="text-sm font-medium text-[#1a73e8] hover:underline">← Retour aux tarifs</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        <h1 className="text-xl font-bold text-[#0e1133] mb-8">Votre panier</h1>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── Left column ───────────────────────────────────── */}
          <div className="space-y-5">

            {/* Plan Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <ServerIcon className="w-6 h-6 text-[#1a73e8]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0e1133]">Plan {plan.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.desc}</p>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"/>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Period Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0e1133]">Période de souscription</Label>
                <Select value={period.toString()} onValueChange={v => setPeriod(parseInt(v))}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PERIODS.map(p => {
                      const pm = Math.round(plan.pricePerMonth * (1 - p.discount / 100));
                      return (
                        <SelectItem key={p.months} value={p.months.toString()}>
                          <div className="flex items-center justify-between w-full gap-8">
                            <span>{p.label}</span>
                            <div className="flex items-center gap-3">
                              {p.tag && (
                                <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                                  {p.tag}
                                </span>
                              )}
                              <span className="font-bold text-[#0e1133] whitespace-nowrap">
                                {pm.toLocaleString("fr-FR")} FCFA/mois
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">
                  Se renouvelle à {plan.pricePerMonth.toLocaleString("fr-FR")} FCFA/mois après la période initiale. Annulation possible à tout moment.
                </p>
              </div>
            </div>

            {/* Optional — Monitoring */}
            <div className="bg-white rounded-2xl shadow-sm p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    id="monitoring"
                    checked={monitoring}
                    onCheckedChange={v => setMonitoring(!!v)}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="monitoring" className="text-[15px] font-bold text-[#0e1133] cursor-pointer">
                        Monitoring & alertes 24/7
                      </Label>
                      <span className="text-[10px] font-bold text-[#1a73e8] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        Recommandé
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Surveillance en temps réel de vos instances avec notifications immédiates en cas d'incident.
                    </p>
                  </div>
                </div>
                <div className="text-base font-bold text-[#0e1133] whitespace-nowrap">
                  2 000 FCFA/mois
                </div>
              </div>
            </div>

          </div>

          {/* ── Right sidebar ─────────────────────────────────── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
              <h3 className="text-base font-bold text-[#0e1133]">Récapitulatif de la commande</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan {plan.name}</span>
                  <span className="font-medium text-[#0e1133]">
                    {basePricePerMonth.toLocaleString("fr-FR")} FCFA/mois
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Période ({period} mois)</span>
                  <span className="font-medium text-[#0e1133]">
                    ×{period}
                  </span>
                </div>
                {monitoring && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monitoring</span>
                    <span className="font-medium text-[#0e1133]">
                      {monitoringPrice.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                )}
                {currentPeriod.discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Remise {currentPeriod.discount}%</span>
                    <span>-{(plan.pricePerMonth * period * currentPeriod.discount / 100).toLocaleString("fr-FR")} FCFA</span>
                  </div>
                )}
                {isPromoValid && (
                  <div className="flex justify-between text-green-600 font-medium italic">
                    <span>Code promo ({promoCode.toUpperCase()})</span>
                    <span>-{promoValue.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-[#0e1133]">0 FCFA</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-[#0e1133]">Total</span>
                <div className="text-right">
                  {currentPeriod.discount > 0 && (
                    <div className="text-xs text-muted-foreground line-through">
                      {(plan.pricePerMonth * period).toLocaleString("fr-FR")} FCFA
                    </div>
                  )}
                  <div className="text-2xl font-black text-[#1a73e8]">
                    {totalPrice.toLocaleString("fr-FR")} FCFA
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsPromoOpen(!isPromoOpen)}
                  className="text-[#1a73e8] text-sm font-medium hover:underline w-full text-left flex items-center justify-between"
                >
                  Vous avez un code promo ?
                  <svg className={cn("w-4 h-4 transition-transform", isPromoOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
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
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Code appliqué</p>
                      <p className="text-sm font-bold text-[#0e1133]">{promoCode.toUpperCase()}</p>
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

              <Button
                onClick={handleContinue}
                className="w-full h-13 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-[15px] font-bold transition-all active:scale-[0.98]"
              >
                Continuer
              </Button>
            </div>

            <div className="px-2 space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                Garantie satisfait ou remboursé 30 jours
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f9]">
        <div className="w-10 h-10 border-4 border-[#1a73e8]/20 border-t-[#1a73e8] rounded-full animate-spin"/>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
