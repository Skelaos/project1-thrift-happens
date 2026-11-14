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
      <img src={image} alt="" height="180px" />
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>Quantity: {itemQuantity}</p>
      <p>Total: {total}</p>
      <button //Removes this article from the checkout and restores original article stock quantity.
        onClick={() => handleRemoveFromCheckout(id, articleId, itemQuantity)}
      >
        Remove
      </button>
    </div>
  );
}
