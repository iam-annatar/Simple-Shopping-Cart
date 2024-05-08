import { SearchIcon } from "lucide-react";
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

  return (
    <Popover defaultOpen={isOpen} onOpenChange={() => setIsOpen(true)}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon className="size-[1.125rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={15}>
        <Input
          type="search"
          className="text-xs"
          placeholder="What are you looking for?"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {filterItems().length === 0 ? (
          <div className="mt-4 text-center text-muted-foreground">
            Item Not Found !
          </div>
        ) : (
          <div className=" mt-4 text-start text-muted-foreground ">
            {filterItems().map((item) => {
              return (
                searchValue && (
                  <Button
                    variant="ghost"
                    className="mt-2 cursor-pointer list-none hover:text-white"
                    key={item.id}
                    onClick={() => navigate(`/store/${item.id}`)}
                  >
                    {item.name}
                  </Button>
                )
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
