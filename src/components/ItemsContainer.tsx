import type { ItemsContainerProps } from "./ThriftHappensApp";
import ItemCard from "./ItemCard";

export default function ItemsContainer({
  data,
  itemInfo,
  handleChangeQuantity,
  handleAddToCheckout,
}: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      {data.map((item) => {
        const info = itemInfo.find((information) => information.id === item.id);

        if (!info) return null;

        return (
          <ItemCard
            key={item.id}
            {...item}
            itemInfo={info}
            handleChangeQuantity={(delta: number) =>
              handleChangeQuantity(item.id, delta)
            }
            handleAddToCheckout={handleAddToCheckout}
          />
        );
      })}
    </div>
  );
}
