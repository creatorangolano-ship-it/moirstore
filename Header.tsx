"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, User, Search, X, Moon, Sun, Heart, Shirt, Droplets, Home, Store, MapPin } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const {
    cartCount,
    openCart,
    currentUser,
    openAuthModal,
    openProfileModal,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleProfileClick = () => {
    if (currentUser) {
      openProfileModal();
    } else {
      openAuthModal("login");
    }
  };

  const firstName = currentUser?.fullName ? currentUser.fullName.split(" ")[0] : null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-luxury-border dark:border-[#262626] transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#111111] text-white py-1.5 px-4 text-center text-[10px] tracking-wider uppercase font-medium flex items-center justify-between border-b border-[#222]">
        <div className="hidden sm:flex items-center gap-4 text-neutral-300">
          <span>• Entregas em Toda a Luanda (Talatona, Alvalade, Miramar)</span>
          <span>• Moda Exclusiva & Alta Perfumaria</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-2 text-luxury-gold font-bold">
          <span>WhatsApp Oficial: +244 945 665 918</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo da Marca */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("home");
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-luxury-dark text-luxury-gold dark:bg-black dark:border dark:border-luxury-gold/50 flex items-center justify-center font-serif text-xl font-bold">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-luxury-dark dark:text-white uppercase leading-tight">
              MOIR STORE
            </span>
            <span className="text-[8px] tracking-[0.3em] text-luxury-gold uppercase font-bold -mt-0.5">
              LUANDA • ANGOLA
            </span>
          </div>
        </a>

        {/* Abas de Navegação Desktop (Referência de E-Commerce) */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "home"
                ? "text-luxury-gold dark:text-luxury-gold font-extrabold"
                : "text-neutral-700 dark:text-neutral-300 hover:text-luxury-gold"
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Início
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "shop"
                ? "text-luxury-gold dark:text-luxury-gold font-extrabold"
                : "text-neutral-700 dark:text-neutral-300 hover:text-luxury-gold"
            }`}
          >
            <Store className="w-3.5 h-3.5" /> Catálogo
          </button>
          <button
            onClick={() => setActiveTab("clothes")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "clothes"
                ? "text-luxury-gold dark:text-luxury-gold font-extrabold"
                : "text-neutral-700 dark:text-neutral-300 hover:text-luxury-gold"
            }`}
          >
            <Shirt className="w-3.5 h-3.5" /> Roupas
          </button>
          <button
            onClick={() => setActiveTab("perfumes")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "perfumes"
                ? "text-luxury-gold dark:text-luxury-gold font-extrabold"
                : "text-neutral-700 dark:text-neutral-300 hover:text-luxury-gold"
            }`}
          >
            <Droplets className="w-3.5 h-3.5" /> Perfumes
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "contact"
                ? "text-luxury-gold dark:text-luxury-gold font-extrabold"
                : "text-neutral-700 dark:text-neutral-300 hover:text-luxury-gold"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> Lojas & Contacto
          </button>
        </nav>

        {/* Barra de Busca Desktop */}
        <div className="hidden md:flex flex-1 max-w-xs mx-2 relative">
          <input
            type="text"
            placeholder="Buscar vestidos, linhos, Oud..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== "shop") setActiveTab("shop");
            }}
            className="w-full bg-luxury-cream/80 dark:bg-neutral-900 border border-luxury-border dark:border-neutral-800 rounded-full py-1.5 pl-9 pr-4 text-xs text-luxury-dark dark:text-white placeholder-neutral-400 focus:outline-none focus:border-luxury-gold"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-neutral-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Ações da Direita */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Alternador de Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-700 dark:text-luxury-gold hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            title="Alternar Modo Escuro / Claro"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Busca Mobile */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-neutral-700 dark:text-white rounded-full"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Perfil */}
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-transparent hover:border-luxury-border dark:hover:border-neutral-800 hover:bg-luxury-cream dark:hover:bg-neutral-800 transition-all text-luxury-dark dark:text-white"
          >
            <div className="w-7 h-7 rounded-full bg-luxury-cream dark:bg-neutral-800 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold font-serif font-bold text-xs">
              {firstName ? firstName.charAt(0) : <User className="w-4 h-4" />}
            </div>
            {firstName && <span className="hidden sm:inline text-xs font-semibold">{firstName}</span>}
          </button>

          {/* Sacola de Compras */}
          <button
            onClick={openCart}
            className="relative p-2 text-luxury-dark dark:text-white hover:text-luxury-gold transition-all rounded-full"
            aria-label="Abrir Sacola"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Busca Mobile Expansível */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-luxury-border/60 dark:border-neutral-800 bg-white dark:bg-[#121212]">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Buscar roupas e perfumes em Luanda..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== "shop") setActiveTab("shop");
              }}
              className="w-full bg-luxury-cream dark:bg-neutral-900 border border-luxury-border dark:border-neutral-800 rounded-xl py-2 pl-10 pr-9 text-xs text-luxury-dark dark:text-white placeholder-neutral-400 focus:outline-none focus:border-luxury-gold"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          </div>
        </div>
      )}
    </header>
  );
};
