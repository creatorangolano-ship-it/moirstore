"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { formatKz, getWhatsAppCheckoutUrl } from "@/lib/formatters";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    currentUser,
    recordOrder,
    addToast,
    openAuthModal,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Dados para entrega
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Pré-preenche se o usuário estiver logado
  React.useEffect(() => {
    if (currentUser) {
      setDeliveryName(currentUser.fullName);
      setDeliveryPhone(currentUser.phone);
      setDeliveryAddress(currentUser.neighborhood);
    }
  }, [currentUser, isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon("");
  };

  const handleProceedToWhatsApp = () => {
    // Validação dos dados de entrega
    const name = deliveryName.trim();
    const phone = deliveryPhone.trim();
    const address = deliveryAddress.trim();

    if (!name || !phone || !address) {
      addToast("Por favor, preencha todos os dados de entrega em Luanda!", "error");
      return;
    }

    const deliveryInfo = {
      fullName: name,
      phone,
      address,
    };

    // Gera o link codificado do WhatsApp
    const waUrl = getWhatsAppCheckoutUrl(
      cart,
      total,
      deliveryInfo,
      discount,
      couponCode ?? undefined
    );

    // Registra o pedido localmente na conta do cliente
    recordOrder(deliveryInfo);

    addToast("Pedido registrado! Redirecionando para o WhatsApp oficial...", "success");

    // Abre o WhatsApp oficial em nova aba
    window.open(waUrl, "_blank");

    setShowCheckoutForm(false);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-luxury-border animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho da Sacola */}
        <div className="p-4 border-b border-luxury-border flex items-center justify-between bg-luxury-cream/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-luxury-gold" />
            <h2 className="font-serif text-lg font-medium text-luxury-dark tracking-wide">
              Sua Sacola ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-neutral-400 hover:text-luxury-dark hover:bg-neutral-200 transition-colors"
            aria-label="Fechar Sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Itens ou Estado Vazio */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-luxury-cream border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-medium text-luxury-dark mb-1">
              Sua sacola está vazia
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mb-6">
              Descubra nossos vestidos elegantes, camisas em linho e perfumes de nicho exclusivos.
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-3 rounded-full bg-luxury-dark text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all"
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Lista dos Itens */}
            <div className="space-y-3">
              {cart.map((item) => {
                const unitPrice = item.product.salePrice ?? item.product.price;
                const isMaxStock = item.quantity >= item.product.stock;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-2xl bg-luxury-cream/40 border border-luxury-border hover:border-luxury-gold/40 transition-colors"
                  >
                    {/* Miniatura */}
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-xl bg-neutral-100 flex-shrink-0"
                    />

                    {/* Detalhes */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-semibold text-luxury-dark line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                            title="Remover item"
                            aria-label="Remover item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-neutral-500 uppercase font-medium">
                            {item.product.category}
                          </span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-[10px] font-bold text-luxury-gold px-1.5 py-0.2 rounded-md bg-white border border-luxury-gold/30">
                            {item.selectedVariant}
                          </span>
                        </div>
                      </div>

                      {/* Preço Unitário e Controles */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-bold text-luxury-dark">
                          {formatKz(unitPrice)}
                        </span>

                        <div className="flex items-center border border-luxury-border rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-neutral-500 hover:text-luxury-dark hover:bg-neutral-100 transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-luxury-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={isMaxStock}
                            className="p-1 px-2 text-neutral-500 hover:text-luxury-dark hover:bg-neutral-100 disabled:opacity-30 transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cupom de Desconto */}
            <div className="p-3.5 rounded-2xl bg-white border border-luxury-border space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-luxury-dark">
                <Tag className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Cupom Promocional</span>
              </div>

              {couponCode ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" />
                    <span className="text-xs font-bold text-luxury-dark tracking-wider">
                      {couponCode} (-{discount > 0 ? formatKz(discount) : ""})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-red-600 hover:underline font-medium"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: MOIR10 ou LUXURY"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    className="flex-1 bg-luxury-cream border border-luxury-border rounded-xl px-3 py-1.5 text-xs uppercase tracking-wider text-luxury-dark placeholder-neutral-400 focus:outline-none focus:border-luxury-gold"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-luxury-dark text-white text-xs font-semibold tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}
            </div>

            {/* Formulário de Entrega (se acionado ou aberto) */}
            {showCheckoutForm && (
              <div className="p-4 rounded-2xl bg-luxury-cream border border-luxury-gold/40 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-luxury-border pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-dark flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    Dados para Entrega em Luanda
                  </h4>
                  {!currentUser && (
                    <button
                      onClick={() => openAuthModal("login")}
                      className="text-[10px] text-luxury-gold hover:underline font-semibold"
                    >
                      Já tem conta? Entrar
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-[11px] text-neutral-600 font-medium block mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Paula da Silva"
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                    className="w-full bg-white border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-600 font-medium block mb-1">
                    Telefone de Contacto (+244) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 945 665 918"
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    className="w-full bg-white border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-600 font-medium block mb-1">
                    Bairro / Morada em Luanda *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Bairro Alvalade, Rua Rainha Ginga, Apt 4B"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-white border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="flex-1 py-2 rounded-xl border border-luxury-border bg-white text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToWhatsApp}
                    className="flex-[2] py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Enviar no WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resumo Financeiro & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-luxury-border bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>{formatKz(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Desconto ({couponCode})</span>
                  <span>-{formatKz(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-luxury-dark pt-1 border-t border-luxury-border/60">
                <span>Total</span>
                <span className="text-base text-luxury-dark">{formatKz(total)}</span>
              </div>
            </div>

            {!showCheckoutForm ? (
              <button
                onClick={() => {
                  if (currentUser) {
                    // Já preenchido, vai direto ou abre formulário
                    handleProceedToWhatsApp();
                  } else {
                    setShowCheckoutForm(true);
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Finalizar Pedido via WhatsApp</span>
              </button>
            ) : null}

            <p className="text-[10px] text-center text-neutral-400">
              Pagamento na entrega ou via Multicaixa Express em Luanda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
