import { DataProvider } from "@/lib/context/DataContext";
import Layers from "@/lib/components/Layers";
import LeafletMap from "@/lib/components/LeafletMap";
import Legends from "@/lib/components/Legends";
import Info from "@/lib/components/Info";
import Hydrodams from "@/lib/components/Hydrodams";
import dams from "@/json/dams.json";
import transformDataToGeoJson from "@/lib/utils/transformDataToGeoJson";
import { useEffect, useState } from "react";
import type { GeoJsonObject } from "geojson";
import NavMobileTop from "@/lib/components/NavMobileTop";
import MobilePane from "@/lib/components/MobilePane";
import { Roboto, Roboto_Condensed } from "next/font/google";
import HtmlHead from "@/lib/components/HtmlHead";
import SearchComponent from "@/lib/components/SearchComponent";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-condensed",
});

export default function Home() {
  const [data, setData] = useState<GeoJsonObject>();

  // Fetch data from google sheet
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/gsheet");
        const data = await res.json();
        const geoJsonData = transformDataToGeoJson(data);
        setData(geoJsonData);
      } catch {
        // Use fallback json data
        setData(dams as GeoJsonObject);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <HtmlHead />
      <DataProvider>
        <main
          className={`w-full h-full relative ${roboto.variable} ${robotoCondensed.variable} font-sans`}
        >
          <LeafletMap data={data as GeoJsonObject} />
          <NavMobileTop />
          <div className="hidden md:flex md:absolute top-4 left-4 w-72 flex-col gap-2 h-[calc(100%-5%)]">
            <Info />
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto rounded-sm scrollbar scrollbar-thumb-gray-100 scrollbar-track-transparent">
              <Layers />
              <Legends />
            </div>
          </div>
          <MobilePane data={data} />
          <div className="hidden md:flex h-full py-4 flex-col gap-4 absolute top-0 right-4">
            <SearchComponent data={data} />
            <Hydrodams />
          </div>
        </main>
      </DataProvider>
    </>
  );
}
