import type { CheckoutArticle } from "./ThriftHappensApp";

interface CheckoutCardProps extends CheckoutArticle {
  //Handler for removing from checkout
  handleRemoveFromCheckout: (
    id: string,
    articleId: number,
    itemQuantity: number,
  ) => void;
}

export default function CheckoutCard({
  id,
  articleId,
  image,
  name,
  price,
  itemQuantity,
  total,
  handleRemoveFromCheckout,
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <h2>{name}</h2>
      <img src={image} alt="" height="300px" />
      <p>Price: {price}</p>
      <p>Quantity: {itemQuantity}</p>
      <p>Total: {total}</p>
      <button
        onClick={() => handleRemoveFromCheckout(id, articleId, itemQuantity)}
      >
        Remove
      </button>
    </div>
  );
}
