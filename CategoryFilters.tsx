"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Sparkles, Shirt, Droplets, Layers } from "lucide-react";

export const CategoryFilters: React.FC = () => {
  const { selectedCategory, setSelectedCategory, products } = useStore();

  const categories: Array<{
    id: "Todos" | "Roupas" | "Perfumes" | "Destaques";
    label: string;
    icon: React.ReactNode;
    count: number;
  }> = [
    {
      id: "Todos",
      label: "Todos",
      icon: <Layers className="w-3.5 h-3.5" />,
      count: products.length,
    },
    {
      id: "Roupas",
      label: "Roupas",
      icon: <Shirt className="w-3.5 h-3.5" />,
      count: products.filter((p) => p.category === "Roupas").length,
    },
    {
      id: "Perfumes",
      label: "Perfumes",
      icon: <Droplets className="w-3.5 h-3.5" />,
      count: products.filter((p) => p.category === "Perfumes").length,
    },
    {
      id: "Destaques",
      label: "Destaques",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      count: products.filter((p) => p.featured).length,
    },
  ];

  return (
    <div className="w-full bg-white border-b border-luxury-border/60 py-3 sticky top-[57px] sm:top-[65px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4">
        {/* Barra deslizante horizontal com scroll suave */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-luxury-dark text-white shadow-md ring-1 ring-luxury-gold/50"
                    : "bg-luxury-cream text-luxury-graphite hover:bg-neutral-200/80 border border-luxury-border"
                }`}
              >
                <span className={isActive ? "text-luxury-gold" : "text-neutral-500"}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-luxury-gold/30 text-luxury-gold" : "bg-white/80 text-neutral-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
