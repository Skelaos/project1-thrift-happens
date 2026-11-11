import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer";

interface ItemData {
  data: ClothingProduct[];
}

export interface ItemInfo {
  id: number;
  name: string;
  price: number;
  quantity: number;
  itemQuantity: number;
}

export interface ItemsContainerProps {
  data: ClothingProduct[];
  itemInfo: ItemInfo[];
  handleChangeQuantity: (id: number, delta: number) => void;
}

export default function ThriftHappensApp({ data }: ItemData) {
  //States
  //ItemInfo state to store...
  const [itemInfo, setItemInfo] = useState<ItemInfo[]>(
    data.map((item: ClothingProduct) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      itemQuantity: item.itemQuantity,
    })),
  );

  //Handlers
  //Handler for the plus and minus buttons
  function handleChangeQuantity(id: number, delta: number) {
    setItemInfo((prevData) => {
      return prevData.map((info) =>
        info.id === id
          ? {
              ...info,
              itemQuantity: Math.min(
                Math.max(info.itemQuantity + delta, 0),
                info.quantity,
              ),
            }
          : info,
      );
    });
  }

  //Return
  return (
    <div className="ThriftHappens">
      <ItemsContainer
        data={data}
        itemInfo={itemInfo}
        handleChangeQuantity={handleChangeQuantity}
      />
    </div>
  );
}
