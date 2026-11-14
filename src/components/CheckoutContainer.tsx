import CheckoutCard from "./CheckoutCard";
import type { CheckoutArticle } from "./ThriftHappensApp";

interface CheckoutContainerProps {
  checkoutData: CheckoutArticle[];
  //Handlers
  handleRemoveFromCheckout: (
    id: string,
    articleId: number,
    itemQuantity: number,
  ) => void;
  handleEmptyCheckout: (checkoutData: CheckoutArticle[]) => void;
}

export default function CheckoutContainer({
  checkoutData,
  //Handlers
  handleRemoveFromCheckout,
  handleEmptyCheckout,
}: CheckoutContainerProps) {
  return (
    <div>
      <div className="CheckoutContainer">
        <div className="EmptyCheckout">
          {checkoutData.length > 0 ? (
            <button onClick={() => handleEmptyCheckout(checkoutData)}>
              Empty Checkout
            </button>
          ) : (
            ""
          )}
          {checkoutData.length > 0 //Calculates the total by adding together all other totals, rounded to two decimal points.
            ? `Total: $${checkoutData.reduce((acc, article) => acc + article.total, 0).toFixed(2)}`
            : "CHECKOUT EMPTY"}
        </div>
        <div className="Checkout">
          {" "}
          {checkoutData.map((item) => (
            <CheckoutCard
              key={item.id}
              {...item}
              handleRemoveFromCheckout={handleRemoveFromCheckout}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
