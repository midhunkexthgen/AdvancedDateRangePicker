import { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange, Matcher } from "react-day-picker";
import { enGB } from "date-fns/locale";
import {
  startOfMonth,
  addMonths,
  getYear,
  getMonth,
  setMonth,
  setYear,
} from "date-fns";
import type { DateRangeUnit } from "../../types/dateRange";
import MonthPicker from "./MonthPicker";
import QuarterPicker from "./QuarterPicker";
import {
  ALLOW_FUTURE_DATES,
  WEEK_STARTS_ON,
  WEEK_NUMBERING_MODE,
} from "../../config/dateConfig";
import { MONTHS } from "./constants";

interface CalendarSectionProps {
  unit: DateRangeUnit;
  excludeEnabled: boolean;
  selectedRange: DateRange;
  displayedMonth: Date;
  setDisplayedMonth: (date: Date) => void;
  dayPickerModifiers: Record<
    string,
    Matcher | Matcher[] | ((date: Date) => boolean)
  >;
  dayPickerDisabledMatcher: (date: Date) => boolean;
  monthsViewIndex: number | null;
  setMonthsViewIndex: (value: number | null) => void;
  monthsViewYear: number;
  setMonthsViewYear: (value: number) => void;
  yearsViewIndex: number | null;
  setYearsViewIndex: (value: number | null) => void;
  yearsViewDecade: number;
  setYearsViewDecade: (value: number) => void;
  handleCalendarSelect: (range: { from?: Date; to?: Date } | undefined) => void;
  handleResetCalendarSelect: (
    range: { from?: Date; to?: Date } | undefined,
    dayPickerProps: Date
  ) => void;
  handleWeekCalendarSelect: (
    range: { from?: Date; to?: Date } | undefined,
    dayPickerProps: Date
  ) => void;
  monthQuarterRange: { from: Date; to: Date };
  activeDateField: "start" | "end";
  setActiveDateField: (field: "start" | "end") => void;
  onMonthSelect: (year: number, monthIndex: number) => void;
  onYearSelect: (year: number) => void;
  todayDateObj: Date;
  onDayClick: (date: Date) => void;
}

