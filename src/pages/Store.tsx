import { ShoppingItems } from '@/components/ShoppingItems';
import { useSearchContext } from '@/hooks/useSearchContext';

export const Store = () => {
  const { searchValue, filterItems } = useSearchContext();
  return (
    <>
      <h1 className="text-xl font-bold my-4">Store</h1>
      <div className="grid gap-8 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterItems(searchValue).map((item) => (
          <ShoppingItems key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};
