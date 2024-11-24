import { useCartStore } from "../app/CartStore";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}
const DetailsCard = ({ id, name, price, category }: Product) => {
  const { addToCart } = useCartStore();

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, quae
          fuga sunt minus dolor porro.
        </p>
        <p>${price}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => addToCart({ id, name, price })}
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
