interface Option {
  value: string;
  label: string;
}
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
export default function SortBy({ options }: { options: Option[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get("sortBy") || "";
  function hadnleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={selectedValue}
      onChange={hadnleChange}
    />
  );
}
