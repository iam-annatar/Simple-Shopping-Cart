import { SearchIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSearchContext } from "@/_features/Search/hook/useSearchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
          <SearchIcon className="size-[1.125rem]" />
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
          <div className="mt-2 text-center text-muted-foreground">
            Item Not Found !
          </div>
        ) : (
          <div className="text-start text-muted-foreground ">
            {filterItems(searchValue).map((item) => {
              return (
                searchValue && (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <div
                    className="mt-2 cursor-pointer list-none hover:text-white"
                    key={item.id}
                    onClick={() => navigate(`/store/${item.id}`)}
                  >
                    {item.name}
                  </div>
                )
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
