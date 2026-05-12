import React from "react";
import { cn } from "@/lib/utils";

interface CheckoutStepProps {
  number: number;
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
}

export function CheckoutStep({
  number,
  title,
  children,
  isActive = true,
  isCompleted = false,
}: CheckoutStepProps) {
  return (
    <div className={cn(
      "mb-8 transition-all duration-500 ease-in-out",
      !isActive && "opacity-30 grayscale pointer-events-none scale-[0.98]"
    )}>
      <div className="flex items-center gap-5 mb-8">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500",
            isCompleted
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : isActive
              ? "bg-primary text-white shadow-xl shadow-primary/30 rotate-0"
              : "bg-muted text-muted-foreground rotate-[-10deg]"
          )}
        >
          {isCompleted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            number
          )}
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
            {title}
          </h2>
          {isCompleted && (
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mt-0.5">Étape complétée</p>
          )}
        </div>
      </div>
      <div className={cn(
        "transition-all duration-500",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        {children}
      </div>
    </div>
  );
}
