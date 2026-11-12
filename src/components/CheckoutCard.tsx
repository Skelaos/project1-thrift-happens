import type { CheckoutArticle } from "./ThriftHappensApp";

// interface CheckoutCardProps extends CheckoutArticle {
//   //Handler for removing from checkout
// }

export default function CheckoutCard({
  //   id,
  //   articleId,
  image,
  name,
  price,
  itemQuantity,
  total,
}: CheckoutArticle) {
  return (
    <div className="CheckoutCard">
      <h2>{name}</h2>
      <img src={image} alt="" />
      <p>Price: {price}</p>
      <p>Quantity: {itemQuantity}</p>
      <p>Total: {total}</p>
      <button /*onClick event here*/>Remove</button>
    </div>
  );
}
