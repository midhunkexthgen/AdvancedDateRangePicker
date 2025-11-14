import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { ChevronDown, Bookmark, Search, X } from "lucide-react";
import type { SavedDateRange } from "../../types/dateRange";
import {
  WEEKDAY_LABELS,
  WEEKDAY_FULL_NAMES,
  SupportedExcludeFilterType,
} from "./constants";

interface ExcludeFiltersProps {
  excludeEnabled: boolean;
  excludeFilterTypes: SupportedExcludeFilterType[];
  activeFilterView: SupportedExcludeFilterType | null;
  excludedWeekdays: number[];
  excludedSavedDates: string[];
  savedDatesSearchTerm: string;
  filteredSavedDates: SavedDateRange[];
  savedDatesForFilter: SavedDateRange[];
  onExcludeToggle: (checked: boolean) => void;
  onFilterButtonClick: (type: SupportedExcludeFilterType) => void;
  onRemoveFilterType: (type: SupportedExcludeFilterType) => void;
  onCancel: () => void;
  onSave: () => void;
  onToggleWeekday: (day: number) => void;
  setSavedDatesSearchTerm: (value: string) => void;
  setExcludedSavedDates: Dispatch<SetStateAction<string[]>>;
  setExcludeFilterTypes: Dispatch<SetStateAction<SupportedExcludeFilterType[]>>;
  setActiveFilterView: Dispatch<
    SetStateAction<SupportedExcludeFilterType | null>
  >;
}

