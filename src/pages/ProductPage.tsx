import { CommentForm } from '@/components/CommentForm';
import { CommentsList } from '@/components/CommentsList';
import { Product } from '@/components/Product';
import storeItems from '@/data/item.json';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
      <h2 className="text-xl mb-4 mt-8">Comments</h2>
      <CommentForm initialValue="" />
      <CommentsList />
    </>
  );
};

const ProductError = () => {
  return <div className="text-center text-3xl">Product Not Found!</div>;
};
