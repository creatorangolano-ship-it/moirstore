"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { formatKz } from "@/lib/formatters";
import { X, User, Phone, MapPin, Mail, LogOut, Package, Clock, CheckCircle2 } from "lucide-react";

export const UserProfileModal: React.FC = () => {
  const { isProfileModalOpen, closeProfileModal, currentUser, logout, orders } = useStore();

  if (!isProfileModalOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-luxury-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="p-4 border-b border-luxury-border flex items-center justify-between bg-luxury-cream/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-luxury-dark text-luxury-gold flex items-center justify-center font-serif font-bold text-xs">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-luxury-dark">
                {currentUser.fullName}
              </h3>
              <span className="text-[10px] text-neutral-500">Cliente Moir Privé</span>
            </div>
          </div>
          <button
            onClick={closeProfileModal}
            className="p-1.5 rounded-full text-neutral-400 hover:text-luxury-dark hover:bg-neutral-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Dados Cadastrados */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-dark border-b border-luxury-border pb-1.5">
              Meus Dados Cadastrados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-luxury-cream/50 border border-luxury-border">
                <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1 mb-1">
                  <Mail className="w-3 h-3 text-luxury-gold" /> E-mail
                </span>
                <span className="font-medium text-luxury-dark break-all">{currentUser.email}</span>
              </div>

              <div className="p-3 rounded-xl bg-luxury-cream/50 border border-luxury-border">
                <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1 mb-1">
                  <Phone className="w-3 h-3 text-luxury-gold" /> Telefone
                </span>
                <span className="font-medium text-luxury-dark">{currentUser.phone}</span>
              </div>

              <div className="col-span-1 sm:col-span-2 p-3 rounded-xl bg-luxury-cream/50 border border-luxury-border">
                <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-luxury-gold" /> Endereço em Luanda
                </span>
                <span className="font-medium text-luxury-dark">{currentUser.neighborhood}</span>
              </div>
            </div>
          </div>

          {/* Histórico de Pedidos Finalizados */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-luxury-border pb-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-dark flex items-center gap-1.5">
                <Package className="w-4 h-4 text-luxury-gold" />
                Histórico de Pedidos ({orders.length})
              </h4>
            </div>

            {orders.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-luxury-cream/30 border border-dashed border-luxury-border">
                <Clock className="w-6 h-6 text-neutral-300 mx-auto mb-2" />
                <p className="text-xs text-neutral-500">Nenhum pedido finalizado ainda.</p>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Seus pedidos enviados pelo WhatsApp aparecerão salvos aqui.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-2xl border border-luxury-border bg-white shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-luxury-dark tracking-wide">{order.id}</span>
                      <span className="text-[10px] text-neutral-400">{order.date}</span>
                    </div>

                    <div className="text-[11px] text-neutral-600 space-y-1 py-1 border-y border-neutral-100">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            • {it.productName} ({it.variant}) x{it.quantity}
                          </span>
                          <span className="font-semibold text-neutral-700">
                            {formatKz(it.unitPrice * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{order.status}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 block">Total do Pedido</span>
                        <span className="font-bold text-luxury-dark">{formatKz(order.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rodapé com Botão Terminar Sessão */}
        <div className="p-4 border-t border-luxury-border bg-white">
          <button
            onClick={logout}
            className="w-full py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminar Sessão</span>
          </button>
        </div>
      </div>
    </div>
  );
};
