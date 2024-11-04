import { FilterDropdown, Option } from "./FilterDropdown";

const conditionOptions = [
  { id: 1, name: "Good" },
  { id: 2, name: "Fair" },
  { id: 3, name: "Poor" },
];

const availabilityOptions = [
  { id: 1, name: "Available" },
  { id: 2, name: "Unavailable" },
];

type FilterPanelProps = {
  setSelectedConditions: (selected: Option[]) => void;
  setAvailabilityStatus: (selected: Option[]) => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  setSelectedConditions,
  setAvailabilityStatus,
}) => {
  return (
    <div className="flex space-x-4 mx-auto">
      <div className="block text-sm pt-2.5  font-bold text-gray-700">
        {" "}
        Search Filters{" "}
      </div>
      <FilterDropdown
        options={conditionOptions}
        label="Condition"
        onSelectionChange={setSelectedConditions}
      />
      <FilterDropdown
        options={availabilityOptions}
        label="Availability status"
        onSelectionChange={setAvailabilityStatus}
      />
    </div>
  );
};
