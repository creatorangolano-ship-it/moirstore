"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Product, ProductCategory } from "@/types";
import { formatKz } from "@/lib/formatters";
import {
  Package,
  AlertTriangle,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetDefaultProducts,
    users,
    toggleAdminMode,
  } = useStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Estados do formulário
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Roupas");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState<number>(30000);
  const [salePrice, setSalePrice] = useState<string>("");
  const [stock, setStock] = useState<number>(10);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  const [featured, setFeatured] = useState<boolean>(false);

  // Opções padrão por categoria
  const CLOTHING_VARIANTS = ["PP", "P", "M", "G", "GG"];
  const PERFUME_VARIANTS = ["30ml", "50ml", "100ml"];

  // Métricas / Indicadores
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;
  const totalCustomers = users.length;
  const totalStockValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  const openNewForm = () => {
    setEditingProductId(null);
    setName("");
    setCategory("Roupas");
    setSubcategory("Coleção Nova");
    setPrice(35000);
    setSalePrice("");
    setStock(10);
    setImageUrl("https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80");
    setDescription("Confeccionado com rigor artesanal para os mais altos padrões de elegância em Luanda.");
    setVariants(["P", "M", "G"]);
    setFeatured(false);
    setIsFormOpen(true);
  };

  const openEditForm = (prod: Product) => {
    setEditingProductId(prod.id);
    setName(prod.name);
    setCategory(prod.category);
    setSubcategory(prod.subcategory);
    setPrice(prod.price);
    setSalePrice(prod.salePrice ? prod.salePrice.toString() : "");
    setStock(prod.stock);
    setImageUrl(prod.imageUrl);
    setDescription(prod.description);
    setVariants([...prod.variants]);
    setFeatured(prod.featured);
    setIsFormOpen(true);
  };

  const handleCategoryChange = (newCat: ProductCategory) => {
    setCategory(newCat);
    if (newCat === "Roupas") {
      setVariants(["P", "M", "G"]);
    } else {
      setVariants(["50ml", "100ml"]);
    }
  };

  const toggleVariant = (v: string) => {
    if (variants.includes(v)) {
      if (variants.length > 1) {
        setVariants(variants.filter((item) => item !== v));
      }
    } else {
      setVariants([...variants, v]);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSalePrice = salePrice && !isNaN(Number(salePrice)) ? Number(salePrice) : undefined;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name,
        category,
        subcategory,
        price: Number(price),
        salePrice: parsedSalePrice,
        stock: Number(stock),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description,
        variants,
        featured,
      });
    } else {
      addProduct({
        name,
        category,
        subcategory,
        price: Number(price),
        salePrice: parsedSalePrice,
        stock: Number(stock),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description,
        variants,
        featured,
      });
    }

    setIsFormOpen(false);
  };

  return (
    <div className="bg-luxury-cream min-h-screen pb-16">
      {/* Top Header do Painel */}
      <div className="bg-white border-b border-luxury-border py-4 px-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAdminMode}
              className="p-2 rounded-xl bg-luxury-cream hover:bg-neutral-200 text-luxury-dark transition-colors"
              title="Voltar à Loja"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-luxury-dark tracking-wide">
                Painel Administrativo
              </h1>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
                Gestão de Produtos & Estoque (Moir Store Luanda)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDefaultProducts}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-luxury-border text-neutral-600 hover:text-luxury-dark hover:bg-luxury-cream text-xs font-medium transition-colors"
              title="Restaurar Catálogo Padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>

            <button
              onClick={openNewForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-luxury-dark hover:bg-neutral-800 text-white text-xs font-bold tracking-wider uppercase shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 text-luxury-gold" />
              <span>Novo Produto</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-6">
        {/* Grade de 4 Indicadores (KPIs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-luxury-border shadow-xs flex items-center gap-3">
            <div className="p-3 rounded-xl bg-luxury-cream text-luxury-gold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                Produtos Ativos
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-luxury-dark">
                {totalProducts}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-luxury-border shadow-xs flex items-center gap-3">
            <div className={`p-3 rounded-xl ${lowStockCount > 0 ? "bg-amber-100 text-amber-700" : "bg-neutral-100 text-neutral-500"}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                Estoque Baixo (&lt; 5)
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-luxury-dark">
                {lowStockCount}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-luxury-border shadow-xs flex items-center gap-3">
            <div className="p-3 rounded-xl bg-luxury-cream text-luxury-gold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                Clientes Registrados
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-luxury-dark">
                {totalCustomers}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-luxury-border shadow-xs flex items-center gap-3">
            <div className="p-3 rounded-xl bg-luxury-cream text-luxury-gold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                Valor Total do Estoque
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold text-luxury-dark">
                {formatKz(totalStockValue)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabela / Cards de Produtos */}
        <div className="bg-white rounded-2xl border border-luxury-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-luxury-border flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-luxury-dark">
              Catálogo de Produtos em Luanda ({products.length})
            </h3>
            <span className="text-xs text-neutral-400">
              Sincronização imediata com a vitrine
            </span>
          </div>

          <div className="divide-y divide-luxury-border">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
              >
                {/* Produto Info */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-14 h-16 rounded-xl object-cover bg-neutral-100 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-luxury-gold uppercase px-1.5 py-0.5 rounded bg-luxury-gold/10">
                        {prod.category}
                      </span>
                      <span className="text-xs text-neutral-400">•</span>
                      <span className="text-xs text-neutral-500">{prod.subcategory}</span>
                      {prod.featured && (
                        <span className="text-[9px] bg-luxury-dark text-luxury-gold font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5" /> Destaque
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-luxury-dark mt-0.5">{prod.name}</h4>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="font-bold text-luxury-dark">{formatKz(prod.price)}</span>
                      {prod.salePrice && (
                        <span className="text-[11px] text-red-600 font-semibold">
                          (Promo: {formatKz(prod.salePrice)})
                        </span>
                      )}
                      <span className="text-neutral-300">|</span>
                      <span className="text-[10px] text-neutral-500">
                        Variantes: {prod.variants.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controles de Estoque e Ações */}
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                  {/* Ajuste Rápido de Estoque (+ / -) */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-500 uppercase font-semibold">
                      Estoque:
                    </span>
                    <div className="flex items-center border border-luxury-border rounded-xl bg-luxury-cream overflow-hidden">
                      <button
                        onClick={() => updateStock(prod.id, -1)}
                        className="px-2 py-1 text-neutral-600 hover:text-luxury-dark hover:bg-neutral-200 transition-colors font-bold"
                        title="Diminuir 1 unidade"
                      >
                        -
                      </button>
                      <span
                        className={`w-9 text-center text-xs font-bold ${
                          prod.stock < 5 ? "text-amber-700 bg-amber-50" : "text-luxury-dark"
                        }`}
                      >
                        {prod.stock}
                      </span>
                      <button
                        onClick={() => updateStock(prod.id, 1)}
                        className="px-2 py-1 text-neutral-600 hover:text-luxury-dark hover:bg-neutral-200 transition-colors font-bold"
                        title="Aumentar 1 unidade"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botões Editar / Excluir */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditForm(prod)}
                      className="p-2 rounded-xl text-neutral-600 hover:text-luxury-dark hover:bg-luxury-cream transition-colors"
                      title="Editar Produto"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Deseja realmente remover o produto "${prod.name}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Excluir Produto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal / Formulário de Cadastro e Edição */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-white rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-luxury-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-luxury-border flex items-center justify-between bg-luxury-cream/40">
              <h3 className="font-serif text-base font-bold text-luxury-dark">
                {editingProductId ? "Editar Produto" : "Novo Produto para o Catálogo"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-luxury-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Vestido Seda Elegante ou Moir Privé 100ml"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Categoria *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold font-medium"
                  >
                    <option value="Roupas">Roupas</option>
                    <option value="Perfumes">Perfumes</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Subcategoria *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Alfaiataria, Amadeirado..."
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Preço (Kz) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={500}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Promoção (Kz)
                  </label>
                  <input
                    type="number"
                    placeholder="Opcional"
                    min={1000}
                    step={500}
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold font-bold"
                  />
                </div>
              </div>

              {/* Variantes Condicionais com base na Categoria */}
              <div>
                <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1.5">
                  Variantes Disponíveis ({category === "Roupas" ? "Tamanhos" : "Volumetria em ml"}) *
                </label>
                <div className="flex flex-wrap gap-2">
                  {(category === "Roupas" ? CLOTHING_VARIANTS : PERFUME_VARIANTS).map((v) => {
                    const isChecked = variants.includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => toggleVariant(v)}
                        className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-all ${
                          isChecked
                            ? "bg-luxury-dark text-luxury-gold border-luxury-dark shadow-xs"
                            : "bg-white text-neutral-400 border-neutral-300 hover:border-neutral-400"
                        }`}
                      >
                        {isChecked ? `✓ ${v}` : `+ ${v}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                  URL da Foto (Unsplash)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                  Descrição do Produto
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva tecidos, notas olfativas e diferenciais..."
                  className="w-full bg-luxury-cream border border-luxury-border rounded-xl px-3 py-2 text-luxury-dark focus:outline-none focus:border-luxury-gold resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-luxury-dark accent-luxury-dark"
                />
                <label htmlFor="featured-check" className="font-semibold text-luxury-dark cursor-pointer">
                  Destacar este produto na página inicial
                </label>
              </div>

              <div className="pt-3 border-t border-luxury-border flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-luxury-border text-neutral-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 rounded-xl bg-luxury-dark hover:bg-neutral-800 text-white font-bold uppercase tracking-wider shadow-md"
                >
                  {editingProductId ? "Salvar Alterações" : "Cadastrar Produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
