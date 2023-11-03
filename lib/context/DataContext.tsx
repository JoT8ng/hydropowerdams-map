import { mapTileLayers } from "@/lib/config/mapLayers";
import { DataPoint } from "@/lib/types/data";
import { NumberRange, TileLayers, TileProviders } from "@/lib/types/map";
import { MobilePaneType } from "@/lib/types/ui";
import React, { createContext, useState } from "react";

type ContextType = {
  dataPoint: DataPoint | undefined;
  setDataPoint: React.Dispatch<React.SetStateAction<DataPoint | undefined>>;
  visibleTileLayers: TileProviders[];
  setVisibleTileLayers: React.Dispatch<React.SetStateAction<TileProviders[]>>;
  visibleGeoJsonLayer: string;
  setVisibleGeoJsonLayer: React.Dispatch<React.SetStateAction<string>>;
  dynamicTiles: TileLayers;
  setDynamicTiles: React.Dispatch<React.SetStateAction<TileLayers>>;
  visibleMobilePane: MobilePaneType;
  setVisibleMobilePane: React.Dispatch<React.SetStateAction<MobilePaneType>>;
  filteredLegends: (NumberRange | string)[];
  setFilteredLegends: React.Dispatch<
    React.SetStateAction<(NumberRange | string)[]>
  >;
};

const INITIAL_CONTEXT = {
  dataPoint: undefined,
  setDataPoint: () => {},
  visibleTileLayers: [],
  setVisibleTileLayers: () => {},
  visibleGeoJsonLayer: "",
  setVisibleGeoJsonLayer: () => {},
  dynamicTiles: mapTileLayers,
  setDynamicTiles: () => {},
  visibleMobilePane: null,
  setVisibleMobilePane: () => {},
  filteredLegends: [],
  setFilteredLegends: () => {},
};

export const DataContext = createContext<ContextType>(INITIAL_CONTEXT);

type Props = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: Props) => {
  const initialTileLayers = ["openStreetMap"];
  const initialGeojsonLayers = "Dams";

  const [dataPoint, setDataPoint] = useState<DataPoint | undefined>();
  const [visibleTileLayers, setVisibleTileLayers] = useState(initialTileLayers);
  const [visibleGeoJsonLayer, setVisibleGeoJsonLayer] =
    useState(initialGeojsonLayers);
  const [dynamicTiles, setDynamicTiles] = useState(mapTileLayers);
  const [visibleMobilePane, setVisibleMobilePane] =
    useState<MobilePaneType>(null);
  const [filteredLegends, setFilteredLegends] = useState<
    (NumberRange | string)[]
  >([] as string[]);

  return (
    <DataContext.Provider
      value={{
        dataPoint,
        setDataPoint,
        visibleTileLayers,
        setVisibleTileLayers,
        visibleGeoJsonLayer,
        setVisibleGeoJsonLayer,
        dynamicTiles,
        setDynamicTiles,
        visibleMobilePane,
        setVisibleMobilePane,
        filteredLegends,
        setFilteredLegends,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
