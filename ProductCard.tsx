"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { formatKz } from "@/lib/formatters";
import { useStore } from "@/context/StoreContext";
import { Plus, Eye, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductDetail } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Se nenhuma variante foi pré-selecionada, define a primeira como conveniência ou abre modal
    if (!selectedVariant) {
      if (product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
        addToCart(product, product.variants[0], 1);
      } else {
        setActiveProductDetail(product);
      }
    } else {
      addToCart(product, selectedVariant, 1);
    }
  };

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => setActiveProductDetail(product)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-luxury-border shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Imagem do Produto */}
      <div className="relative aspect-[4/5] bg-luxury-cream overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Flutuantes */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {product.featured && (
            <span className="inline-flex items-center gap-1 bg-luxury-dark/90 text-luxury-gold text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-xs">
              <Sparkles className="w-2.5 h-2.5" /> Destaque
            </span>
          )}
          {product.salePrice && (
            <span className="bg-red-800 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Promoção
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-700/90 text-white text-[9px] font-medium tracking-wide px-2 py-0.5 rounded-full backdrop-blur-xs">
              Últimas {product.stock} un.
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-neutral-800 text-neutral-300 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
              Esgotado
            </span>
          )}
        </div>

        {/* Botão de Ver Detalhes Rápido */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveProductDetail(product);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-luxury-dark opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
          title="Ver Detalhes do Produto"
          aria-label="Ver Detalhes"
        >
          <Eye className="w-4 h-4 text-luxury-dark" />
        </button>

        {/* Indicador de Categoria no Canto Inferior */}
        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-neutral-700 border border-neutral-200/60 shadow-xs">
            {product.category}
          </span>
        </div>
      </div>

      {/* Conteúdo Informativo */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-0.5">
            {product.subcategory}
          </span>
          <h3 className="font-serif text-xs sm:text-sm font-medium text-luxury-dark line-clamp-2 leading-snug group-hover:text-luxury-gold transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Seleção Rápida de Variantes (Mobile-friendly) */}
        <div className="my-2.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
            <span>{product.category === "Roupas" ? "Tamanho:" : "Volume:"}</span>
            {selectedVariant && (
              <span className="font-semibold text-luxury-gold">{selectedVariant}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {product.variants.map((v) => {
              const isSelected = selectedVariant === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                    isSelected
                      ? "bg-luxury-dark text-luxury-gold border-luxury-dark font-bold shadow-xs"
                      : "bg-luxury-cream text-neutral-700 border-luxury-border hover:border-luxury-gold/50"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preço e Botão Adicionar */}
        <div className="pt-2 border-t border-luxury-border/60 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-[10px] text-neutral-400 line-through">
                  {formatKz(product.price)}
                </span>
                <span className="text-xs sm:text-sm font-bold text-luxury-dark">
                  {formatKz(product.salePrice)}
                </span>
              </>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-luxury-dark">
                {formatKz(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide transition-all ${
              isOutOfStock
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-luxury-dark text-white hover:bg-neutral-800 active:scale-95 shadow-xs"
            }`}
            aria-label="Adicionar à Sacola"
          >
            <Plus className="w-3.5 h-3.5 text-luxury-gold" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
