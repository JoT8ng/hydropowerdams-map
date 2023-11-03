import LegendRow from "@/lib/components/LegendRow";
import ToggleDirection from "@/lib/components/ToggleDirection";
import { mapGeoJsonLayers } from "@/lib/config/mapLayers";
import { DataContext } from "@/lib/context/DataContext";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";

const Legends = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    visibleGeoJsonLayer,
    visibleTileLayers,
    dynamicTiles,
    setVisibleMobilePane,
  } = useContext(DataContext);

  return (
    <div className="bg-white p-4 rounded-sm flex flex-col gap-2 h-[90vh] overflow-y-scroll md:h-auto md:overflow-visible">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <TagIcon className="w-5 h-5" />
          <h2>Legends</h2>

          <XMarkIcon
            className="absolute right-2 md:hidden w-6 h-6 stroke-gray-900 cursor-pointer"
            onClick={() => setVisibleMobilePane(null)}
          />
        </div>
        <ToggleDirection
          isToggled={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          classes="hidden md:block"
        />
      </div>
      {isExpanded && (
        <div className="flex flex-col ">
          {visibleGeoJsonLayer &&
            mapGeoJsonLayers[visibleGeoJsonLayer].legend && (
              <div
                className="flex flex-col justify-between items-start mb-4 text-sm"
                key={visibleGeoJsonLayer}
              >
                <span className="font-semibold mb-2">
                  {visibleGeoJsonLayer}
                </span>
                <div className="flex flex-col w-full">
                  <div className="flex gap-2">
                    <div>
                      {mapGeoJsonLayers[visibleGeoJsonLayer].legend?.items.map(
                        (item) => (
                          <LegendRow
                            checkable={true}
                            item={item}
                            type={
                              mapGeoJsonLayers[visibleGeoJsonLayer].legend
                                ?.type || "color"
                            }
                            key={item.name}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          {visibleTileLayers.map((layer) => {
            if (dynamicTiles[layer].legend) {
              return (
                <div
                  className="flex flex-col justify-between items-start mb-4 text-sm"
                  key={layer}
                >
                  <span className="font-semibold mb-2">
                    {dynamicTiles[layer].name}
                  </span>
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2">
                      <div>
                        {dynamicTiles[layer].legend?.items.map((item) => (
                          <LegendRow
                            checkable={false}
                            item={item}
                            type={dynamicTiles[layer].legend?.type || "color"}
                            key={item.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Legends;
