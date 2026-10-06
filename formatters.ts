import { CartItem } from "@/types";

export const WHATSAPP_PHONE = "244945665918";

/**
 * Formata um valor numérico para o padrão monetário de Angola em Kwanza (Kz).
 * Exemplo: 45000 -> "45.000 Kz"
 */
export function formatKz(value: number): string {
  if (isNaN(value)) return "0 Kz";
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted} Kz`;
}

interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
}

/**
 * Gera a mensagem formatada para checkout no WhatsApp oficial da Moir Store
 */
export function generateWhatsAppMessage(
  items: CartItem[],
  total: number,
  delivery: DeliveryInfo,
  discount: number = 0,
  couponCode?: string
): string {
  const itemsText = items
    .map((item) => {
      const unitPrice = item.product.salePrice ?? item.product.price;
      return `• ${item.product.name} (${item.selectedVariant}) x${item.quantity} — ${formatKz(unitPrice)}`;
    })
    .join("\n");

  let discountText = "";
  if (discount > 0 && couponCode) {
    discountText = `\n*Desconto Aplicado (${couponCode}):* -${formatKz(discount)}`;
  }

  const message = `Olá Moir Store! Gostaria de concluir o seguinte pedido:

*Itens da Sacola:*
${itemsText}${discountText}

*Total:* ${formatKz(total)}

*Dados para Entrega:*
• Cliente: ${delivery.fullName}
• Telefone: ${delivery.phone}
• Endereço: ${delivery.address}`;

  return message;
}

/**
 * Retorna o link completo do WhatsApp com a mensagem codificada
 */
export function getWhatsAppCheckoutUrl(
  items: CartItem[],
  total: number,
  delivery: DeliveryInfo,
  discount: number = 0,
  couponCode?: string
): string {
  const message = generateWhatsAppMessage(items, total, delivery, discount, couponCode);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
