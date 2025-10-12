import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { priceOptions, sizeOptions } from "@/constants/data";
import { Color, RoomCategory } from "@/constants/types";
import { getAllRooms } from "@/services/roomCategoryService";
import { getAllColors } from "@/services/colorService";
import { useRouter } from "next/navigation";

type FilterProps = {
  room: string | undefined;
  category: string | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeFilters?: (filters: {
    color: string | null;
    size: string | null;
    price: string | null;
  }) => void;
};

const FilterProduct = ({ room, category, show, setShow, onChangeFilters }: FilterProps) => {
  const [rooms, setRooms] = useState<RoomCategory[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [_category, setCategory] = useState<string>('');
  const [_room, setRoom] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllRooms();
        if (res.data.success) {
          setRooms(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchColors = async () => {
      try {
        const res = await getAllColors();
        if (res.data.success) {
          setColors(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchColors();
  }, []);

  useEffect(() => {
    if(room) setRoom(room);
    if(category) setCategory(category);
  },[room, category]);

  const handleToggle = (
    current: string | null,
    value: string,
    setFn: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (current === value) {
      setFn(null);
    } else {
      setFn(value);
    }
  };

  const handleReset = () => {
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedPrice(null);
    setRoom('');
    setCategory('');
    router.push('/product');
  };

  useEffect(() => {
    onChangeFilters?.({
      color: selectedColor,
      size: selectedSize,
      price: selectedPrice,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedSize, selectedPrice]);
  

  return (
    <div
      className={`${
        show ? "max-h-[1000px]" : "max-h-0"
      } overflow-hidden border-b border-gray-200 transition-all duration-500`}
    >
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {/* Giá */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="mb-2">Giá sản phẩm</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-3">
              {priceOptions.map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <Checkbox
                    id={`price-${item.value}`}
                    checked={selectedPrice === item.value}
                    onCheckedChange={() =>
                      handleToggle(selectedPrice, item.value, setSelectedPrice)
                    }
                  />
                  <Label htmlFor={`price-${item.value}`} className="text-base font-normal cursor-pointer">
                    {item.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Kích cỡ */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="mb-2">Kích cỡ</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-3">
              {sizeOptions.map((item) => (
                <div key={item.code} className="flex items-center gap-3">
                  <Checkbox
                    id={`size-${item.code}`}
                    checked={selectedSize === item.code}
                    onCheckedChange={() =>
                      handleToggle(selectedSize, item.code, setSelectedSize)
                    }
                  />
                  <Label htmlFor={`size-${item.code}`} className="text-base font-normal cursor-pointer">
                    {item.size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Màu */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-2">Màu sản phẩm</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-2">
              {colors.map((item) => (
                <button
                  key={item.code}
                  onClick={() =>
                    handleToggle(selectedColor, item.code, setSelectedColor)
                  }
                  className={`h-6 w-6 rounded-full border 1px solid #ccc ${selectedColor === item.code ? `border-3 border-light_brownish`: ""}`}
                  title={item.name}
                  style={{ backgroundColor: item.code }}
                />
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="mb-2">Danh mục sản phẩm</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-3">
              {rooms.map((item) => (
                <div key={item.slug} className="flex items-center gap-3">
                  <Checkbox
                    id={`category-${item.slug}`}
                    checked={_room === item.slug}
                    onCheckedChange={() =>
                      router.push(`product?room=${item.slug}`)
                    }
                  />
                  <Label htmlFor={`category-${item.slug}`} className="text-base font-normal cursor-pointer">
                    {item.title}
                  </Label>
                </div>
              ))}
              {room && rooms.find((item) => item.slug === room)?.productCategories?.map((item) => (
                <div key={item.slug} className="flex items-center gap-3">
                  <Checkbox
                    id={`category-${item.slug}`}
                    checked={_category === item.slug}
                    onCheckedChange={() =>
                      router.push(`product?room=${_room}&category=${item.slug}`)
                    }
                  />
                  <Label htmlFor={`category-${item.slug}`} className="text-base font-normal cursor-pointer">
                    {item.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hành động */}
        <div className="flex items-center justify-end gap-4">
          <button
            className="text-sm text-lightColor font-medium underline underline-offset-2"
            onClick={handleReset}
          >
            Xóa bộ lọc
          </button>
          <button
            className="text-sm text-lightColor font-medium underline underline-offset-2"
            onClick={() => setShow(false)}
          >
            Đóng bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
