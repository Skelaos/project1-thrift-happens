import CheckoutCard from "./CheckoutCard";
import type { CheckoutArticle } from "./ThriftHappensApp";

interface CheckoutContainerProps {
  checkoutData: CheckoutArticle[];
  //Handlers
}

export default function CheckoutContainer({
  checkoutData,
  //Handlers
}: CheckoutContainerProps) {
  return (
    <div>
      <div className="CheckoutContainer">
        {checkoutData.map((item) => (
          <CheckoutCard key={item.id} {...item} /*Handlers*/ />
        ))}
      </div>
      <div>/*Empty Checkout?*/</div>
    </div>
  );
}