export default function CalendarSection({
  unit,
  excludeEnabled,
  selectedRange,
  displayedMonth,
  setDisplayedMonth,
  dayPickerModifiers,
  dayPickerDisabledMatcher,
  monthsViewIndex,
  setMonthsViewIndex,
  monthsViewYear,
  setMonthsViewYear,
  yearsViewIndex,
  setYearsViewIndex,
  yearsViewDecade,
  setYearsViewDecade,
  handleCalendarSelect,
  handleResetCalendarSelect,
  handleWeekCalendarSelect,
  monthQuarterRange,
  activeDateField,
  setActiveDateField,
  onMonthSelect,
  onYearSelect,
  todayDateObj,
  onDayClick,
}: CalendarSectionProps) {
  const leftCalendarRef = useRef<HTMLDivElement>(null);
  const rightCalendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unit !== "day") return;

    const applyMonthClickHandler = (
      captionElement: HTMLElement,
      actualCalendarIndex: number
    ) => {
      const existingMonthSpan = captionElement.querySelector(
        "span[data-month-name]"
      );
      const existingYearSpan = captionElement.querySelector(
        "span[data-year-name]"
      );

      if (existingMonthSpan) {
        const textContent = captionElement.textContent || "";
        captionElement.style.gap = "6px";
        captionElement.style.fontSize = "14px";
        captionElement.style.fontWeight = "600";

        let year = "";
        if (existingYearSpan) {
          year = existingYearSpan.textContent || "";
        } else {
          const yearMatch = textContent.match(/\d{4}/);
          if (yearMatch) year = yearMatch[0];
        }

        if (!existingYearSpan && year) {
          const yearSpan = document.createElement("span");
          yearSpan.textContent = year;
          yearSpan.setAttribute("data-year-name", "true");
          yearSpan.style.cursor = "pointer";
          yearSpan.style.fontSize = "14px";
          yearSpan.style.fontWeight = "600";

          yearSpan.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            const yearNum = parseInt(year, 10);
            if (!isNaN(yearNum)) {
              const decade = Math.floor(yearNum / 10) * 10;
              setYearsViewDecade(decade);
              setYearsViewIndex(actualCalendarIndex);
              setMonthsViewIndex(null);
            }
          };

          const spaceNode = existingMonthSpan.nextSibling;
          if (spaceNode && spaceNode.nodeType === Node.TEXT_NODE) {
            spaceNode.parentNode?.insertBefore(yearSpan, spaceNode.nextSibling);
          } else {
            const space = document.createTextNode(" ");
            captionElement.appendChild(space);
            captionElement.appendChild(yearSpan);
          }
        } else if (existingYearSpan) {
          (existingYearSpan as HTMLElement).onclick = (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            const yearNum = parseInt(year, 10);
            if (!isNaN(yearNum)) {
              const decade = Math.floor(yearNum / 10) * 10;
              setYearsViewDecade(decade);
              setYearsViewIndex(actualCalendarIndex);
              setMonthsViewIndex(null);
            }
          };
        }

        (existingMonthSpan as HTMLElement).onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          const yearNum = parseInt(
            (existingYearSpan?.textContent || "").trim() || textContent,
            10
          );
          if (!isNaN(yearNum)) {
            setMonthsViewYear(yearNum);
            setMonthsViewIndex(actualCalendarIndex);
            setYearsViewIndex(null);
          }
        };

        return;
      }

      const text = captionElement.textContent || "";
      const parts = text.trim().split(/\s+/);
      let monthName = "";
      let year = "";
      if (parts.length >= 2) {
        monthName = parts[0];
        year = parts[1];
      } else if (parts.length === 1) {
        const match = text.match(/^([A-Za-z]+)(\d{4})$/);
        if (match) {
          monthName = match[1];
          year = match[2];
        } else {
          return;
        }
      } else {
        return;
      }

      if (monthName && year) {
        const textNode = captionElement.firstChild as Text;
        captionElement.style.gap = "6px";

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const fullText = textNode.textContent || "";
          const monthNameIndex = fullText.indexOf(monthName);

          if (monthNameIndex !== -1) {
            const monthSpan = document.createElement("span");
            monthSpan.textContent = monthName;
            monthSpan.setAttribute("data-month-name", "true");
            monthSpan.style.cursor = "pointer";
            monthSpan.style.fontSize = "14px";
            monthSpan.style.fontWeight = "600";

            monthSpan.onclick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              const yearNum = parseInt(year, 10);
              if (!isNaN(yearNum)) {
                setMonthsViewYear(yearNum);
                setMonthsViewIndex(actualCalendarIndex);
                setYearsViewIndex(null);
              }
            };

            const yearSpan = document.createElement("span");
            yearSpan.textContent = year;
            yearSpan.setAttribute("data-year-name", "true");
            yearSpan.style.cursor = "pointer";
            yearSpan.style.fontSize = "14px";
            yearSpan.style.fontWeight = "600";

            yearSpan.onclick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              const yearNum = parseInt(year, 10);
              if (!isNaN(yearNum)) {
                const decade = Math.floor(yearNum / 10) * 10;
                setYearsViewDecade(decade);
                setYearsViewIndex(actualCalendarIndex);
                setMonthsViewIndex(null);
              }
            };

            captionElement.innerHTML = "";
            captionElement.appendChild(monthSpan);
            const spaceNode = document.createTextNode(" ");
            captionElement.appendChild(spaceNode);
            captionElement.appendChild(yearSpan);
          }
        }
      }
    };

    const attachMonthClickHandlers = (
      container: HTMLDivElement | null,
      calendarIndex: number | null
    ) => {
      if (!container) return;

      const captions = container.querySelectorAll(".rdp-caption_label");
      captions.forEach((caption, index) => {
        const captionElement = caption as HTMLElement;
        const actualCalendarIndex =
          calendarIndex !== null ? calendarIndex : index === 0 ? 0 : 1;

        if (
          monthsViewIndex === actualCalendarIndex ||
          yearsViewIndex === actualCalendarIndex
        ) {
          return;
        }

        applyMonthClickHandler(captionElement, actualCalendarIndex);
      });
    };

    const timer = setTimeout(() => {
      if (monthsViewIndex === null && yearsViewIndex === null) {
        attachMonthClickHandlers(leftCalendarRef.current, null);
      } else {
        attachMonthClickHandlers(leftCalendarRef.current, 0);
        attachMonthClickHandlers(rightCalendarRef.current, 1);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [
    unit,
    displayedMonth,
    monthsViewIndex,
    yearsViewIndex,
    setMonthsViewIndex,
    setMonthsViewYear,
    setYearsViewDecade,
    setYearsViewIndex,
  ]);

  const renderYearsGrid = (decade: number) => {
    const startYear = decade - 1;
    const endYear = decade + 10;
    const currentYear = getYear(displayedMonth);

    const years: number[] = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }

    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setYearsViewDecade(yearsViewDecade - 10)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <span className="text-lg">{"<<"}</span>
          </button>
          <div className="text-lg font-semibold">
            {decade}-{decade + 9}
          </div>
          <button
            onClick={() => setYearsViewDecade(yearsViewDecade + 10)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <span className="text-lg">{">>"}</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {years.map((year) => {
            const isFuture =
              !ALLOW_FUTURE_DATES && year > getYear(todayDateObj);
            const isOutsideDecade = year < decade || year > decade + 9;
            const isSelected = currentYear === year;
            return (
              <button
                key={year}
                onClick={() => !isFuture && onYearSelect(year)}
                disabled={isFuture}
                className={`
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${
                    isFuture
                      ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isOutsideDecade
                      ? "opacity-50 bg-gray-50 text-gray-500"
                      : isSelected
                      ? "bg-[#003DB8] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthsGrid = (year: number) => (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonthsViewYear(monthsViewYear - 1)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <span className="text-lg">{"<<"}</span>
        </button>
        <div className="text-lg font-semibold">{year}</div>
        <button
          onClick={() => setMonthsViewYear(monthsViewYear + 1)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <span className="text-lg">{">>"}</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {MONTHS.map((month, index) => {
          const isFuture =
            !ALLOW_FUTURE_DATES &&
            startOfMonth(setMonth(setYear(new Date(), year), index)) >
              todayDateObj;
          const isSelected =
            getYear(displayedMonth) === year &&
            getMonth(displayedMonth) === index;
          return (
            <button
              key={month}
              onClick={() => !isFuture && onMonthSelect(year, index)}
              disabled={isFuture}
              className={`
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${
                    isFuture
                      ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#003DB8] text-white"
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

  const BASE_DAY_PICKER_STYLES = {
    day: {
      width: "32px",
      height: "28px",
      padding: 0,
    },
    day_button: {
      width: "32px",
      height: "28px",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    weekdays: {
      borderBottom: "1px solid #D5E0F6",
      paddingBottom: "0.35rem",
      marginBottom: "0.35rem",
    },
    head: {
      borderBottom: "1px solid #D5E0F6",
      marginBottom: "0.35rem",
    },
    head_row: {
      borderBottom: "1px solid #D5E0F6",
    },
    head_cell: {
      paddingBottom: "0.35rem",
    },
    caption: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "32px",
    },
    caption_label: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1",
    },
    nav_button: {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      border: "1px solid #D3DBF0",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    nav_button_previous: {
      marginRight: "6px",
      height: "32px",
    },
    nav_button_next: {
      marginLeft: "6px",
      height: "32px",
    },
    month_caption: {
      height: "32px",
    },
  } as const;

  const dayPickerClassNames = {
    chevron: "fill-[#1F1F1F] w-4 h-4",
  };

  return (
    <div
      className={`flex gap-4 justify-center mb-4 h-[264px] ${
        excludeEnabled ? "excluded-enabled" : "excluded-disabled"
      } ${unit}-picker-calender`}
    >
      {unit === "day" && (
        <div className={`flex gap-4`}>
          {yearsViewIndex !== null ? (
            yearsViewIndex === 0 ? (
              <>
                <div
                  className="w-full flex-shrink-0"
                  style={{ minWidth: "280px", maxWidth: "280px" }}
                >
                  {renderYearsGrid(yearsViewDecade)}
                </div>
                <div ref={rightCalendarRef}>
                  <DayPicker
                    mode="range"
                    navLayout="around"
                    selected={selectedRange}
                    onSelect={handleCalendarSelect}
                    modifiers={dayPickerModifiers}
                    month={startOfMonth(addMonths(displayedMonth, 1))}
                    onMonthChange={(date) => {
                      const prevMonth = new Date(displayedMonth);
                      const newMonth = new Date(date);
                      const diff = newMonth.getMonth() - prevMonth.getMonth();
                      if (diff !== 1 && diff !== -11) {
                        setDisplayedMonth(startOfMonth(addMonths(date, -1)));
                      }
                    }}
                    numberOfMonths={1}
                    disabled={dayPickerDisabledMatcher}
                    onDayClick={onDayClick}
                    modifiersClassNames={{
                      selected: "rdp-day_selected bg-[#003DB8]",
                      disabled:
                        "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                      excludedWeekday: "rdp-day_excluded-weekday",
                      "excluded-saved-date": "rdp-day_excluded-saved-date",
                      "excluded-specific-date":
                        "rdp-day_excluded-specific-date",
                      "excluded-range": "rdp-day_excluded-range",
                      "exclude-range-start": "rdp-day_exclude-range-start",
                    }}
                    modifiersStyles={{
                      "excluded-range": {
                        backgroundColor: "#f3f3f3",
                        color: "#1f2937",
                      },
                      "exclude-range-start": {
                        backgroundColor: "#f3f3f3",
                        color: "#1f2937",
                      },
                    }}
                    classNames={dayPickerClassNames}
                    styles={BASE_DAY_PICKER_STYLES}
                  />
                </div>
              </>
            ) : (
              <>
                <div ref={leftCalendarRef}>
                  <DayPicker
                    mode="range"
                    navLayout="around"
                    selected={selectedRange}
                    onSelect={handleCalendarSelect}
                    modifiers={dayPickerModifiers}
                    month={displayedMonth}
                    onMonthChange={setDisplayedMonth}
                    numberOfMonths={1}
                    disabled={dayPickerDisabledMatcher}
                    modifiersClassNames={{
                      selected: "rdp-day_selected bg-[#003DB8]",
                      disabled:
                        "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                      excludedWeekday: "rdp-day_excluded-weekday",
                      "excluded-saved-date": "rdp-day_excluded-saved-date",
                      "excluded-specific-date":
                        "rdp-day_excluded-specific-date",
                      "excluded-range": "rdp-day_excluded-range",
                      "exclude-range-start": "rdp-day_exclude-range-start",
                    }}
                    modifiersStyles={{
                      "excluded-range": {
                        backgroundColor: "#f3f3f3",
                        color: "#1f2937",
                      },
                      "exclude-range-start": {
                        backgroundColor: "#f3f3f3",
                        color: "#1f2937",
                      },
                    }}
                    classNames={dayPickerClassNames}
                    styles={BASE_DAY_PICKER_STYLES}
                  />
                </div>
                <div
                  className="w-full flex-shrink-0"
                  style={{ minWidth: "280px", maxWidth: "280px" }}
                >
                  {renderYearsGrid(yearsViewDecade)}
                </div>
              </>
            )
          ) : monthsViewIndex === null ? (
            <div
              ref={leftCalendarRef}
              className="w-full"
              style={{ minWidth: 0 }}
            >
              <DayPicker
                mode="range"
                navLayout="around"
                selected={selectedRange}
                onSelect={(range, _dayPickerProps) => {
                  handleResetCalendarSelect(range, _dayPickerProps);
                }}
                modifiers={dayPickerModifiers}
                month={displayedMonth}
                onMonthChange={setDisplayedMonth}
                numberOfMonths={2}
                disabled={dayPickerDisabledMatcher}
                className="text-xs"
                onDayClick={onDayClick}
                modifiersClassNames={{
                  selected: "rdp-day_selected",
                  disabled: "rdp-day_disabled text-black",
                  excludedWeekday: "rdp-day_excluded-weekday",
                  "excluded-saved-date": "rdp-day_excluded-saved-date",
                  "excluded-specific-date": "rdp-day_excluded-specific-date",
                  "excluded-range": "rdp-day_excluded-range",
                  "exclude-range-start": "rdp-day_exclude-range-start",
                }}
                modifiersStyles={{
                  "excluded-range": {
                    backgroundColor: "#f3f3f3",
                    color: "#1f2937",
                  },
                  "exclude-range-start": {
                    backgroundColor: "#f3f3f3",
                    color: "#1f2937",
                  },
                }}
                classNames={dayPickerClassNames}
                styles={{
                  ...BASE_DAY_PICKER_STYLES,
                  months: {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    gap: "24px",
                    width: "100%",
                  },
                  month: {
                    width: "224px",
                    // width: "calc((100% - 24px) / 2)",
                    minWidth: "224px",
                    maxWidth: "260px",
                    height: "256px",
                  },
                  caption: {
                    ...BASE_DAY_PICKER_STYLES.caption,
                    paddingBottom: "8px",
                  },
                  month_grid: {
                    borderCollapse: "separate",
                    borderSpacing: "0 0.25rem",
                    width: "100%",
                  },
                  table: {
                    width: "100%",
                  },
                  cell: {
                    padding: "0.10rem 0",
                    backgroundClip: "content-box",
                  },
                }}
              />
            </div>
          ) : monthsViewIndex === 0 ? (
            <>
              <div
                className="w-full flex-shrink-0"
                style={{ minWidth: "280px", maxWidth: "280px" }}
              >
                {renderMonthsGrid(monthsViewYear)}
              </div>
              <div ref={rightCalendarRef}>
                <DayPicker
                  mode="range"
                  navLayout="around"
                  selected={selectedRange}
                  onSelect={handleCalendarSelect}
                  modifiers={dayPickerModifiers}
                  month={startOfMonth(addMonths(displayedMonth, 1))}
                  onMonthChange={(date) => {
                    const prevMonth = new Date(displayedMonth);
                    const newMonth = new Date(date);
                    const diff = newMonth.getMonth() - prevMonth.getMonth();
                    if (diff !== 1 && diff !== -11) {
                      setDisplayedMonth(startOfMonth(addMonths(date, -1)));
                    }
                  }}
                  numberOfMonths={1}
                  disabled={dayPickerDisabledMatcher}
                  modifiersClassNames={{
                    selected: "rdp-day_selected bg-[#003DB8]",
                    disabled:
                      "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                    excludedWeekday: "rdp-day_excluded-weekday",
                    "excluded-saved-date": "rdp-day_excluded-saved-date",
                    "excluded-specific-date": "rdp-day_excluded-specific-date",
                  }}
                  classNames={dayPickerClassNames}
                  styles={BASE_DAY_PICKER_STYLES}
                />
              </div>
            </>
          ) : (
            <>
              <div ref={leftCalendarRef}>
                <DayPicker
                  mode="range"
                  navLayout="around"
                  selected={selectedRange}
                  onSelect={handleCalendarSelect}
                  modifiers={dayPickerModifiers}
                  month={displayedMonth}
                  onMonthChange={setDisplayedMonth}
                  numberOfMonths={1}
                  disabled={dayPickerDisabledMatcher}
                  modifiersClassNames={{
                    selected: "rdp-day_selected bg-[#003DB8]",
                    disabled:
                      "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                    excludedWeekday: "rdp-day_excluded-weekday",
                    "excluded-saved-date": "rdp-day_excluded-saved-date",
                    "excluded-specific-date": "rdp-day_excluded-specific-date",
                  }}
                  classNames={{
                    chevron: "fill-black",
                  }}
                  styles={BASE_DAY_PICKER_STYLES}
                />
              </div>
              <div
                className="w-full flex-shrink-0"
                style={{ minWidth: "280px", maxWidth: "280px" }}
              >
                {renderMonthsGrid(monthsViewYear)}
              </div>
            </>
          )}
        </div>
      )}
      {unit === "week" && (
        <DayPicker
          mode="range"
          navLayout="around"
          showWeekNumber
          locale={WEEK_NUMBERING_MODE === "iso" ? enGB : undefined}
          formatters={{
            formatWeekNumber: (weekNumber) =>
              `W${String(weekNumber).padStart(2, "0")}`,
          }}
          selected={selectedRange}
          onSelect={(range, dayPickerProps) => {
            handleWeekCalendarSelect(range, dayPickerProps);
          }}
          modifiers={dayPickerModifiers}
          onWeekNumberClick={(_weekNumber: number, dates: Date[]) => {
            if (dates && dates.length > 0) {
              handleWeekCalendarSelect(
                {
                  from: dates[0],
                  to: dates[dates.length - 1],
                },
                dates[0]
              );
            }
          }}
          month={displayedMonth}
          onMonthChange={setDisplayedMonth}
          numberOfMonths={2}
          disabled={(date) => dayPickerDisabledMatcher(date)}
          onDayClick={onDayClick}
          modifiersClassNames={{
            selected: "rdp-day_selected bg-[#003DB8]",
            disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
            excludedWeekday: "rdp-day_excluded-weekday",
            "excluded-saved-date": "rdp-day_excluded-saved-date",
            "excluded-specific-date": "rdp-day_excluded-specific-date",
            "excluded-range": "rdp-day_excluded-range",
            "exclude-range-start": "rdp-day_exclude-range-start",
          }}
          modifiersStyles={{
            "excluded-specific-date": {
              backgroundColor: "#f3f3f3",
              color: "#1f2937",
            },
            "excluded-range": {
              backgroundColor: "#f3f3f3",
              color: "#1f2937",
            },
            "exclude-range-start": {
              backgroundColor: "#f3f3f3",
              color: "#1f2937",
            },
          }}
          className="text-xs"
          classNames={dayPickerClassNames}
          styles={{
            ...BASE_DAY_PICKER_STYLES,
            months: {
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              gap: "24px",
              width: "100%",
            },
            month: {
              width: "252px",
              // width: "calc((100% - 24px) / 2)",
              minWidth: "224px",
              maxWidth: "260px",
              height: "256px",
            },
            caption: {
              ...BASE_DAY_PICKER_STYLES.caption,
              paddingBottom: "8px",
            },
            month_grid: {
              borderCollapse: "separate",
              borderSpacing: "0 0.25rem",
              width: "100%",
            },
            table: {
              width: "100%",
            },
            cell: {
              padding: "0.10rem 0",
              backgroundClip: "content-box",
            },
            caption_label: {
              fontSize: "14px !important",
              fontWeight: "600",
              lineHeight: "1",
            },
          }}
        />
      )}
      {unit === "month" && (
        <MonthPicker
          selectedRange={monthQuarterRange}
          onSelect={handleCalendarSelect}
          activeDateField={activeDateField}
          onActiveFieldChange={setActiveDateField}
          disabled={excludeEnabled}
        />
      )}
      {unit === "quarter" && (
        <QuarterPicker
          selectedRange={monthQuarterRange}
          onSelect={handleCalendarSelect}
          disabled={excludeEnabled}
        />
      )}
    </div>
  );
}
