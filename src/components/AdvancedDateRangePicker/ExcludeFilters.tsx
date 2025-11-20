import type { Dispatch, SetStateAction } from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Bookmark, Search, X, Calendar } from "lucide-react";
import type { SavedDateRange } from "../../types/dateRange";
import {
  WEEKDAY_LABELS,
  WEEKDAY_FULL_NAMES,
  SupportedExcludeFilterType,
} from "./constants";
import { formatDateRangeLabel } from "../../utils/dateRange";

interface ExcludeFiltersProps {
  excludeEnabled: boolean;
  excludeFilterTypes: SupportedExcludeFilterType[];
  activeFilterView: SupportedExcludeFilterType | null;
  excludedWeekdays: number[];
  excludedSavedDates: string[];
  excludedSpecificDates: string[];
  excludedDateRanges: Array<{ id: string; start: string; end: string }>;
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
  setExcludedSpecificDates: Dispatch<SetStateAction<string[]>>;
  setExcludedDateRanges: Dispatch<
    SetStateAction<Array<{ id: string; start: string; end: string }>>
  >;
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
  excludedSpecificDates,
  excludedDateRanges,
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
  setExcludedSpecificDates,
  setExcludedDateRanges,
  setExcludeFilterTypes,
  setActiveFilterView,
  savedDatesForFilter,
}: ExcludeFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isClickInsideCard =
        cardRef.current && cardRef.current.contains(target);
      const isClickOnEditButton =
        editButtonRef.current && editButtonRef.current.contains(target);

      if (!isClickInsideCard && !isClickOnEditButton) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

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
  const handleRemoveDateRange = (id: string) => {
    setExcludedDateRanges((prev) => {
      const next = prev.filter((range) => range.id !== id);
      if (next.length === 0) {
        setExcludeFilterTypes((types) =>
          types.filter((t) => t !== "date-range")
        );
      }
      return next;
    });
  };

  const handleRemoveSpecificDate = (dateStr: string) => {
    setExcludedSpecificDates((current) => {
      return current.filter((d) => d !== dateStr);
    });
  };

  const allExcludedItems = [
    ...selectedWeekdays.map((day) => ({
      id: `day-${day.value}`,
      label: WEEKDAY_FULL_NAMES[day.value] ?? day.label,
      title: WEEKDAY_FULL_NAMES[day.value] ?? day.label,
      onRemove: () => onToggleWeekday(day.value),
    })),
    ...selectedSavedDates.map((saved) => ({
      id: `saved-${saved.id}`,
      label: getSavedDateChipLabel(saved),
      title: formatSavedDateRange(saved),
      onRemove: () => handleRemoveSavedDate(saved.id),
    })),
    ...excludedDateRanges.map((range) => ({
      id: `range-${range.id}`,
      label: formatDateRangeLabel(range.start, range.end),
      title: formatDateRangeLabel(range.start, range.end),
      onRemove: () => handleRemoveDateRange(range.id),
    })),
    ...excludedSpecificDates.map((dateStr) => ({
      id: `specific-${dateStr}`,
      label: new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      title: dateStr,
      onRemove: () => handleRemoveSpecificDate(dateStr),
    })),
  ];

  return (
    <div className=" border-b border-gray-200">
      {/* Controls Row */}
      <div className="py-2 flex items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="exclude-checkbox"
            checked={excludeEnabled}
            onChange={(e) => onExcludeToggle(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="exclude-checkbox"
            className="text-sm font-medium text-[#1F1F1F]"
          >
            exclude
          </label>
        </div>

        {isExpanded && (
          <button
            ref={editButtonRef}
            type="button"
            onClick={() => {
              onExcludeToggle(true);
              setIsExpanded(false);
              setIsEditMode(true);
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 ml-auto"
          >
            Edit
          </button>
        )}

        {excludeEnabled && (
          <>
            <div className="flex items-center gap-2 relative">
              <button
                type="button"
                onClick={() => onFilterButtonClick("days")}
                style={{ width: "80px", height: "24px" }}
                className={`flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${
                  activeFilterView === "days"
                    ? "border-blue-500 bg-gray-50 text-gray-700"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>weeks</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {activeFilterView === "days" &&
                excludeFilterTypes.includes("days") && (
                  <div className="absolute w-12 h-[264px] top-full left-7 mt-1 z-20">
                    <div className="flex flex-col gap-3 px-2 py-2 bg-white border border-[0.5px]  border-gray-200 rounded-lg">
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
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${
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
                )}

              <button
                type="button"
                onClick={() => onFilterButtonClick("saved-dates")}
                style={{ width: "80px", height: "24px" }}
                className={`flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${
                  activeFilterView === "saved-dates"
                    ? "border-blue-500 bg-gray-50 text-gray-700"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>Saved</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {excludeEnabled &&
                activeFilterView === "saved-dates" &&
                excludeFilterTypes.includes("saved-dates") && (
                  <div className="absolute top-full left-0 mt-2 z-20 w-80 max-h-64">
                    <div className="flex flex-col gap-3 px-4 py-4 bg-white rounded-xl shadow-xl">
                      <div className="relative h-7 w-72 flex items-center">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={savedDatesSearchTerm}
                          onChange={(event) =>
                            setSavedDatesSearchTerm(event.target.value)
                          }
                          placeholder="Search saved dates"
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {filteredSavedDates.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-6">
                          No saved dates found
                        </p>
                      ) : (
                        <div className="max-h-64 overflow-y-auto space-y-2">
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
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                                  isExcluded
                                    ? "bg-[#CEDBF5] "
                                    : "bg-white  hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold text-gray-900">
                                    {saved.label}
                                  </span>
                                  <span className="text-[10px] font-medium text-gray-600">
                                    {startDate} - {endDate}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div className="flex items-center gap-2 ml-auto h-7">
              <button
                type="button"
                onClick={() => {
                  onCancel();
                  setActiveFilterView(null);
                }}
                className="px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSave();
                  setActiveFilterView(null);
                }}
                className="px-4 h-7 flex items-center py-2 bg-[#003DB8] text-white text-xs font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                Save Exclusion
              </button>
            </div>
          </>
        )}
      </div>

      {/* Excluded Items Row */}
      {allExcludedItems.length > 0 && (
        <div className="w-full border-t border-gray-200 py-3 px-4 relative">
          <div className="flex items-center w-full">
            <div className="flex flex-wrap gap-2 flex-1">
              {(excludeEnabled || isExpanded
                ? allExcludedItems
                : allExcludedItems.slice(0, 4)
              ).map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                  title={item.title}
                >
                  {item.label}
                  {excludeEnabled && (
                    <button
                      type="button"
                      onClick={item.onRemove}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={`Remove ${item.label}`}
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {!excludeEnabled && !isExpanded && allExcludedItems.length > 4 && (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="text-sm text-[#5F6B7C] hover:text-gray-900 font-normal flex items-center gap-1 ml-auto whitespace-nowrap"
              >
                more <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>

          {isExpanded &&
            !excludeEnabled && ( // Only show expanded card if NOT enabled (read-only view)
              <div
                ref={cardRef}
                className="absolute top-0 left-0 w-full min-h-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded-lg"
              >
                <div className="flex flex-wrap gap-2">
                  {allExcludedItems.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                      title={item.title}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
