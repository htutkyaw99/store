import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { axiosInstance } from "../../config/axiosInstance";
import SearchBar from "../../components/SearchBar";

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
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Action RPG", "Sports", "Battle Royale"];

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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.name === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <main>
      <div className="flex flex-col w-full items-center md:flex-row justify-between mb-3 gap-3">
        <SearchBar handleSearch={handleSearchProduct} />
        <select
          className="select select-bordered w-full max-w-xs flex-1"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All products</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex flex-1 items-center gap-3">
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
