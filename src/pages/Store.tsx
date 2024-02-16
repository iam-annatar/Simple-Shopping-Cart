import { ShoppingItems } from "@/components/ShoppingItems";
import { useSearchContext } from "@/hooks/useSearchContext";

export const Store = () => {
  const { searchValue, filterItems } = useSearchContext();
  return (
    <>
      <h1 className="my-4 text-xl font-bold">Store</h1>
      <div className="mb-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterItems(searchValue).map((item) => (
          <ShoppingItems key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};
