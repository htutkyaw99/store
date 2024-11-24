import { Link } from "react-router-dom";
import { useCartStore } from "../app/CartStore";

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

const ProductCard = ({ id, name, category, price }: Products) => {
  const { addToCart } = useCartStore();

  const product = {
    id,
    name,
    price,
  };

  const addtoCart = () => {
    addToCart(product);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <Link to={`/product/${product.id}`}>
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>${price}</p>
        <p>{category?.name}</p>
        <div className="card-actions justify-end">
          <button onClick={addtoCart} className="btn btn-primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
