"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import {
  getProductById,
  type Product,
  type ProductVariant,
} from "@/lib/productService";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(parseInt(params.id));
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Actualizar la variante seleccionada
  useEffect(() => {
    if (product && selectedRam && selectedStorage) {
      const variant = product.variants.find(
        (v) => v.ram === selectedRam && v.storage === selectedStorage
      );
      setSelectedVariant(variant || null);
    }
  }, [selectedRam, selectedStorage, product]);

  if (loading) {
    return <div className="container px-4 py-6">Cargando...</div>;
  }

  if (!product) {
    return <div className="container px-4 py-6">Producto no encontrado</div>;
  }

  // Definir el precio actual basado en la variante seleccionada
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <div className="container px-4 py-6 md:py-8 flex justify-center">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <Image
            src={
              product.imageUrl
                ? `http://localhost:5139${product.imageUrl}`
                : "/placeholder.svg"
            }
            alt={product.name}
            width={350}
            height={250}
            className="rounded-lg border bg-background"
          />
        </div>
        <div className="space-y-6 ml-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {/* <p className="text-2xl font-bold mt-2">
              {formatPrice(currentPrice)} {/* Muestra el precio actualizado }
            </p> */}
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div>
            <h2 className="text-lg font-semibold">Selecciona Memoria RAM</h2>
            <div className="grid grid-cols-2 gap-2">
              {Array.from(new Set(product.variants.map((v) => v.ram))).map(
                (ram) => (
                  <Button
                    key={`ram-${ram}`}
                    variant={selectedRam === ram ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedRam(ram);
                      setSelectedStorage(null); // Reinicia el almacenamiento cuando se cambia RAM
                    }}
                  >
                    {ram}
                  </Button>
                )
              )}
            </div>
          </div>

          {selectedRam && (
            <div>
              <h2 className="text-lg font-semibold">
                Selecciona Almacenamiento
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {Array.from(
                  new Set(
                    product.variants
                      .filter((v) => v.ram === selectedRam)
                      .map((v) => v.storage)
                  )
                ).map((storage) => (
                  <Button
                    key={`storage-${storage}`}
                    variant={
                      selectedStorage === storage ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {selectedVariant ? (
            <p>Precio: ${selectedVariant.price}</p>
          ) : (
            <p>Seleccione el modelo para ver el precio</p>
          )}
          {selectedRam && selectedStorage && selectedVariant && (
            <div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Garantía:</span>
                  <span className="text-muted-foreground">
                    {selectedVariant.garantia}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Condición:</span>
                  <span className="text-muted-foreground">
                    {selectedVariant.condicion}
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  addItem({
                    id: `${product.id}-${selectedVariant.id}`,
                    name: `${product.name} (${selectedRam} - ${selectedStorage})`,
                    price: selectedVariant.price,
                    image: `http://localhost:5139${product.imageUrl}`,
                  });
                  setSelectedRam(null);
                  setSelectedStorage(null);
                  setSelectedVariant(null);
                }}
              >
                Agregar al Carrito
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
