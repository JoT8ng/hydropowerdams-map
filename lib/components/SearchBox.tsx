import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { DataPoint } from "@/lib/types/data";
import RadioButton from "@/lib/components/RadioButton";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { searchFacetsConfig } from "@/lib/config/searchConfig";

type Props = {
  data: any;
  setResults: (value: Fuse.FuseResult<DataPoint>[] | null) => void;
};
const SearchBox = ({ data, setResults }: Props) => {
  const [searchString, setSearchString] = useState<string>();
  const [searchFacet, setSearchFacet] = useState(["properties.Dam"]);
  const [threshold, setThreshold] = useState<number>(0.6);

  useEffect(() => {
    // Empty results if search string has been emptied
    if (!searchString) {
      setResults(null);
    }
    const fuseOptions = {
      keys: searchFacet,
      threshold: threshold,
    };

    if (data) {
      const fuse = new Fuse(data.features, fuseOptions);

      if (searchString) {
        const results = fuse.search(searchString);
        setResults(results as Fuse.FuseResult<DataPoint>[]);
      }
    }
  }, [data, searchFacet, searchString, setResults, threshold]);

  const handleSearchFacetChange = (threshold: number, accessor: string[]) => {
    setThreshold(threshold);
    setSearchFacet(accessor);
  };

  return (
    <div className="flex flex-col rounded px-2 py-1">
      <div className="w-full p-3 py-1 h-min rounded-sm flex justify-between">
        <input
          id="search"
          name="search"
          className="focus:outline-none"
          placeholder="Search dams..."
          value={searchString}
          onChange={(element) => setSearchString(element.target.value)}
        />
        <button onClick={() => setSearchString("")}>
          <XMarkIcon className="w-5 h-5" />
          <label className="sr-only">Clear</label>
        </button>
      </div>
      <fieldset>
        <legend className="sr-only">Select a search facet:</legend>
        <div className="flex gap-4 items-center px-2">
          {searchFacetsConfig.map((facet) => (
            <RadioButton
              key={facet.label}
              facet={facet}
              checked={facet.accessor[0] === searchFacet[0]}
              handleSearchFacetChange={handleSearchFacetChange}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default SearchBox;
