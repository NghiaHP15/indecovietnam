import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandInput, CommandList } from "./ui/command";
import { Product } from "@/constants/types";
import { getAllProducts } from "@/services/productService";
import { useDebounce } from "@/hooks";
import Image from "next/image";
import { emptyImage } from "@/images";
import PriceFormatter from "./PriceFormatter";
import Link from "next/link";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const debouncedSearch = useDebounce(value, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProducts({ params: { limit: 100, search: debouncedSearch } });
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Search className="w-5 h-5 cursor-pointer text-shadow-sm text-shadow-neutral-200 hover:text-light_brownish hoverEffect" />
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0 bg-white/60" align="end" sideOffset={25}>
        <Command className="bg-white/60">
          <CommandInput 
            placeholder="Tìm kiếm sản phẩm..." 
            className="h-[50px]" 
            value={value}
            onValueChange={(e) => setValue(e)}
          />
          {debouncedSearch !== ""  && (
          <CommandList>
              {data.length === 0 ? (
                <CommandEmpty>Không thấy sản phẩm.</CommandEmpty>
              ): (
                <div className="flex flex-col gap-2 p-2">
                  {data.map((item: Product) => (
                    <Link
                      href={`/product/${item?.slug}`}
                      onClick={() => {
                        setOpen(false);
                        setValue("");
                      }}
                      key={item?.id}
                      className="pb-2 border-b border-dashed border-b-gray-300 last:border-b-0 last:mb-0 last:pb-0 cursor-pointer hover:bg-white/60 hoverEffect"
                    >
                      <div className="flex items-center gap-2">
                        <Image src={item?.image || emptyImage} alt={item.name} width={45} height={45} className="w-[50px] h-full rounded-sm object-cover" />
                        <div className="flex flex-col">
                          <span className="line-clamp-1">{item?.name}</span>
                          <PriceFormatter amount={item?.min_price} className="text-black font-medium" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
