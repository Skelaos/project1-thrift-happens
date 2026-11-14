import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer";
import NavBar from "./NavBar";
import CheckoutContainer from "./CheckoutContainer";

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

  const [checkoutArticle, setCheckoutArticle] = useState<CheckoutArticle[]>([]);

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
    if (
      checkoutArticle.itemQuantity <= 0 ||
      checkoutArticle.itemQuantity > checkoutArticle.quantity
    ) {
      return;
    }
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
    setCheckoutArticle((prevArticles) => {
      if (checkoutArticle.itemQuantity <= 0) {
        return prevArticles;
      }
      const inCheckout = prevArticles.find(
        (article) => article.articleId === checkoutArticle.articleId,
      );
      if (inCheckout) {
        return prevArticles.map((article) => {
          if (article.articleId === checkoutArticle.articleId) {
            const newQuantity =
              article.itemQuantity + checkoutArticle.itemQuantity;
            return {
              ...article,
              itemQuantity: newQuantity,
              total: newQuantity * article.price,
            };
          }
          return article;
        });
      }
      return [...prevArticles, checkoutArticle];
    });
  }

  //Handler for removing one from checkout
  function handleRemoveFromCheckout(
    id: string,
    articleId: number,
    itemQuantity: number,
  ) {
    setItemInfo((prevData) => {
      return prevData.map((info) =>
        info.id === articleId
          ? {
              ...info,
              quantity: info.quantity + itemQuantity,
            }
          : info,
      );
    });
    setCheckoutArticle((prevArticles) => {
      return prevArticles.filter((item) => item.id !== id);
    });
  }
  //Handler for emptying checkout
  function handleEmptyCheckout(checkoutData: CheckoutArticle[]) {
    checkoutData.forEach((article) => {
      handleRemoveFromCheckout(
        article.id,
        article.articleId,
        article.itemQuantity,
      );
    });
  }

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
      <CheckoutContainer
        checkoutData={checkoutArticle}
        handleRemoveFromCheckout={handleRemoveFromCheckout}
        handleEmptyCheckout={handleEmptyCheckout}
      />
    </div>
  );
}
