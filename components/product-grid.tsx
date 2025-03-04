"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getProducts,
  type Product,
  type ProductVariant,
} from "@/lib/productService";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

export function ProductGrid() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Agrupar productos por nombre para mostrar variantes juntas
        const groupedProducts = data.reduce(
          (acc: Product[], current: Product) => {
            const existingProduct = acc.find(
              (item) =>
                item.name === current.name && item.brand === current.brand
            );
            if (existingProduct) {
              // Si el producto ya existe, agregamos sus variantes al array de variantes
              existingProduct.variants = [
                ...existingProduct.variants,
                ...current.variants,
              ];
            } else {
              // Si es un nuevo producto, lo agregamos a la lista
              acc.push({ ...current });
            }
            return acc;
          },
          []
        );
        setProducts(groupedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const query = searchParams.get("q")?.toLowerCase();
    const categories = searchParams.getAll("category");
    const brands = searchParams.getAll("brand");

    if (query && !product.name.toLowerCase().includes(query)) {
      return false;
    }

    if (categories.length && !categories.includes(product.category)) {
      return false;
    }

    if (brands.length && !brands.includes(product.brand)) {
      return false;
    }

    return true;
  });

  const groupedByCategory = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div>
      {Object.entries(groupedByCategory).map(([category, products]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="block relative"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={
                        `http://localhost:5139${product.imageUrl}` ||
                        "/placeholder.svg"
                      }
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4 space-y-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {product.brand}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/10">
                      {product.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-2 block">
                      Memoria RAM
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from(
                        new Set(product.variants.map((v) => v.ram))
                      ).map((ram) => (
                        <Button
                          key={`${product.id}-${ram}`}
                          variant={
                            selectedRam === ram &&
                            selectedProduct?.id === product.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => {
                            setSelectedProduct(product);
                            setSelectedRam(ram);
                            setSelectedStorage(null);
                          }}
                        >
                          {ram}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedProduct?.id === product.id && selectedRam && (
                    <div>
                      <label className="text-xs font-medium mb-2 block">
                        Almacenamiento
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from(
                          new Set(
                            product.variants
                              .filter((v) => v.ram === selectedRam)
                              .map((v) => v.storage)
                          )
                        ).map((storage) => (
                          <Button
                            key={`${product.id}-${storage}`}
                            variant={
                              selectedStorage === storage
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => setSelectedStorage(storage)}
                          >
                            {storage}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct?.id === product.id &&
                    selectedRam &&
                    selectedStorage && (
                      <div>
                        {(() => {
                          const variant = product.variants.find(
                            (v) =>
                              v.ram === selectedRam &&
                              v.storage === selectedStorage
                          );
                          return variant ? (
                            <>
                              <>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">
                                    Precio:
                                  </span>
                                  <span className="text-lg font-bold">
                                    {formatPrice(variant.price)}
                                  </span>
                                </div>
                                <div className="space-y-2 mb-4">
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">
                                      Garantía:
                                    </span>
                                    <span className="text-muted-foreground">
                                      {variant.garantia}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">
                                      Condición:
                                    </span>
                                    <span className="text-muted-foreground">
                                      {variant.condicion}
                                    </span>
                                  </div>
                                </div>
                              </>
                              <Button
                                className="w-full"
                                size="sm"
                                onClick={() => {
                                  addItem({
                                    id: `${product.id}-${variant.id}`,
                                    name: `${product.name} (${variant.ram} - ${variant.storage})`,
                                    price: variant.price,
                                    image: `http://localhost:5139${product.imageUrl}`,
                                  });
                                  setSelectedRam(null);
                                  setSelectedStorage(null);
                                  setSelectedProduct(null);
                                }}
                              >
                                Agregar al Carrito
                              </Button>
                            </>
                          ) : null;
                        })()}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
