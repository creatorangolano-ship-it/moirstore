"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { UserProfileModal } from "@/components/UserProfileModal";
import { AdminPanel } from "@/components/AdminPanel";
import {
  Sparkles,
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Clock,
  MapPin,
  Lock,
  X,
  Shirt,
  Droplets,
  Home as HomeIcon,
  Store as StoreIcon,
} from "lucide-react";
import { WHATSAPP_PHONE, formatKz } from "@/lib/formatters";

export default function Home() {
  const { products, searchQuery, setSearchQuery, addToast } = useStore();

  // Gerenciamento de Abas
  const [activeTab, setActiveTab] = useState<string>("home");
  const [trendingFilter, setTrendingFilter] = useState<"bestseller" | "new" | "top">("bestseller");
  const [shopCategory, setShopCategory] = useState<string>("Todos");

  // Autenticação Administrativa Restrita (SEM BOTÃO EXPOSTO)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  const ADMIN_USER_CORRECT = "admin@moirstore.ao";
  const ADMIN_PASS_CORRECT = "Moir@Admin2026";

  useEffect(() => {
    // Atalho secreto de teclado: Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        openAdminAuth();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Hash na URL (#admin)
    if (window.location.hash === "#admin") {
      openAdminAuth();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openAdminAuth = () => {
    if (isAdminAuthenticated) {
      setActiveTab("admin");
    } else {
      setAdminUser("");
      setAdminPass("");
      setAdminError("");
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser.trim() === ADMIN_USER_CORRECT && adminPass === ADMIN_PASS_CORRECT) {
      setIsAdminAuthenticated(true);
      setIsAdminLoginModalOpen(false);
      setActiveTab("admin");
      addToast("Acesso administrativo autorizado com sucesso.", "success");
    } else {
      setAdminError("Credenciais de segurança incorretas. Acesso restrito.");
    }
  };

  // Produtos em Tendência para a Home
  const trendingProducts = useMemo(() => {
    if (trendingFilter === "bestseller") return products.slice(0, 4);
    if (trendingFilter === "new") return products.filter((p) => p.featured).slice(0, 4);
    return products.filter((p) => p.salePrice).slice(0, 4);
  }, [products, trendingFilter]);

  // Produtos filtrados para a Loja Geral
  const shopProducts = useMemo(() => {
    return products.filter((p) => {
      let matchCat = true;
      if (shopCategory !== "Todos") matchCat = p.category === shopCategory;
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchSearch =
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
      }
      return matchCat && matchSearch;
    });
  }, [products, shopCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0E0E0E] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Header com Navegação Multi-Abas */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ==================================================== */}
      {/* ABA 1: PÁGINA INICIAL (HOME)                          */}
      {/* ==================================================== */}
      {activeTab === "home" && (
        <main className="flex-1 pb-16">
          {/* Hero Slider / Banner Principal da Campanha */}
          <section className="max-w-7xl mx-auto px-4 mt-4 sm:mt-6">
            <div className="bg-gradient-to-r from-[#FFF6F8] via-[#F5EBE6] to-[#ECE4DB] dark:from-[#1C1917] dark:via-[#171513] dark:to-[#12100E] rounded-3xl p-6 sm:p-12 border border-[#E8E4DE] dark:border-[#2B2723] grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xs">
              <div className="flex flex-col items-start space-y-4">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-widest">
                  Edição Limitada Luanda 2026
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
                  Renove Seu Estilo com <span className="text-rose-600">Alta Costura</span> & Fragrâncias Raras
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                  Confeccionadas em seda pura e linho europeu, acompanhadas pelos perfumes de nicho mais desejados do mundo. Entregas expressas em toda a província de Luanda.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("shop")}
                    className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Comprar Coleção</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab("perfumes")}
                    className="px-6 py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-all"
                  >
                    Perfumes de Luxo
                  </button>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                  alt="Alta Costura Moir Store"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* 5 Categorias em Destaque (Inspirado na Referência) */}
          <section className="max-w-7xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <div
                onClick={() => {
                  setShopCategory("Roupas");
                  setActiveTab("clothes");
                }}
                className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-2xl overflow-hidden p-2.5 text-center cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
                    alt="Vestidos"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Coleção Noite</span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Vestidos de Gala
                </h4>
              </div>

              <div
                onClick={() => {
                  setShopCategory("Roupas");
                  setActiveTab("clothes");
                }}
                className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-2xl overflow-hidden p-2.5 text-center cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
                    alt="Camisas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Puro Linho</span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Camisaria Riviera
                </h4>
              </div>

              <div
                onClick={() => {
                  setShopCategory("Perfumes");
                  setActiveTab("perfumes");
                }}
                className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-2xl overflow-hidden p-2.5 text-center cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80"
                    alt="Perfumes Oud"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Extrato Raro</span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Oud & Âmbar Privé
                </h4>
              </div>

              <div
                onClick={() => {
                  setShopCategory("Roupas");
                  setActiveTab("clothes");
                }}
                className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-2xl overflow-hidden p-2.5 text-center cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
                    alt="Alfaiataria"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Alfaiataria</span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Blazers de Noite
                </h4>
              </div>

              <div
                onClick={() => {
                  setShopCategory("Perfumes");
                  setActiveTab("perfumes");
                }}
                className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-2xl overflow-hidden p-2.5 text-center cursor-pointer hover:shadow-md transition-all group col-span-2 sm:col-span-1"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80"
                    alt="Floral"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Gourmand Raro</span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Fleur de Cuanza
                </h4>
              </div>
            </div>
          </section>

          {/* Produtos em Tendência (Trending Products com Tabs) */}
          <section className="max-w-7xl mx-auto px-4 mt-14">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Peças & Fragrâncias em Alta
              </h3>
              <div className="inline-flex mt-4 p-1 bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-full gap-1">
                <button
                  onClick={() => setTrendingFilter("bestseller")}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                    trendingFilter === "bestseller"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  Mais Vendidos
                </button>
                <button
                  onClick={() => setTrendingFilter("new")}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                    trendingFilter === "new"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  Novidades 2026
                </button>
                <button
                  onClick={() => setTrendingFilter("top")}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                    trendingFilter === "top"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  Promoções
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {trendingProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          {/* Pilares de Confiança em Luanda */}
          <section className="max-w-7xl mx-auto px-4 mt-16">
            <div className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-luxury-cream dark:bg-neutral-800 text-luxury-gold flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    Entrega em Luanda
                  </h5>
                  <p className="text-[11px] text-neutral-500">Talatona, Miramar e Kilamba</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-luxury-cream dark:bg-neutral-800 text-luxury-gold flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    100% Autêntico
                  </h5>
                  <p className="text-[11px] text-neutral-500">Tecidos nobres e perfumes com selo</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-luxury-cream dark:bg-neutral-800 text-luxury-gold flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    Multicaixa Express
                  </h5>
                  <p className="text-[11px] text-neutral-500">Pagamento seguro na moeda Kwanza (Kz)</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-luxury-cream dark:bg-neutral-800 text-luxury-gold flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    Atendimento VIP
                  </h5>
                  <p className="text-[11px] text-neutral-500">+244 945 665 918 direto</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================================================== */}
      {/* ABA 2: CATÁLOGO COMPLETO (LOJA / SHOP)                */}
      {/* ==================================================== */}
      {activeTab === "shop" && (
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-luxury-border dark:border-neutral-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest">
                Catálogo Geral Luanda
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Loja Moir Store
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => setShopCategory("Todos")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  shopCategory === "Todos"
                    ? "bg-neutral-900 text-white dark:bg-luxury-gold dark:text-black"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                Todos ({products.length})
              </button>
              <button
                onClick={() => setShopCategory("Roupas")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  shopCategory === "Roupas"
                    ? "bg-neutral-900 text-white dark:bg-luxury-gold dark:text-black"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                Roupas ({products.filter((p) => p.category === "Roupas").length})
              </button>
              <button
                onClick={() => setShopCategory("Perfumes")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  shopCategory === "Perfumes"
                    ? "bg-neutral-900 text-white dark:bg-luxury-gold dark:text-black"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                Perfumes ({products.filter((p) => p.category === "Perfumes").length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {shopProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      )}

      {/* ==================================================== */}
      {/* ABA 3: ROUPAS DEDICADA                                */}
      {/* ==================================================== */}
      {activeTab === "clothes" && (
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="mb-6 pb-3 border-b border-luxury-border dark:border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest">
              Alta Alfaiataria & Gala
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Coleção de Roupas Moir
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Vestidos de seda pura, camisas em linho e blazers nobres com cortes nos tamanhos PP, P, M, G e GG.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products
              .filter((p) => p.category === "Roupas")
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </main>
      )}

      {/* ==================================================== */}
      {/* ABA 4: PERFUMES DEDICADA                              */}
      {/* ==================================================== */}
      {activeTab === "perfumes" && (
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="mb-6 pb-3 border-b border-luxury-border dark:border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest">
              Nicho & Alta Concentração
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Perfumes Importados de Luxo
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Extratos de perfume e Eau de Parfum com volumetria de 30ml, 50ml e 100ml e fixação garantida.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products
              .filter((p) => p.category === "Perfumes")
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </main>
      )}

      {/* ==================================================== */}
      {/* ABA 5: LOJAS & CONTACTO                               */}
      {/* ==================================================== */}
      {activeTab === "contact" && (
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest">
              Showroom Luanda
            </span>
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white mt-1">
              Contacto & Atendimento Personalizado
            </h2>
            <p className="text-xs text-neutral-500 mt-2">
              Agende sua prova privada ou tire dúvidas diretamente com nossa consultoria pelo canal oficial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                Showroom Talatona
              </h3>

              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Endereço Principal:</strong>
                  <span className="text-neutral-500">Condomínio Luanda Sul, Talatona • Showroom Privado</span>
                  <span className="block text-neutral-500">Atendimento de Apoio: Miramar / Alvalade</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Linha Direta WhatsApp:</strong>
                  <span className="text-neutral-500">+244 945 665 918</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Clock className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Horário de Funcionamento:</strong>
                  <span className="text-neutral-500">Segunda a Sábado: 08:30 às 19:30</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  "Olá Moir Store! Gostaria de falar com o atendimento ao cliente."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Iniciar Conversa no WhatsApp</span>
              </a>
            </div>

            <div className="bg-white dark:bg-[#171717] border border-[#E8E4DE] dark:border-[#262626] rounded-3xl p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Envie uma Mensagem
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToast("Mensagem enviada com sucesso! Nossa equipe entrará em contato.", "success");
                  (e.target as HTMLFormElement).reset();
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full bg-[#FAF9F6] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Telefone (+244)</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 923 456 789"
                    className="w-full bg-[#FAF9F6] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-600 dark:text-neutral-400 block mb-1">Mensagem</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Descreva o que procura..."
                    className="w-full bg-[#FAF9F6] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-2.5 focus:outline-none focus:border-luxury-gold resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-xs shadow-md"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================== */}
      {/* ABA 6: PAINEL ADMINISTRATIVO RESTRITO & OCULTO        */}
      {/* (ACESSO VIA CREDENCIAIS SEM NENHUM BOTÃO EXPOSTO)     */}
      {/* ==================================================== */}
      {activeTab === "admin" && isAdminAuthenticated && (
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
            <button
              onClick={() => {
                setIsAdminAuthenticated(false);
                setActiveTab("home");
                addToast("Sessão administrativa encerrada.", "info");
              }}
              className="text-xs text-red-600 underline font-semibold"
            >
              Sair da Gestão
            </button>
          </div>
          <AdminPanel />
        </main>
      )}

      {/* Rodapé Comercial Sem Apelo Visual de IA */}
      <footer className="bg-[#0D0D0D] text-white mt-auto pt-14 pb-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800 text-xs">
            <div className="space-y-3">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase">
                MOIR STORE
              </span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Boutique angolana dedicada ao vestuário de luxo e alta perfumaria internacional com atendimento e entrega em Luanda.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-luxury-gold uppercase tracking-wider text-[11px]">Navegação</h4>
              <ul className="space-y-1.5 text-neutral-400">
                <li><button onClick={() => setActiveTab("home")}>Página Inicial</button></li>
                <li><button onClick={() => setActiveTab("shop")}>Catálogo Completo</button></li>
                <li><button onClick={() => setActiveTab("clothes")}>Vestuário & Seda</button></li>
                <li><button onClick={() => setActiveTab("perfumes")}>Perfumes de Nicho</button></li>
                <li><button onClick={() => setActiveTab("contact")}>Lojas & Contacto</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-luxury-gold uppercase tracking-wider text-[11px]">Atendimento</h4>
              <p className="text-neutral-400">WhatsApp Oficial: +244 945 665 918</p>
              <p className="text-neutral-400">Talatona, Luanda Sul • Angola</p>
              <p className="text-neutral-400">Segunda a Sábado: 08:30 às 19:30</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-luxury-gold uppercase tracking-wider text-[11px]">Pagamento</h4>
              <p className="text-neutral-400">Multicaixa Express (MCX), Transferência Bancária ou Dinheiro na Entrega.</p>
              <span className="inline-block mt-2 font-bold text-luxury-gold">Moeda Oficial: Kwanza (Kz)</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px] gap-2">
            <span>
              &copy; 2026 Moir Store Angola - Todos os direitos reservados
              {/* Gatilho secreto no ponto final para login de gestão (SEM BOTÃO EXPOSTO) */}
              <span
                onClick={openAdminAuth}
                className="cursor-pointer select-none text-neutral-600 hover:text-neutral-400"
                title="."
              >
                .
              </span>
            </span>
            <span>Luanda • Alta Costura & Perfumaria</span>
          </div>
        </div>
      </footer>

      {/* Modal de Acesso Administrativo Restrito */}
      {isAdminLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-[#171717] rounded-3xl p-6 border border-neutral-300 dark:border-neutral-800 shadow-2xl relative">
            <button
              onClick={() => setIsAdminLoginModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-10 h-10 rounded-full bg-luxury-cream dark:bg-neutral-800 text-luxury-gold mx-auto flex items-center justify-center mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                Acesso Restrito à Gestão
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Insira as credenciais autorizadas para acessar o painel de produtos e estoque.
              </p>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-600 dark:text-neutral-400 block mb-1">
                  E-mail do Administrador
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin@moirstore.ao"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="w-full bg-[#FAF9F6] dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2.5 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-600 dark:text-neutral-400 block mb-1">
                  Senha de Segurança
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-[#FAF9F6] dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2.5 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              {adminError && (
                <p className="text-red-600 text-xs font-semibold">{adminError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-neutral-900 dark:bg-luxury-gold text-white dark:text-black font-bold uppercase tracking-wider text-xs shadow-md mt-2"
              >
                Entrar na Gestão
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modais Globais */}
      <ProductDetailModal />
      <CartDrawer />
      <AuthModal />
      <UserProfileModal />
    </div>
  );
}
