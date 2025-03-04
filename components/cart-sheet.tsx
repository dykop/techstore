"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

export function CartSheet() {
  const { items, removeItem, updateQuantity } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    const message = `Hola, quisiera hacer un pedido. 
    Lista:\n\n${items
      .map(
        (item) =>
          `${item.name} x${item.quantity} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n")}\n\nTotal: ${formatPrice(total)} USD`;

    // Número de teléfono de WhatsApp (código de país +54 para Argentina)
    const phoneNumber = "+541123551939";

    // Crear la URL de WhatsApp de manera segura, usando encodeURIComponent
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Abrir la URL en una nueva ventana
    window.open(whatsappURL, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-lg font-semibold">Su carito esta vacío.</h2>
        <p className="text-sm text-muted-foreground">
          Agregue produtos para continuar con su pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <h2 className="text-lg font-semibold mb-4">Carrito Web</h2>
      <div className="flex-1 overflow-auto">
        <ul className="grid gap-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 items-start border-b pb-4">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 grid gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>
        <Button className="w-full" size="lg" onClick={handleWhatsAppCheckout}>
          Contactarse via WhatsApp
        </Button>
      </div>
    </div>
  );
}
