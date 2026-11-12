import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer";
import NavBar from "./NavBar";
// import CheckoutContainer from "./CheckoutContainer";

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
  handleAddToCheckout: (checkoutArticle: CheckoutArticle) => void;
}

export interface CheckoutArticle {
  articleId: number;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  itemQuantity: number;
  total: number;
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

  //   const [checkoutArticle, setCheckoutArticle] = useState<CheckoutArticle[]>([]);

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

  function handleAddToCheckout(checkoutArticle: CheckoutArticle) {
    setItemInfo((prevData) => {
      return prevData.map((info) =>
        info.id === checkoutArticle.articleId
          ? {
              ...info,
              itemQuantity: 0,
              quantity: Math.max(
                info.quantity - checkoutArticle.itemQuantity,
                0,
              ),
            }
          : info,
      );
    });
    //Something to check if the item is already in the checkout?
  }

  //Handler for removing one from checkout

  //Handler for emptying checkout

  //Return
  return (
    <div className="ThriftHappens">
      <NavBar />
      <ItemsContainer
        data={data}
        itemInfo={itemInfo}
        handleChangeQuantity={handleChangeQuantity}
        handleAddToCheckout={handleAddToCheckout}
      />
      /*CheckoutContainer*/
    </div>
  );
}
