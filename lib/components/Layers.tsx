import ToggleDirection from "@/lib/components/ToggleDirection";
import ToggleEye from "@/lib/components/ToggleEye";
import { mapGeoJsonLayers } from "@/lib/config/mapLayers";
import { DataContext } from "@/lib/context/DataContext";
import { TileProviders } from "@/lib/types/map";
import { MapIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@mui/material";
import { useContext, useState } from "react";

const LAYER_ICON_CLASSNAMES = "w-4 h-4 fill-gray-400";
const LAYER_HEADING_CLASSNAMES =
  "font-normal tracking-wide text-sm uppercase text-gray-500 border-y py-2";

type LayerIconsProps = { tooltipContent: string };

const Layers = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    visibleGeoJsonLayer,
    visibleTileLayers,
    setVisibleTileLayers,
    setVisibleGeoJsonLayer,
    dynamicTiles,
    setVisibleMobilePane,
  } = useContext(DataContext);

  // Check if a tile layer is visible and update context
  const changeTileLayerVisbility = (provider: TileProviders) => {
    const isLayerVisible = visibleTileLayers.includes(provider);

    let newLayers = [];
    if (isLayerVisible) {
      newLayers = visibleTileLayers.filter((layer) => layer !== provider);
    } else {
      newLayers = visibleTileLayers.concat(provider);
    }
    setVisibleTileLayers(newLayers);
  };

  // Check if a GeoJSON layer is visible and update context
  const changeGeoJsonLayerVisbility = (provider: string) => {
    if (visibleGeoJsonLayer === provider) {
      setVisibleGeoJsonLayer("");
    } else {
      setVisibleGeoJsonLayer(provider);
    }
  };

  const LayerIcons = ({ tooltipContent }: LayerIconsProps) => (
    <Tooltip
      title={tooltipContent}
      placement="right"
      enterTouchDelay={0}
      className="hover:fill-brand"
    >
      <InformationCircleIcon className={LAYER_ICON_CLASSNAMES} />
    </Tooltip>
  );

  return (
    <div className="bg-white p-4 rounded-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <MapIcon className="w-5 h-5" />
          <h2>Layers</h2>
        </div>
        <ToggleDirection
          isToggled={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          classes="hidden md:block"
        />
        <XMarkIcon
          className="absolute right-2 md:hidden w-6 h-6 stroke-gray-900 cursor-pointer"
          onClick={() => setVisibleMobilePane(null)}
        />
      </div>

      {/* Render GeoJSON layers */}
      {isExpanded && (
        <div className="flex flex-col gap-2">
          <h3 className={LAYER_HEADING_CLASSNAMES}>Symbology</h3>
          {Object.keys(mapGeoJsonLayers).map((layer) => {
            const tooltipContent = mapGeoJsonLayers[layer].information;

            return (
              <div
                className="flex justify-between items-center text-sm"
                key={layer}
              >
                {layer}
                <div className="flex gap-2">
                  <ToggleEye
                    isToggled={visibleGeoJsonLayer === layer}
                    onClick={() => changeGeoJsonLayerVisbility(layer)}
                  />
                  <LayerIcons tooltipContent={tooltipContent} />
                </div>
              </div>
            );
          })}

          {/* Render tile layers */}
          <h3 className={LAYER_HEADING_CLASSNAMES}>Imagery</h3>
          {Object.keys(dynamicTiles).map((provider) => {
            const tooltipContent = dynamicTiles[provider].information;

            return (
              <div
                className="flex justify-between items-center text-sm"
                key={dynamicTiles[provider].name}
              >
                {dynamicTiles[provider].displayName}
                <div className="flex gap-2">
                  {dynamicTiles[provider].toggleable && (
                    <ToggleEye
                      isToggled={visibleTileLayers.includes(provider)}
                      onClick={() => changeTileLayerVisbility(provider)}
                    />
                  )}
                  <LayerIcons tooltipContent={tooltipContent} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Layers;
