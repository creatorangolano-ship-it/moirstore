"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem, User, Order, ToastMessage, Coupon, ProductCategory } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/mockProducts";
import { STORAGE_KEYS, getFromStorage, saveToStorage, removeFromStorage } from "@/lib/storage";

interface StoreContextType {
  // Tema (Claro / Escuro)
  theme: "light" | "dark";
  toggleTheme: () => void;

  // Produtos
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, delta: number) => void;
  resetDefaultProducts: () => void;

  // Sacola / Carrinho
  cart: CartItem[];
  addToCart: (product: Product, variant: string, quantity?: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Autenticação & Usuários
  currentUser: User | null;
  users: User[];
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    neighborhood: string;
  }) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalView: "login" | "register";
  openAuthModal: (view?: "login" | "register") => void;
  closeAuthModal: () => void;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  // Pedidos
  orders: Order[];
  recordOrder: (customerInfo: { fullName: string; phone: string; address: string }) => Order;

  // Painel de Gestão (Admin)
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  toggleAdminMode: () => void;

  // Notificações Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // Filtros de Loja & Navegação
  selectedCategory: "Todos" | "Roupas" | "Perfumes" | "Destaques";
  setSelectedCategory: (cat: "Todos" | "Roupas" | "Perfumes" | "Destaques") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (prod: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, number> = {
  MOIR10: 10,
  LUXURY: 15,
  BEMVINDO: 5,
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tema
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Estados principais
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Estados de UI
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<
    "Todos" | "Roupas" | "Perfumes" | "Destaques"
  >("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);

  // Inicialização no cliente com localStorage
  useEffect(() => {
    // Carregar tema
    const savedTheme = (localStorage.getItem("moir_theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Carregar produtos
    const storedProducts = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      setProducts(INITIAL_PRODUCTS);
      saveToStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    }

    // Carregar carrinho
    const storedCart = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
    setCart(storedCart);

    // Carregar usuários
    const storedUsers = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    setUsers(storedUsers);

    // Carregar sessão ativa
    const activeAuth = getFromStorage<User | null>(STORAGE_KEYS.AUTH, null);
    setCurrentUser(activeAuth);

    // Carregar pedidos
    const storedOrders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    setOrders(storedOrders);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("moir_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    addToast(`Modo ${nextTheme === "dark" ? "Escuro (Noir)" : "Claro (Boutique)"} ativado!`, "info");
  };

  // Notificações Toast
  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Gerenciamento de Produtos
  const addProduct = (newProdData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...newProdData,
      id: "moir-prod-" + Date.now().toString().slice(-6),
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    addToast(`Produto "${newProduct.name}" cadastrado com sucesso!`, "success");
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    addToast("Produto atualizado com sucesso!", "success");
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    addToast(`"${target?.name ?? "Produto"}" removido do catálogo.`, "info");
  };

  const updateStock = (id: string, delta: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        return { ...p, stock: newStock };
      }
      return p;
    });
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const resetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    saveToStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    addToast("Catálogo redefinido para os produtos iniciais padrão.", "info");
  };

  // Gestão do Carrinho
  const addToCart = (product: Product, variant: string, quantity = 1): boolean => {
    if (!variant || variant.trim() === "") {
      addToast(
        product.category === "Roupas"
          ? "Por favor, selecione um tamanho (PP, P, M, G, GG)!"
          : "Por favor, selecione a volumetria do frasco (ex: 50ml, 100ml)!",
        "error"
      );
      return false;
    }

    if (product.stock <= 0) {
      addToast("Desculpe, este produto está temporariamente esgotado.", "error");
      return false;
    }

    const cartItemId = `${product.id}__${variant}`;
    const existingIndex = cart.findIndex((item) => item.id === cartItemId);

    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      if (currentQty + quantity > product.stock) {
        addToast(
          `Limite de estoque atingido! Temos apenas ${product.stock} unidades disponíveis.`,
          "error"
        );
        return false;
      }

      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      if (quantity > product.stock) {
        addToast(`Estoque insuficiente. Apenas ${product.stock} unidades disponíveis.`, "error");
        return false;
      }
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        product,
        selectedVariant: variant,
        quantity,
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    saveToStorage(STORAGE_KEYS.CART, updatedCart);
    addToast(`"${product.name}" (${variant}) adicionado à sacola!`, "success");
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    const updated = cart.filter((i) => i.id !== cartItemId);
    setCart(updated);
    saveToStorage(STORAGE_KEYS.CART, updated);
    if (item) {
      addToast(`"${item.product.name}" removido da sacola.`, "info");
    }
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const item = cart.find((i) => i.id === cartItemId);
    if (!item) return;

    if (newQuantity > item.product.stock) {
      addToast(`Limite atingido! Apenas ${item.product.stock} unidades em estoque.`, "error");
      return;
    }

    const updated = cart.map((i) => (i.id === cartItemId ? { ...i, quantity: newQuantity } : i));
    setCart(updated);
    saveToStorage(STORAGE_KEYS.CART, updated);
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage(STORAGE_KEYS.CART, []);
    setCouponCode(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.salePrice ?? item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountPercent = couponCode && VALID_COUPONS[couponCode] ? VALID_COUPONS[couponCode] : 0;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount);

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (VALID_COUPONS[upper]) {
      setCouponCode(upper);
      addToast(
        `Cupom "${upper}" aplicado com sucesso! Desconto de ${VALID_COUPONS[upper]}%.`,
        "success"
      );
      return { success: true, message: `Desconto de ${VALID_COUPONS[upper]}% aplicado!` };
    } else {
      addToast("Cupom inválido ou expirado. Tente MOIR10 ou LUXURY.", "error");
      return { success: false, message: "Cupom inválido." };
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    addToast("Cupom removido.", "info");
  };

  // Autenticação
  const register = (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    neighborhood: string;
  }) => {
    const emailNorm = data.email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === emailNorm);
    if (existing) {
      addToast("Este e-mail já está cadastrado. Faça login!", "error");
      return { success: false, message: "E-mail já cadastrado." };
    }

    const newUser: User = {
      id: "usr-" + Date.now().toString(),
      fullName: data.fullName.trim(),
      email: emailNorm,
      password: data.password,
      phone: data.phone.trim(),
      neighborhood: data.neighborhood.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);

    setCurrentUser(newUser);
    saveToStorage(STORAGE_KEYS.AUTH, newUser);

    addToast(`Bem-vindo à Moir Store, ${newUser.fullName.split(" ")[0]}!`, "success");
    setIsAuthModalOpen(false);
    return { success: true, message: "Conta criada com sucesso!" };
  };

  const login = (email: string, pass: string) => {
    const emailNorm = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === emailNorm);

    if (!user || user.password !== pass) {
      addToast("E-mail ou senha incorretos. Verifique seus dados.", "error");
      return { success: false, message: "Credenciais inválidas." };
    }

    setCurrentUser(user);
    saveToStorage(STORAGE_KEYS.AUTH, user);
    addToast(`Olá novamente, ${user.fullName.split(" ")[0]}!`, "success");
    setIsAuthModalOpen(false);
    return { success: true, message: "Login realizado com sucesso!" };
  };

  const logout = () => {
    setCurrentUser(null);
    removeFromStorage(STORAGE_KEYS.AUTH);
    setIsProfileModalOpen(false);
    addToast("Sessão finalizada com segurança.", "info");
  };

  const openAuthModal = (view: "login" | "register" = "login") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleAdminMode = () => setIsAdminMode((prev) => !prev);

  // Registro de Pedido
  const recordOrder = (customerInfo: {
    fullName: string;
    phone: string;
    address: string;
  }): Order => {
    const orderItems = cart.map((c) => ({
      productName: c.product.name,
      category: c.product.category,
      variant: c.selectedVariant,
      quantity: c.quantity,
      unitPrice: c.product.salePrice ?? c.product.price,
    }));

    const newOrder: Order = {
      id: "MOIR-" + Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toLocaleDateString("pt-AO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: orderItems,
      subtotal,
      discount,
      couponCode: couponCode ?? undefined,
      total,
      customerInfo,
      status: "Enviado WhatsApp",
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders);

    cart.forEach((item) => {
      updateStock(item.product.id, -item.quantity);
    });

    clearCart();

    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetDefaultProducts,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        total,
        couponCode,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,

        currentUser,
        users,
        register,
        login,
        logout,
        isAuthModalOpen,
        authModalView,
        openAuthModal,
        closeAuthModal,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,

        orders,
        recordOrder,

        isAdminMode,
        setIsAdminMode,
        toggleAdminMode,

        toasts,
        addToast,
        removeToast,

        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeProductDetail,
        setActiveProductDetail,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore deve ser usado dentro de um StoreProvider");
  }
  return context;
};
