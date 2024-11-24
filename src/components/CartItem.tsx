import React from "react";
import { useCartStore } from "../app/CartStore";

interface Products {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

const CartItem = ({ id, name, price, quantity }: Products) => {
  const { removeFromCart } = useCartStore();

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>${price}</p>
        <p>Quanity : {quantity}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => removeFromCart(id)}
            className="btn btn-primary"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
