import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
}
