import { Product } from '@/components/Product';
import storeItems from '@/data/item.json';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { productId } = useParams();
  const product = storeItems.find((item) => item.id === Number(productId));

  return (
    <>
      <div className="mt-4">
        {product != null ? <Product {...product} /> : <ProductError />}
      </div>
    </>
  );
};

const ProductError = () => {
  return <div className="text-center text-3xl">Product Not Found!</div>;
};