export default function ExcludeFilters({
  excludeEnabled,
  excludeFilterTypes,
  activeFilterView,
  excludedWeekdays,
  excludedSavedDates,
  savedDatesSearchTerm,
  filteredSavedDates,
  onExcludeToggle,
  onFilterButtonClick,
  onRemoveFilterType,
  onCancel,
  onSave,
  onToggleWeekday,
  setSavedDatesSearchTerm,
  setExcludedSavedDates,
  setExcludeFilterTypes,
  setActiveFilterView,
  savedDatesForFilter,
}: ExcludeFiltersProps) {
  const savedDatesById = useMemo(() => {
    const map = new Map<string, SavedDateRange>();
    for (const saved of savedDatesForFilter) {
      map.set(saved.id, saved);
    }
    return map;
  }, [savedDatesForFilter]);

  const selectedWeekdays = WEEKDAY_LABELS.filter((day) =>
    excludedWeekdays.includes(day.value)
  );

  const selectedSavedDates = excludedSavedDates
    .map((id) => savedDatesById.get(id))
    .filter((value): value is SavedDateRange => Boolean(value));

  const formatSavedDateRange = (saved: SavedDateRange) => {
    const start = new Date(saved.selection.startDateUtc + "T00:00:00");
    const end = new Date(saved.selection.endDateUtc + "T00:00:00");
    const formatOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const startLabel = start.toLocaleDateString("en-US", formatOptions);
    const endLabel = end.toLocaleDateString("en-US", formatOptions);
    return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
  };

  const getSavedDateChipLabel = (saved: SavedDateRange) => {
    const rangeLabel = formatSavedDateRange(saved);
    const trimmedLabel = saved.label?.trim();
    if (
      trimmedLabel &&
      trimmedLabel.toLowerCase() !== rangeLabel.toLowerCase()
    ) {
      return trimmedLabel;
    }
    return rangeLabel;
  };

  const handleRemoveSavedDate = (savedId: string) => {
    setExcludedSavedDates((current) => {
      if (!current.includes(savedId)) {
        return current;
      }
      const next = current.filter((id) => id !== savedId);
      if (next.length === 0) {
        setExcludeFilterTypes((types) =>
          types.filter((t) => t !== "saved-dates")
        );
      }
      return next;
    });
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="exclude-checkbox"
            checked={excludeEnabled}
            onChange={(e) => onExcludeToggle(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="exclude-checkbox" className="text-sm text-gray-700">
            {!excludeEnabled ? "exclude dates from selection" : "exclude"}
          </label>
        </div>

        {excludeEnabled && (
          <>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onFilterButtonClick("days")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  activeFilterView === "days"
                    ? "border-blue-500 bg-[#F7F8FA] text-gray-700"
                    : "border-gray-200 bg-[#F7F8FA] text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>Week Days</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {activeFilterView === "days" &&
                excludeFilterTypes.includes("days") && (
                  <div className="relative">
                    <div className="absolute right-0 mt-2 z-20">
                      <div className="flex flex-col gap-3 px-2 py-2 bg-white border border-gray-200 rounded-xl shadow-xl">
                        <div className="flex justify-center">
                          <div className="inline-flex flex-col items-center gap-2 ">
                            {WEEKDAY_LABELS.map((day) => {
                              const isSelected = excludedWeekdays.includes(
                                day.value
                              );
                              return (
                                <button
                                  key={day.value}
                                  onClick={() => onToggleWeekday(day.value)}
                                  className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                                    isSelected
                                      ? "bg-[#CEDBF5] shadow-inner"
                                      : "text-gray-800 hover:bg-gray-100"
                                  }`}
                                >
                                  {day.label.charAt(0)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <button
                type="button"
                onClick={() => onFilterButtonClick("saved-dates")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  activeFilterView === "saved-dates"
                    ? "border-blue-500 bg-[#F7F8FA] text-gray-700"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>Saved Dates</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {excludeEnabled &&
                activeFilterView === "saved-dates" &&
                excludeFilterTypes.includes("saved-dates") && (
                  <div className="relative">
                    <div className="absolute right-0 mt-2 z-20 w-80">
                      <div className="flex flex-col gap-3 px-3 py-3 bg-white border border-gray-200 rounded-xl shadow-xl">
                        <div className="relative">
                          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={savedDatesSearchTerm}
                            onChange={(event) =>
                              setSavedDatesSearchTerm(event.target.value)
                            }
                            placeholder="Search saved dates"
                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {filteredSavedDates.length === 0 ? (
                          <p className="text-sm text-gray-500 text-center py-6">
                            No saved dates found
                          </p>
                        ) : (
                          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                            {filteredSavedDates.map((saved) => {
                              const isExcluded = excludedSavedDates.includes(
                                saved.id
                              );

                              const startDate = new Date(
                                saved.selection.startDateUtc + "T00:00:00"
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              });

                              const endDate = new Date(
                                saved.selection.endDateUtc + "T00:00:00"
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              });

                              return (
                                <button
                                  key={saved.id}
                                  type="button"
                                  onClick={() => {
                                    setExcludedSavedDates((current) => {
                                      if (current.includes(saved.id)) {
                                        const next = current.filter(
                                          (id) => id !== saved.id
                                        );

                                        if (next.length === 0) {
                                          setExcludeFilterTypes((types) =>
                                            types.filter(
                                              (t) => t !== "saved-dates"
                                            )
                                          );
                                        }

                                        return next;
                                      }

                                      setExcludeFilterTypes((types) => {
                                        if (types.includes("saved-dates")) {
                                          return types;
                                        }
                                        return [...types, "saved-dates"];
                                      });

                                      return [...current, saved.id];
                                    });
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md border text-left transition-colors ${
                                    isExcluded
                                      ? "bg-blue-50 border-blue-300"
                                      : "bg-white border-gray-200 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                      {saved.label}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                      {startDate} - {endDate}
                                    </span>
                                  </div>
                                  <div className="ml-2 flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={isExcluded}
                                      onChange={() => {}}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                                    />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Bookmark className="w-4 h-4 text-gray-400" />
                            <span>{excludedSavedDates.length} selected</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveFilterType("saved-dates")}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => {
                  onCancel();
                  setActiveFilterView(null);
                }}
                className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSave();
                  setActiveFilterView(null);
                }}
                className="px-4 py-2 bg-[#003DB8] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </>
        )}

        {(selectedWeekdays.length > 0 || selectedSavedDates.length > 0) && (
          <div className="w-full border-t border-gray-200 pt-3">
            <div className="flex flex-wrap gap-2">
              {selectedWeekdays.map((day) => {
                const fullLabel = WEEKDAY_FULL_NAMES[day.value] ?? day.label;
                return (
                  <span
                    key={day.value}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                    title={fullLabel}
                  >
                    {fullLabel}
                    {excludeEnabled && (
                      <button
                        type="button"
                        onClick={() => onToggleWeekday(day.value)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={`Remove ${fullLabel}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </span>
                );
              })}

              {selectedSavedDates.map((saved) => {
                const chipLabel = getSavedDateChipLabel(saved);
                const rangeLabel = formatSavedDateRange(saved);
                return (
                  <span
                    key={saved.id}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                    title={rangeLabel}
                  >
                    {chipLabel}
                    {excludeEnabled && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSavedDate(saved.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={`Remove ${chipLabel}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
