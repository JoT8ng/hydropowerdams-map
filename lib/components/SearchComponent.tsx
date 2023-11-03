import Results from "@/lib/components/Results";
import SearchBox from "@/lib/components/SearchBox";
import { DataPoint } from "@/lib/types/data";
import { useState } from "react";
import Fuse from "fuse.js";

type Props = {
  data: any;
};

const SearchComponent = ({ data }: Props) => {
  const [results, setResults] = useState<Fuse.FuseResult<DataPoint>[] | null>(
    null
  );

  return (
    <div className="w-full bg-white h-60 md:w-80 md:h-min">
      <SearchBox data={data} setResults={setResults} />
      {results && <Results results={results} />}
    </div>
  );
};

export default SearchComponent;
