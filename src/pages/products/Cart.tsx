import { useCartStore } from "../../app/CartStore";
import CartItem from "../../components/CartItem";

const Cart = () => {
  const { totalItems, totalPrice, cart } = useCartStore();

  if (cart.length < 1)
    return (
      <h1 className="text-xl text-center">There is no item in your cart</h1>
    );

  return (
    <div>
      <div className="flex justify-end">
        <h3 className="text-center text-xl mb-5">
          Total Price : ${totalPrice.toPrecision(5)}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {cart?.map((product) => (
          <CartItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
