import { DataContext } from "@/lib/context/DataContext";
import {
  LegendNumber,
  LegendString,
  LegendType,
  NumberRange,
} from "@/lib/types/map";
import { useContext } from "react";

type Props = {
  type: LegendType;
  item: LegendNumber | LegendString;
  checkable: boolean;
};
const LegendRow = ({ checkable, item, type }: Props) => {
  const { filteredLegends, setFilteredLegends } = useContext(DataContext);

  const handleFilterChange = (code: string | NumberRange) => {
    const newFilters = filteredLegends.includes(code)
      ? filteredLegends.filter((item) => item !== code)
      : Array.from(new Set([...filteredLegends, code]));
    setFilteredLegends(newFilters);
  };

  return (
    <div className="flex gap-2" key={item.name}>
      {checkable && (
        <input
          type="checkbox"
          defaultChecked={true}
          name="legend"
          onChange={() => handleFilterChange(item.code)}
          value={item.name}
          className="w-4 h-4 border border-gray-300 rounded focus:ring-blue-500"
        />
      )}
      {type == "size" ? (
        <span
          className="inline-block"
          style={{
            height: Number((item as LegendNumber).size),
            width: Number((item as LegendNumber).size),
            borderRadius: 100,
            backgroundColor: "#055CA8",
          }}
        ></span>
      ) : (
        <span
          className="w-4 h-4 inline-block"
          style={{ backgroundColor: (item as LegendString).color }}
        ></span>
      )}
      <span>{item.name}</span>
    </div>
  );
};

export default LegendRow;
