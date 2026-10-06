export type ProductCategory = "Roupas" | "Perfumes";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  salePrice?: number;
  stock: number;
  description: string;
  imageUrl: string;
  variants: string[];
  featured: boolean;
}

export interface CartItem {
  id: string; // unique combo of product id and variant
  productId: string;
  product: Product;
  selectedVariant: string;
  quantity: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  neighborhood: string;
  password?: string;
  createdAt: string;
}

export interface OrderItem {
  productName: string;
  category: ProductCategory;
  variant: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  customerInfo: {
    fullName: string;
    phone: string;
    address: string;
  };
  status: "Enviado WhatsApp" | "Confirmado" | "Entregue";
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minAmount?: number;
}
