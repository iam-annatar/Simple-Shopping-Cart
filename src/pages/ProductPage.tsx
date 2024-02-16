import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CommentsList } from "@/components/CommentsList";
import { Product } from "@/components/Product";
import { ProductError } from "@/components/ProductError";
import storeItems from "@/data/item.json";

export const ProductPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const product = storeItems.find((item) => item.id === Number(productId));

  // to fix the scroll restoration in product page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="mt-4">
        {product != null ? <Product {...product} /> : <ProductError />}
      </div>
      <div className="mb-8">
        <h2 className="mb-4 mt-8 text-xl">Comments</h2>
        <CommentsList />
      </div>
    </>
  );
};
