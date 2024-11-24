import { useEffect, useState } from "react";
import { useAuthStore } from "../../app/AuthStore";
import ProductCard from "../../components/ProductCard";
import { axiosInstance } from "../../config/axiosInstance";
import SearchBar from "../../components/SearchBar";
import Range from "../../components/Range";

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
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100);

  useEffect(() => {
    async function getProducts() {
      const res = await axiosInstance.get("/products");
      // console.log(res.data.products);
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    }
    getProducts();
  }, []);

  const handleSearchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredProducts(
      products.filter((product) => product.name.toLowerCase().includes(query))
    );
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedPrice = Number(event.target.value);
    setMaxPrice(selectedPrice);

    setFilteredProducts(
      products.filter((product) => product.price <= selectedPrice)
    );
  };

  return (
    <main>
      <div className="flex justify-between mb-3">
        <SearchBar handleSearch={handleSearchProduct} />
        <div className="flex items-center gap-3">
          <label htmlFor="priceRange">Max Price: {maxPrice}</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="100"
            step={5}
            value={maxPrice}
            onChange={handlePriceRangeChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
};

export default Home;
