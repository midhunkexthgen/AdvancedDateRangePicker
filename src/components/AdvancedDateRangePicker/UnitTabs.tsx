import type { DateRangeUnit } from "../../types/dateRange";

interface UnitTabsProps {
  unit: DateRangeUnit;
  excludeEnabled: boolean;
  onUnitChange: (unit: DateRangeUnit) => void;
}

const UNITS: DateRangeUnit[] = ["day", "week", "month", "quarter"];

export default function UnitTabs({
  unit,
  excludeEnabled,
  onUnitChange,
}: UnitTabsProps) {
  return (
    <div className="flex gap-2 mb-2 justify-end border-b border-gray-200 pb-2 pr-4">
      {UNITS.map((u) => (
        <button
          key={u}
          onClick={() => onUnitChange(u)}
          disabled={excludeEnabled}
          className={`px-4 py-2 w-20 rounded-lg text-xs font-medium transition-colors ${
            excludeEnabled
              ? unit === u
                ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8] opacity-60 cursor-not-allowed"
                : "bg-[#EBF0F9] text-gray-400 opacity-60 cursor-not-allowed border border-transparent"
              : unit === u
              ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]"
              : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"
          }`}
        >
          {u.charAt(0).toUpperCase() + u.slice(1)}
        </button>
      ))}
    </div>
  );
}
