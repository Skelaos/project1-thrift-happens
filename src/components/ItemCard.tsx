import type { ClothingProduct } from "../data/data";
import type { ItemInfo, CheckoutArticle } from "./ThriftHappensApp";

interface ItemCardProps extends ClothingProduct {
  itemInfo: ItemInfo;
  handleChangeQuantity: (delta: number) => void;
  handleAddToCheckout: (checkoutArticle: CheckoutArticle) => void;
}

export default function ItemCard({
  itemInfo,
  image,
  fit,
  category,
  color,
  description,
  size,
  //Handler Functions Here
  handleChangeQuantity,
  handleAddToCheckout,
}: ItemCardProps) {
  return (
    <div className="ItemCard">
      <h2>{itemInfo.name}</h2>
      <img src={image} height="300px" />
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Color: {color}</p>
      <p>{description}</p>
      <p>Size: {size}</p>
      <p>Price: ${itemInfo.price.toFixed(2)}</p>
      <p>Quantity: {itemInfo.quantity}</p>
      <button onClick={() => handleChangeQuantity(-1)}>-</button>
      <span> {itemInfo.itemQuantity} </span>
      <button onClick={() => handleChangeQuantity(1)}>+</button>
      <br />
      <button
        className={itemInfo.quantity === 0 ? "OutOfStock" : ""}
        onClick={() =>
          handleAddToCheckout({
            articleId: itemInfo.id,
            id: crypto.randomUUID(),
            image,
            name: itemInfo.name,
            price: itemInfo.price,
            quantity: itemInfo.quantity,
            itemQuantity: itemInfo.itemQuantity,
            total: itemInfo.price * itemInfo.itemQuantity,
          })
        }
      >
        {itemInfo.quantity === 0 ? "OUT OF STOCK" : "Add to Checkout"}
      </button>
    </div>
  );
}
