import { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { useSearchContext } from '@/hooks/useSearchContext';
import { SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const { setSearchValue, filterItems, searchValue } = useSearchContext();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchValue(query);
  };

  return (
    <Popover defaultOpen={isOpen} onOpenChange={() => setIsOpen(true)}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-[1.125rem] w-[1.125rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Input
          className=""
          type="search"
          id="quary"
          placeholder="Search ..."
          onChange={handleSearch}
        />
        {filterItems(searchValue).length === 0 ? (
          <div className="text-center text-muted-foreground mt-2">
            Item Not Found !
          </div>
        ) : (
          <div className="text-start text-muted-foreground ">
            {filterItems(searchValue).map((item) => {
              return (
                searchValue && (
                  <li
                    className="list-none hover:text-white mt-2 cursor-pointer"
                    key={item.id}
                    onClick={() => navigate(`/store/${item.id}`)}
                  >
                    {item.name}
                  </li>
                )
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
