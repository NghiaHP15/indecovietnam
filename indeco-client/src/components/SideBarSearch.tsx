import { SearchIcon } from "lucide-react";
import React from "react";

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const SideBarSearch = ({value, setValue} : Props) => {
  return (
    <div className="space-y-4 px-4 py-6 shadow-[2px_2px_10px_0px_#e7e7e7] rounded-sm">
        <h2 className="text-xl font-medium text-darkColor border-l-4 border-light_brownish pl-2 ">{"Tìm kiếm"}</h2>
        <div className="flex items-center">
          <input 
            className="w-full h-[40px] text-gray-600 border border-light_brownish/80 rounded-bl-sm rounded-tl-sm px-4 py-1" 
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tìm kiếm"
          />
          <button className="w-[80px] h-[40px] flex items-center justify-center bg-light_brownish/80 rounded-br-sm rounded-tr-sm">
            <SearchIcon className="text-white"/>
          </button>
        </div>
      </div>
  );
};

export default SideBarSearch;
