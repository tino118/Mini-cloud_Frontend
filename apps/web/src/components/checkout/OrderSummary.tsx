import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  planName: string;
  period: number; // in months
  pricePerMonth: number;
  discount?: number; // percentage
  tax?: number; // amount
}

export function OrderSummary({
  planName,
  period,
  pricePerMonth,
  discount = 0,
  tax = 0,
}: OrderSummaryProps) {
  const subtotal = pricePerMonth * period;
  const savings = subtotal * (discount / 100);
  const total = subtotal - savings + tax;

  return (
    <Card className="sticky top-24 border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-xl overflow-hidden rounded-[2.5rem]">
      <CardHeader className="bg-primary/5 pb-8 pt-8">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="font-serif text-xl font-black text-foreground">Détails de l'offre</CardTitle>
          <div className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-widest border border-primary/10">
            Mini Cloud
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Vérifiez votre commande avant de finaliser.</p>
      </CardHeader>
      <CardContent className="pt-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="font-black text-lg text-foreground tracking-tight">{planName}</div>
            <div className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
              Période : {period} {period > 1 ? 'mois' : 'mois'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-black text-lg tracking-tight">{subtotal.toLocaleString()} FCFA</div>
          </div>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-xs font-black text-green-700 uppercase tracking-wider">Remise {discount}%</span>
            </div>
            <span className="font-black text-green-600">-{savings.toLocaleString()} FCFA</span>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Sous-total</span>
            <span>{(subtotal - savings).toLocaleString()} FCFA</span>
          </div>
          {tax > 0 && (
            <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <span>Taxes</span>
              <span>{tax.toLocaleString()} FCFA</span>
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        <div className="flex justify-between items-center pt-2">
          <span className="text-xl font-black font-serif tracking-tight">À payer</span>
          <div className="text-right">
            <div className="text-3xl font-black text-primary tracking-tighter">
              {total.toLocaleString()} FCFA
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50/30 border-t border-border/50 p-6">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            Paiement 100% Sécurisé
          </div>
          <p className="text-[9px] text-center text-muted-foreground leading-relaxed px-4">
            En validant, vous acceptez nos <a href="#" className="font-bold text-foreground hover:text-primary transition-colors">Conditions Générales</a>.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
