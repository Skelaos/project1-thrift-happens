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
  //Stores each article's currently selected quantity and remaining available stock.
  const [itemInfo, setItemInfo] = useState<ItemInfo[]>(
    data.map((item: ClothingProduct) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      itemQuantity: item.itemQuantity,
    })),
  );
  //Stores the articles currently added to the checkout.
  const [checkoutArticle, setCheckoutArticle] = useState<CheckoutArticle[]>([]);

  //Handlers
  //Handles the plus and minus buttons for the item quantity selection.
  function handleChangeQuantity(id: number, delta: number) {
    setItemInfo((prevData) => {
      return prevData.map((info) =>
        info.id === id
          ? {
              ...info,
              //A guard to prevent the selected quantity from going under zero or over the available stock.
              itemQuantity: Math.min(
                Math.max(info.itemQuantity + delta, 0),
                info.quantity,
              ),
            }
          : info,
      );
    });
  }

  //Adds selected articles to checkout while also updating available stock.
  function handleAddToCheckout(checkoutArticle: CheckoutArticle) {
    //A guard to prevent adding zero articles or more articles than are available in stock.
    if (
      checkoutArticle.itemQuantity <= 0 ||
      checkoutArticle.itemQuantity > checkoutArticle.quantity
    ) {
      return;
    }
    //Adjusts available stock and resets the selected quantity to zero after adding to checkout.
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
      //Checks if the article already exists in the checkout.
      const inCheckout = prevArticles.find(
        (article) => article.articleId === checkoutArticle.articleId,
      );
      if (inCheckout) {
        //Updates the existing checkout entry to prevent duplication.
        return prevArticles.map((article) => {
          if (article.articleId === checkoutArticle.articleId) {
            const newQuantity =
              article.itemQuantity + checkoutArticle.itemQuantity;
            return {
              ...article,
              itemQuantity: newQuantity,
              //Updates to total whenever the quantities are adjusted.
              total: newQuantity * article.price,
            };
          }
          return article;
        });
      }
      //If there is no existing matching checkout entry, creates a new one.
      return [...prevArticles, checkoutArticle];
    });
  }

  //Removes an article from the checkout and restores the original stock quantity.
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
    //Removes the checkout entry according to its unique id.
    setCheckoutArticle((prevArticles) => {
      return prevArticles.filter((item) => item.id !== id);
    });
  }

  //Empties the entire checkout and restores all original stock quantities.
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
