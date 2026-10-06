"use client";

import React from "react";
import { Sparkles, ArrowRight, Shield, Truck, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-luxury-cream to-luxury-cream/50 border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Texto Editorial */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-dark text-[11px] font-medium tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Coleção Exclusiva Luanda 2026</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-luxury-dark font-light tracking-tight leading-[1.15] mb-4">
              A essência da sofisticação em{" "}
              <span className="italic font-normal text-luxury-gold">roupas nobres</span> e{" "}
              <span className="italic font-normal text-luxury-gold">perfumes de nicho</span>.
            </h1>

            <p className="text-xs sm:text-sm text-luxury-graphite max-w-xl leading-relaxed mb-6 font-normal">
              A Moir Store conecta o estilo cosmopolita à alta perfumaria internacional.
              Peças em seda pura, linho natural e extratos aromáticos raros com entrega rápida
              em Luanda e atendimento dedicado via WhatsApp oficial.
            </p>

            {/* Botões de Ação Rápida */}
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSelectedCategory("Roupas");
                  const el = document.getElementById("catalogo-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-luxury-dark text-white text-xs font-medium tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-md group"
              >
                <span>Ver Roupas</span>
                <ArrowRight className="w-3.5 h-3.5 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("Perfumes");
                  const el = document.getElementById("catalogo-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-luxury-gold/60 text-luxury-dark text-xs font-medium tracking-widest uppercase hover:bg-luxury-cream transition-all"
              >
                <span>Perfumes de Luxo</span>
              </button>
            </div>
          </div>

          {/* Destaque Visual / Mini Galeria Editorial */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4] bg-neutral-100 group">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
                alt="Alta Costura Moir Store"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] tracking-widest uppercase font-serif text-white">
                  Seda & Alfaiataria
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4] bg-neutral-100 mt-6 group">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80"
                alt="Fragrâncias de Nicho"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] tracking-widest uppercase font-serif text-white">
                  Oud & Extratos Raros
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares de Confiança em Luanda */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-10 pt-6 border-t border-luxury-border/60">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2">
            <div className="p-2 rounded-full bg-white border border-luxury-gold/30 text-luxury-gold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-luxury-dark uppercase tracking-wider">
                Entrega em Luanda
              </h4>
              <p className="text-[10px] text-neutral-500 hidden sm:block">
                Talatona, Miramar, Kilamba e arredores
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2">
            <div className="p-2 rounded-full bg-white border border-luxury-gold/30 text-luxury-gold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-luxury-dark uppercase tracking-wider">
                100% Autêntico
              </h4>
              <p className="text-[10px] text-neutral-500 hidden sm:block">
                Tecidos nobres e perfumes selados
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2">
            <div className="p-2 rounded-full bg-white border border-luxury-gold/30 text-luxury-gold">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-luxury-dark uppercase tracking-wider">
                WhatsApp VIP
              </h4>
              <p className="text-[10px] text-neutral-500 hidden sm:block">
                Atendimento consultivo e direto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
