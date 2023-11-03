import { DataContext } from "@/lib/context/DataContext";
import { DataPoint } from "@/lib/types/data";
import Fuse from "fuse.js";
import { useContext } from "react";

type Props = {
  results: Fuse.FuseResult<DataPoint>[];
};
const Results = ({ results }: Props) => {
  const { setDataPoint } = useContext(DataContext);

  const handleSelect = (result: Fuse.FuseResult<DataPoint>) => {
    setDataPoint(result.item);
  };

  return (
    <div className="h-64 p-4 rounded-md overflow-y-auto">
      {results.map((result) => (
        <div
          className="hover:bg-slate-200"
          key={result.item.properties["Dam"]}
          onClick={() => handleSelect(result)}
        >
          {result.item.properties["Dam"]}
        </div>
      ))}
    </div>
  );
};

export default Results;
