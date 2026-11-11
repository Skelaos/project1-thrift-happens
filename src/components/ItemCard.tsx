import type { ClothingProduct } from "../data/data";
import type { ItemInfo } from "./ThriftHappensApp";

interface ItemCardProps extends ClothingProduct {
  itemInfo: ItemInfo;
  //Handler Functions Here
  handleChangeQuantity: (delta: number) => void;
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
}: ItemCardProps) {
  return (
    <div className="ItemCard">
      <h2>{itemInfo.name}</h2>
      <img src={image} />
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Color: {color}</p>
      <p>{description}</p>
      <p>Size: {size}</p>
      <p>Price: ${itemInfo.price.toFixed(2)}</p>
      <p>Quantity: {itemInfo.quantity}</p>
      <button onClick={() => handleChangeQuantity(-1)}>-</button>
      <span>{itemInfo.itemQuantity}</span>
      <button onClick={() => handleChangeQuantity(1)}>+</button>
    </div>
  );
}
