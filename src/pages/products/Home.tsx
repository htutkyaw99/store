import { useEffect, useState } from "react";
import { useAuthStore } from "../../app/AuthStore";
import ProductCard from "../../components/ProductCard";
import { axiosInstance } from "../../config/axiosInstance";

interface Category {
  id: number;
  name: string;
}
interface Products {
  id: number;
  name: string;
  price: number;
  category: Category;
}

const Home = () => {
  const { user, token } = useAuthStore();

  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function getProducts() {
      const res = await axiosInstance.get("/products");
      console.log(res.data.products);
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  return (
    <main className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 gap-3">
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  );
};

export default Home;
