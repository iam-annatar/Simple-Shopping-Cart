import { Product } from '@/components/Product';
import storeItems from '@/data/item.json';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { productId } = useParams();
  const product = storeItems.find((item) => item.id === Number(productId));

  return (
    <>
      {/* <h1 className="text-xl font-bold my-4">Product</h1> */}
      <div className="mt-4">
        <Product {...product} />
      </div>
    </>
  );
};
