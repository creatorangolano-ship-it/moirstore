"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { formatKz } from "@/lib/formatters";
import { X, ShoppingBag, Plus, Minus, Check, ShieldCheck, Sparkles, AlertTriangle } from "lucide-react";

export const ProductDetailModal: React.FC = () => {
  const { activeProductDetail, setActiveProductDetail, addToCart } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (activeProductDetail) {
      setSelectedVariant(activeProductDetail.variants[0] || "");
      setQuantity(1);
    }
  }, [activeProductDetail]);

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 5;

  const handleAdd = () => {
    const success = addToCart(product, selectedVariant, quantity);
    if (success) {
      setActiveProductDetail(null);
    }
  };

  const handleQtyChange = (delta: number) => {
    const next = quantity + delta;
    if (next >= 1 && next <= product.stock) {
      setQuantity(next);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-luxury-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de arrasto mobile / Fechar */}
        <div className="relative p-4 pb-2 border-b border-luxury-border/60 flex items-center justify-between">
          <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto sm:hidden absolute left-1/2 -translate-x-1/2 top-2" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-luxury-gold font-bold">
              {product.category}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
              {product.subcategory}
            </span>
          </div>
          <button
            onClick={() => setActiveProductDetail(null)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-luxury-dark hover:bg-luxury-cream transition-colors"
            aria-label="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Foto Principal */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-luxury-cream shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.salePrice && (
                <div className="absolute top-3 left-3 bg-red-800 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  Promoção Especial
                </div>
              )}
            </div>

            {/* Informações & Configuração de Compra */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-luxury-dark font-medium leading-snug">
                  {product.name}
                </h2>

                {/* Preço em Kz */}
                <div className="mt-3 flex items-baseline gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-xl sm:text-2xl font-bold text-luxury-dark">
                        {formatKz(product.salePrice)}
                      </span>
                      <span className="text-sm text-neutral-400 line-through">
                        {formatKz(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-luxury-dark">
                      {formatKz(product.price)}
                    </span>
                  )}
                </div>

                {/* Status do Estoque */}
                <div className="mt-3 flex items-center gap-2">
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-red-600 font-medium">
                      <AlertTriangle className="w-4 h-4" /> Produto Esgotado
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                      <AlertTriangle className="w-4 h-4" /> Estoque baixo: apenas {product.stock} un. restantes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <Check className="w-4 h-4" /> Disponível para entrega imediata em Luanda
                    </span>
                  )}
                </div>

                {/* Descrição */}
                <div className="mt-4 pt-4 border-t border-luxury-border/60">
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                    Descrição
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Seleção de Variante (Obrigatória) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                    {product.category === "Roupas" ? "Selecione o Tamanho:" : "Volume do Frasco:"}
                  </label>
                  <span className="text-xs font-bold text-luxury-gold">{selectedVariant}</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant === variant;
                    return (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wider border transition-all text-center ${
                          isSelected
                            ? "bg-luxury-dark text-luxury-gold border-luxury-dark shadow-sm"
                            : "bg-white text-neutral-700 border-luxury-border hover:border-luxury-gold/60"
                        }`}
                      >
                        {variant}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantidade */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                  Quantidade:
                </span>
                <div className="flex items-center border border-luxury-border rounded-xl overflow-hidden bg-luxury-cream">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2 text-neutral-600 hover:text-luxury-dark hover:bg-neutral-200 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-luxury-dark">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="p-2 text-neutral-600 hover:text-luxury-dark hover:bg-neutral-200 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Garantias de Boutique */}
          <div className="p-3.5 rounded-2xl bg-luxury-cream border border-luxury-border flex items-center gap-3 text-luxury-dark text-xs">
            <ShieldCheck className="w-5 h-5 text-luxury-gold flex-shrink-0" />
            <p className="text-[11px] text-neutral-600">
              Garantia Moir Store: Roupas originais em tecidos de alfaiataria e perfumes 100% autênticos importados com lote verificado.
            </p>
          </div>
        </div>

        {/* Rodapé Fixo da Ação */}
        <div className="p-4 border-t border-luxury-border bg-white flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[10px] text-neutral-400 block uppercase font-medium">Subtotal</span>
            <span className="text-sm sm:text-base font-bold text-luxury-dark">
              {formatKz((product.salePrice ?? product.price) * quantity)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className="flex-[2] py-3.5 px-6 rounded-2xl bg-luxury-dark text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 active:scale-95 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-luxury-gold" />
            <span>Adicionar à Sacola</span>
          </button>
        </div>
      </div>
    </div>
  );
};
