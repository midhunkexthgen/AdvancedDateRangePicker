import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseUtc, getTodayUtc } from "../../utils/dateRange";
import {
  endOfMonth,
  getMonth,
  getYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import { ALLOW_FUTURE_DATES } from "../../config/dateConfig";

interface MonthPickerProps {
  selectedRange: { from?: Date; to?: Date };
  onSelect: (range: { from?: Date; to?: Date } | undefined) => void;
  activeDateField?: "start" | "end";
  onActiveFieldChange?: (field: "start" | "end") => void;
  disabled?: boolean;
}

type MonthRange = { from?: Date; to?: Date };

const normalizeRange = (range: MonthRange | undefined): MonthRange => {
  const normalizedFrom = range?.from ? startOfMonth(range.from) : undefined;
  const normalizedTo = range?.to ? endOfMonth(range.to) : undefined;

  if (
    normalizedFrom &&
    normalizedTo &&
    normalizedTo.getTime() < normalizedFrom.getTime()
  ) {
    return { from: normalizedFrom, to: endOfMonth(normalizedFrom) };
  }

  return { from: normalizedFrom, to: normalizedTo };
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthPicker({
  selectedRange,
  onSelect,
  activeDateField = "start",
  onActiveFieldChange,
  disabled = false,
}: MonthPickerProps) {
  const today = parseUtc(getTodayUtc());
  const initialRange = normalizeRange(selectedRange);
  const initialYear = initialRange.from
    ? getYear(initialRange.from)
    : getYear(today);

  const [monthRange, setMonthRange] = useState<MonthRange>(initialRange);
  // Get the starting year from selected range or current year
  const [displayYear, setDisplayYear] = useState(initialYear);

  // Check if the range represents "today" (default when dates are cleared)
  // When dates are cleared, monthQuarterRange defaults to todayDateObj for both from and to
  // We detect this by checking the original selectedRange before normalization
  // (normalizeRange converts today to startOfMonth/endOfMonth, so we can't use monthRange)
  const isDefaultTodayRange = (): boolean => {
    // If from and to are the exact same date and that date is today, it's likely the cleared state
    // (as opposed to a full month range which would span from startOfMonth to endOfMonth)
    if (!selectedRange.from || !selectedRange.to) return false;

    const isSinglePoint =
      selectedRange.from.getTime() === selectedRange.to.getTime();
    const isToday =
      selectedRange.from.getTime() === today.getTime() &&
      selectedRange.to.getTime() === today.getTime();

    return isSinglePoint && isToday;
  };

  useEffect(() => {
    const normalized = normalizeRange(selectedRange);

    setMonthRange((current) => {
      const currentFromTime = current.from?.getTime() ?? null;
      const currentToTime = current.to?.getTime() ?? null;
      const normalizedFromTime = normalized.from?.getTime() ?? null;
      const normalizedToTime = normalized.to?.getTime() ?? null;

      const sameFrom = currentFromTime === normalizedFromTime;
      const sameTo = currentToTime === normalizedToTime;

      if (sameFrom && sameTo) {
        return current;
      }

      if (normalized.from) {
        const normalizedYear = getYear(normalized.from);
        setDisplayYear((currentDisplayYear) => {
          if (
            currentDisplayYear === normalizedYear ||
            currentDisplayYear === normalizedYear - 1
          ) {
            return currentDisplayYear;
          }
          return normalizedYear;
        });
      }

      return normalized;
    });
  }, [selectedRange]);

  const handleMonthClick = (year: number, monthIndex: number) => {
    if (disabled) return;
    const clickedDate = setMonth(setYear(new Date(), year), monthIndex);
    const monthStart = startOfMonth(clickedDate);
    const monthEnd = endOfMonth(clickedDate);

    const nextStartField = () => onActiveFieldChange?.("start");
    const nextEndField = () => onActiveFieldChange?.("end");

    // If dates are cleared (default today range), just select the clicked month
    if (isDefaultTodayRange()) {
      const nextRange: MonthRange = { from: monthStart, to: monthEnd };
      setMonthRange(nextRange);
      onSelect({ from: monthStart });
      nextEndField();
      return;
    }

    if (activeDateField === "end") {
      if (!monthRange.from) {
        const nextRange: MonthRange = { from: monthStart, to: monthEnd };
        setMonthRange(nextRange);
        onSelect({ from: monthStart });
        nextEndField();
        return;
      }

      const currentFrom = monthRange.from;
      const currentTo = monthRange.to ?? endOfMonth(currentFrom);
      let nextFrom = currentFrom;
      let nextTo = monthEnd;

      if (monthStart.getTime() < currentFrom.getTime()) {
        nextFrom = monthStart;
        nextTo = currentTo;
      }

      const nextRange: MonthRange = { from: nextFrom, to: nextTo };
      setMonthRange(nextRange);
      onSelect(nextRange);
      nextStartField();
      return;
    }

    // Treat as selecting start
    const nextRange: MonthRange = { from: monthStart, to: monthEnd };
    setMonthRange(nextRange);
    onSelect({ from: monthStart });
    nextEndField();
  };

  const isMonthInRange = (year: number, monthIndex: number): boolean => {
    if (!monthRange.from || !monthRange.to) return false;

    // If it's the default today range, don't show any months as in range
    if (isDefaultTodayRange()) return false;

    const fromMonth = getMonth(monthRange.from);
    const fromYear = getYear(monthRange.from);
    const toMonth = getMonth(monthRange.to);
    const toYear = getYear(monthRange.to);

    const currentYearMonth = year * 12 + monthIndex;
    const fromYearMonth = fromYear * 12 + fromMonth;
    const toYearMonth = toYear * 12 + toMonth;

    return currentYearMonth >= fromYearMonth && currentYearMonth <= toYearMonth;
  };

  const isMonthStart = (year: number, monthIndex: number): boolean => {
    if (!monthRange.from) return false;

    // If it's the default today range, don't show any months as selected
    if (isDefaultTodayRange()) return false;

    const fromMonth = getMonth(monthRange.from);
    const fromYear = getYear(monthRange.from);
    return year === fromYear && monthIndex === fromMonth;
  };

  const isMonthEnd = (year: number, monthIndex: number): boolean => {
    if (!monthRange.to) return false;

    // If it's the default today range, don't show any months as selected
    if (isDefaultTodayRange()) return false;

    const toMonth = getMonth(monthRange.to);
    const toYear = getYear(monthRange.to);
    return year === toYear && monthIndex === toMonth;
  };

  const isFutureMonth = (year: number, monthIndex: number): boolean => {
    if (ALLOW_FUTURE_DATES) return false;
    const monthDate = startOfMonth(
      setMonth(setYear(new Date(), year), monthIndex)
    );
    return monthDate > today;
  };

  const renderYear = (
    year: number,
    showLeftChevron: boolean,
    showRightChevron: boolean,
    style?: React.CSSProperties
  ) => {
    return (
      <div key={year} style={{ width: "224px", height: "256px" }}>
        <div className="flex items-center mb-4" style={{ ...style }}>
          {showLeftChevron && (
            <button
              onClick={() => !disabled && setDisplayYear(displayYear - 1)}
              disabled={disabled}
              className={`p-1 rounded-md transition-colors ${
                disabled ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div className="text-center font-semibold text-sm px-3 py-1 rounded-md ">
            {year}
          </div>
          {showRightChevron && (
            <button
              onClick={() => !disabled && setDisplayYear(displayYear + 1)}
              disabled={disabled}
              className={`p-1 rounded-md transition-colors ${
                disabled ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((month, index) => {
            const inRange = isMonthInRange(year, index);
            const isStart = isMonthStart(year, index);
            const isEnd = isMonthEnd(year, index);
            const isSelected = isStart || isEnd;

            const futureMonth = isFutureMonth(year, index);

            return (
              <button
                key={month}
                onClick={() =>
                  !futureMonth && !disabled && handleMonthClick(year, index)
                }
                disabled={futureMonth || disabled}
                className={`
                  px-3 py-2 text-xs font-medium rounded-md transition-colors
                  ${
                    futureMonth || disabled
                      ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#003DB8] text-white"
                      : inRange
                      ? "bg-[#CEDBF5] text-[#1F1F1F]"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {month}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Two Year Grids with Navigation */}
      <div className="flex gap-8 justify-between px-6">
        {renderYear(displayYear, true, false, {
          justifyContent: "start",
          gap: "3rem",
        })}
        {renderYear(displayYear + 1, false, true, {
          justifyContent: "end",
          gap: "3rem",
        })}
      </div>
    </div>
  );
}
