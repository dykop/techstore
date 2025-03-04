import { useState, useEffect } from "react";

interface Category {
  category: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5139/api/FiltroCategory"
        );
        const data = await response.json();
        console.log("Datos obtenidos de la API:", data);
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error(
            "La respuesta de la API no contiene un array de categorías"
          );
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
