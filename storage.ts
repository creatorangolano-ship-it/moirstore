export const STORAGE_KEYS = {
  PRODUCTS: "moir_products",
  USERS: "moir_users",
  AUTH: "moir_auth",
  CART: "moir_cart",
  ORDERS: "moir_orders",
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar chave ${key} do localStorage:`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar chave ${key} no localStorage:`, error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover chave ${key} do localStorage:`, error);
  }
}
