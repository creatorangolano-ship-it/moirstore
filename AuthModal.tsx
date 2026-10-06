"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { X, Lock, Mail, User, Phone, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalView, openAuthModal, register, login } =
    useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authModalView === "login") {
      login(email, password);
    } else {
      register({
        fullName,
        email,
        password,
        phone,
        neighborhood,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-luxury-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative p-4 border-b border-luxury-border flex items-center justify-between bg-luxury-cream/40">
          <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto sm:hidden absolute left-1/2 -translate-x-1/2 top-2" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <span className="font-serif text-sm font-semibold tracking-wider uppercase text-luxury-dark">
              Moir Club Privé
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full text-neutral-400 hover:text-luxury-dark hover:bg-neutral-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alternância de Abas: Entrar vs Criar Conta */}
        <div className="flex border-b border-luxury-border bg-neutral-50">
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
              authModalView === "login"
                ? "bg-white text-luxury-dark border-b-2 border-luxury-dark shadow-xs"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => openAuthModal("register")}
            className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
              authModalView === "register"
                ? "bg-white text-luxury-dark border-b-2 border-luxury-dark shadow-xs"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Formulário com Scroll suave */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="text-center mb-2">
            <h3 className="font-serif text-lg font-medium text-luxury-dark">
              {authModalView === "login" ? "Bem-vindo de volta" : "Cadastre-se na Moir Store"}
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              {authModalView === "login"
                ? "Acesse seus pedidos e agilize suas compras por Luanda."
                : "Cadastre seus dados para preenchimento automático no WhatsApp."}
            </p>
          </div>

          {authModalView === "register" && (
            <>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
                  Nome Completo *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ex: Manuel António"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl py-2 pl-9 pr-3 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
                  Telefone (+244) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 923 456 789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl py-2 pl-9 pr-3 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
                  Bairro / Morada em Luanda *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ex: Talatona, Condomínio Palmeiras, Casa 12"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl py-2 pl-9 pr-3 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
              E-mail *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-luxury-cream border border-luxury-border rounded-xl py-2 pl-9 pr-3 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
              Senha de Acesso *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-luxury-cream border border-luxury-border rounded-xl py-2 pl-9 pr-3 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-luxury-dark hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <span>{authModalView === "login" ? "Entrar na Conta" : "Concluir Cadastro"}</span>
            <ArrowRight className="w-4 h-4 text-luxury-gold" />
          </button>

          <div className="text-center pt-2">
            {authModalView === "login" ? (
              <p className="text-xs text-neutral-500">
                Ainda não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="font-semibold text-luxury-gold hover:underline"
                >
                  Criar conta grátis
                </button>
              </p>
            ) : (
              <p className="text-xs text-neutral-500">
                Já possui conta?{" "}
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="font-semibold text-luxury-gold hover:underline"
                >
                  Entrar agora
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
