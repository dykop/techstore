"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/productService";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

interface ProductVariant {
  id: number;
  modelId: number;
  storage: string;
  ram: string;
  color: string;
  price: number;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  imageUrl: string;
  variants: ProductVariant[];
}

export function ProductGrid() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

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

  useEffect(() => {
    if (selectedProduct) {
      setVariants(selectedProduct.variants);
      setSelectedRam(null);
      setSelectedStorage(null);
      setSelectedVariant(null);
    }
  }, [selectedProduct]);

  useEffect(() => {
    // Cuando se selecciona tanto RAM como almacenamiento, buscar la variante correspondiente
    if (selectedRam && selectedStorage) {
      const variant = variants.find(
        (v) => v.ram === selectedRam && v.storage === selectedStorage
      );
      setSelectedVariant(variant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedRam, selectedStorage, variants]);

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

  // Obtener opciones únicas de RAM y almacenamiento
  const ramOptions = Array.from(new Set(variants.map((v) => v.ram)));
  const storageOptions = Array.from(
    new Set(
      variants
        .filter((v) => !selectedRam || v.ram === selectedRam)
        .map((v) => v.storage)
    )
  );

  const handleAddToCart = () => {
    if (selectedProduct && selectedVariant) {
      addItem({
        id: `${selectedProduct.id}-${selectedVariant.id}`,
        name: `${selectedProduct.name} (${selectedVariant.ram} - ${selectedVariant.storage})`,
        price: selectedVariant.price,
        image: `http://localhost:5139${selectedProduct.imageUrl}`,
      });
      // Resetear selecciones
      setSelectedProduct(null);
      setSelectedRam(null);
      setSelectedStorage(null);
      setSelectedVariant(null);
    }
  };

  return (
    <div>
      {selectedProduct && variants.length > 0 && (
        <div className="mb-6 p-6 border rounded-lg bg-background shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {selectedProduct.name}
              </h2>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {selectedProduct.brand}
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/10">
                  {selectedProduct.category}
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSelectedProduct(null)}>
              Cerrar
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Opciones de RAM */}
              <div>
                <h3 className="text-lg font-medium mb-3">Memoria RAM</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ramOptions.map((ram) => (
                    <Button
                      key={ram}
                      variant={selectedRam === ram ? "default" : "outline"}
                      className="w-full"
                      onClick={() => {
                        setSelectedRam(ram);
                        setSelectedStorage(null);
                      }}
                    >
                      {ram}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Opciones de Almacenamiento */}
              {selectedRam && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Almacenamiento</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {storageOptions.map((storage) => (
                      <Button
                        key={storage}
                        variant={
                          selectedStorage === storage ? "default" : "outline"
                        }
                        className="w-full"
                        onClick={() => setSelectedStorage(storage)}
                      >
                        {storage}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resumen y acción */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                Resumen de la configuración
              </h3>
              <div className="space-y-4">
                {selectedRam && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM:</span>
                    <span className="font-medium">{selectedRam}</span>
                  </div>
                )}
                {selectedStorage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Almacenamiento:</span>
                    <span className="font-medium">{selectedStorage}</span>
                  </div>
                )}
                {selectedVariant && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600">Precio:</span>
                        <span className="text-2xl font-bold">
                          {formatPrice(selectedVariant.price)}
                        </span>
                      </div>
                      <Button className="w-full" onClick={handleAddToCart}>
                        Agregar al Carrito
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg border bg-background p-2"
          >
            <div className="relative">
              <Link href={`/product/${product.id}`} className="block">
                <Image
                  src={
                    `http://localhost:5139${product.imageUrl}` ||
                    "/placeholder.svg"
                  }
                  alt={product.name}
                  width={400}
                  height={400}
                  className="aspect-square object-cover transition-transform group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="p-4">
              <div className="mb-2 flex gap-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {product.brand}
                </span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/10">
                  {product.category}
                </span>
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              <Button
                onClick={() => setSelectedProduct(product)}
                variant="outline"
                className="w-full"
              >
                Ver Modelos Disponibles
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
