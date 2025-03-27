import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="flex border items-center justify-between border-[#FCFBF726] rounded-full w-full md:w-[45%] h-[55px] md:h-[70px] px-4 shadow-md">
      <div className="flex gap-4 md:w-[75%] font-merriweather">
        <select className="text-base md:text-lg p-[2px] md:p-2 bg-inherit text-[#FFFFFFC7] focus:outline-none">
          <option value="client" className="bg-[#333333]">Clients</option>
          <option value="artisan" className="bg-[#333333]">Artisans</option>
        </select>
          <input className="px-2 md:px-4 text-lg border-l-2 h-[60%] text-[#B5B4AD] self-center border-[#FFFFFF73] focus:outline-none w-[90%] md:w-[70%] bg-inherit "/>
      </div>
      <button className="justify-end md:justify-center self-center text-[#D8D6CF] rounded-full lg:border lg:bg-[#262208] hover:text-yellow focus:text-yellow flex items-center lg:border-[#FCFBF726] w-[20%] h-[75%] relative font-merriweather font-fontSec">
        <div className=" w-[45%] h-[45%] md:w-[35%] md:h-[35%] relative ">
          <Image
            src="/search-normal.png"
            alt="search button"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
        <span className="hidden lg:flex text-center">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
