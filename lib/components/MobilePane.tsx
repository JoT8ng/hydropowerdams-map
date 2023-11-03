import Layers from "@/lib/components/Layers";
import Legends from "@/lib/components/Legends";
import NavMobileBottom from "@/lib/components/NavMobileBottom";
import Info from "@/lib/components/Info";
import Hydrodams from "@/lib/components/Hydrodams";
import { MobilePaneType } from "@/lib/types/ui";
import { useContext } from "react";
import { DataContext } from "@/lib/context/DataContext";
import SearchComponent from "@/lib/components/SearchComponent";

const MobilePane = ({ data }: { data: any }) => {
  const { visibleMobilePane } = useContext(DataContext);

  const visibleMobilePanel = (visibleMobilePane: MobilePaneType) => {
    switch (visibleMobilePane) {
      case "about":
        return <Info />;
      case "layers":
        return <Layers />;
      case "legends":
        return <Legends />;
      case "hydrodams":
        return <Hydrodams />;
      case "search":
        return <SearchComponent data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute md:hidden bottom-0 w-full flex flex-col max-h-96 justify-end">
      {visibleMobilePanel(visibleMobilePane)}
      <NavMobileBottom />
    </div>
  );
};

export default MobilePane;
