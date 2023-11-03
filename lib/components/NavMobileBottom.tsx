import { DataContext } from "@/lib/context/DataContext";
import { MobilePaneType } from "@/lib/types/ui";
import {
  InformationCircleIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  QuestionMarkCircleIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";

const MOBILE_TAB_CLASSES =
  "text-base font-semibold p-2 flex flex-col items-center";

const NavMobileBottom = () => {
  const { visibleMobilePane, setVisibleMobilePane } = useContext(DataContext);

  const handleTabClick = (currentPane: MobilePaneType) => {
    return currentPane === visibleMobilePane
      ? setVisibleMobilePane(null)
      : setVisibleMobilePane(currentPane);
  };

  return (
    <div className="h-20 bg-brand-dark text-white flex justify-between px-4 items-end">
      <div
        className={MOBILE_TAB_CLASSES}
        onClick={() => handleTabClick("layers")}
      >
        <MapIcon className="w-5 h-5" />
        Layers
      </div>
      <div
        className={MOBILE_TAB_CLASSES}
        onClick={() => handleTabClick("legends")}
      >
        <TagIcon className="w-5 h-5" />
        Legends
      </div>
      <div
        className={MOBILE_TAB_CLASSES}
        onClick={() => handleTabClick("hydrodams")}
      >
        <InformationCircleIcon className="w-5 h-5" />
        Hydrodams
      </div>
      <div
        className={MOBILE_TAB_CLASSES}
        onClick={() => handleTabClick("search")}
      >
        <MagnifyingGlassCircleIcon className="w-5 h-5" />
        Search
      </div>
      <div
        className={MOBILE_TAB_CLASSES}
        onClick={() => handleTabClick("about")}
      >
        <QuestionMarkCircleIcon className="w-5 h-5" />
        About
      </div>
    </div>
  );
};

export default NavMobileBottom;
