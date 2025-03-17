import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "all" },
          { value: "with-discount", label: "with discount" },
          { value: "no-discount", label: "no disocunt" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-desc", label: "Sort by name(Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low firts)" },
          { value: "maxCapacity-asc", label: "Sort by price (high firts)" },
          { value: "maxCapacity-desc", label: "Sort by price (low firts)" },
        ]}
      />
    </TableOperations>
  );
}
