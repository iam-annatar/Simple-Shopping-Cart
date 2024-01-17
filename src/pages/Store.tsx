import { ShoppingItems } from '@/components/ShoppingItems';
import storeItems from '@/data/item.json';

export const Store = () => {
  return (
    <>
      <h1 className="text-xl my-4">Store</h1>
      <div className="xs:columns-1 sm:columns-2 md:columns-2 lg:columns-4">
        {storeItems.map((item) => (
          <ShoppingItems key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};
