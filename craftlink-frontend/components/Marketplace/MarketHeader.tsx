import HomeHeader from "../HomeHeader";
import MobileHeader from "../MobileHeader";

interface Header {
  toggleFilter: () => void ;
  isActive: (path: string) => boolean;
}

const MarketHeader = ({ toggleFilter, isActive}: Header) => {

  return (
    <div className="relative bg-header">
      <div className="hidden md:grid">
        <HomeHeader isActive={isActive}/>
      </div>
      <div className="grid md:hidden">
        <MobileHeader isActive={isActive} toggleFilter={toggleFilter} />
      </div>
    </div>
  );
};

export default MarketHeader;
