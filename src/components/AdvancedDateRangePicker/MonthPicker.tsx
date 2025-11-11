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
}: MonthPickerProps) {
  const today = parseUtc(getTodayUtc());
  const initialRange = normalizeRange(selectedRange);
  const initialYear = initialRange.from
    ? getYear(initialRange.from)
    : getYear(today);

  const [monthRange, setMonthRange] = useState<MonthRange>(initialRange);
  // Get the starting year from selected range or current year
  const [displayYear, setDisplayYear] = useState(initialYear);

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
    const clickedDate = setMonth(setYear(new Date(), year), monthIndex);
    const monthStart = startOfMonth(clickedDate);
    const monthEnd = endOfMonth(clickedDate);

    const nextStartField = () => onActiveFieldChange?.("start");
    const nextEndField = () => onActiveFieldChange?.("end");

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
    const fromMonth = getMonth(monthRange.from);
    const fromYear = getYear(monthRange.from);
    return year === fromYear && monthIndex === fromMonth;
  };

  const isMonthEnd = (year: number, monthIndex: number): boolean => {
    if (!monthRange.to) return false;
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

  const renderYear = (year: number) => {
    return (
      <div key={year} className="flex-1">
        <div className="text-center font-semibold text-lg mb-4">{year}</div>
        <div className="grid grid-cols-4 gap-2">
          {MONTHS.map((month, index) => {
            const inRange = isMonthInRange(year, index);
            const isStart = isMonthStart(year, index);
            const isEnd = isMonthEnd(year, index);
            const isSelected = isStart || isEnd;

            const futureMonth = isFutureMonth(year, index);

            return (
              <button
                key={month}
                onClick={() => !futureMonth && handleMonthClick(year, index)}
                disabled={futureMonth}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    futureMonth
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
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setDisplayYear(displayYear - 1)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-lg font-semibold">
          {displayYear} - {displayYear + 1}
        </div>
        <button
          onClick={() => setDisplayYear(displayYear + 1)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Two Year Grids */}
      <div className="flex gap-8">
        {renderYear(displayYear)}
        {renderYear(displayYear + 1)}
      </div>
    </div>
  );
}
