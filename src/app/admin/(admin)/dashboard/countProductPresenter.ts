import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCountProduct } from "@/services/admin/product-count";
export const CountProductPresenter = () => {
  const router = useRouter();
  const [productCount, setProductCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }

    const fetchCountProducts = async () => {
      try {
        setLoading(true);
        const totalCount = await getCountProduct();
        setProductCount(totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchCountProducts();
  }, []);

  return {
    productCount,
    setProductCount,
    loading
  };
};
