import { useState, useEffect } from "react";

interface Brand {
  brand: string;
}

const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5139/api/FiltroBrand");
        const data: Brand[] = await response.json();
        setBrands(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

export default useBrands;
