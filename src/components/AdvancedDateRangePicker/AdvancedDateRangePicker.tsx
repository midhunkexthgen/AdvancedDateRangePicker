import { useState, useEffect, useRef, useMemo } from "react";
import type { CSSProperties } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  startOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  getYear,
  getMonth,
  setMonth,
  setYear,
} from "date-fns";
import { enGB } from "date-fns/locale";
// no-op
import {
  X,
  ChevronDown,
  CalendarDays,
  Bookmark,
  AlertTriangle,
  Search,
} from "lucide-react";
import type {
  DateRangeSelection,
  DateRangeUnit,
  SavedDateRange,
} from "../../types/dateRange";
import {
  parseUtc,
  formatUtc,
  getTodayUtc,
  calcEndFromDuration,
  calcStartFromDuration,
  calcDurationFromRange,
  createSelection,
  getUnitAbbreviation,
} from "../../utils/dateRange";
import {
  ALLOW_FUTURE_DATES,
  WEEK_STARTS_ON,
  WEEK_NUMBERING_MODE,
} from "../../config/dateConfig";
import PresetSidebar from "./PresetSidebar";
import MonthPicker from "./MonthPicker";
import QuarterPicker from "./QuarterPicker";
// Week view will use DayPicker with week numbers instead of the custom WeekPicker list
import DateInput from "./DateInput";
import { storageService } from "../../services/storageService";

interface AdvancedDateRangePickerProps {
  initialSelection?: Partial<DateRangeSelection>;
  onApply: (selection: DateRangeSelection) => void;
  onCancel: () => void;
  themeColors?: {
    background: string;
    surface: string;
    surfaceSecondary: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
  };
}

const WEEKDAY_LABELS = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" },
];

type SupportedExcludeFilterType = "days" | "saved-dates";
type LegacyExcludeFilterType = "specific-date" | "date-range";
type AnyExcludeFilterType =
  | SupportedExcludeFilterType
  | LegacyExcludeFilterType;

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

// Consumers can override the fixed container height by defining the
// `--adrp-container-height` CSS custom property on a parent element.
const DEFAULT_PICKER_HEIGHT = "var(--adrp-container-height, min(720px, 85vh))";
// Consumers can override the fixed container width by defining the
// `--adrp-container-width` CSS custom property on a parent element.
const DEFAULT_PICKER_WIDTH = "var(--adrp-container-width, min(1200px, 98vw))";

export default function AdvancedDateRangePicker({
  initialSelection,
  onApply,
  onCancel,
  themeColors,
}: AdvancedDateRangePickerProps) {
  const today = getTodayUtc();

  const containerStyle: CSSProperties = {
    height: DEFAULT_PICKER_HEIGHT,
    minHeight: DEFAULT_PICKER_HEIGHT,
    maxHeight: DEFAULT_PICKER_HEIGHT,
    width: DEFAULT_PICKER_WIDTH,
    minWidth: DEFAULT_PICKER_WIDTH,
    maxWidth: DEFAULT_PICKER_WIDTH,
    overflow: "hidden",
    ...themeColors,
  };

  const initialSupportedExcludeFilterTypes: SupportedExcludeFilterType[] = (
    initialSelection?.excludeFilterTypes || []
  ).filter(
    (type): type is SupportedExcludeFilterType =>
      type === "days" || type === "saved-dates"
  );

  // Initialize state
  const [unit, setUnit] = useState<DateRangeUnit>(
    initialSelection?.unit || "day"
  );
  const [startDateUtc, setStartDateUtc] = useState(
    initialSelection?.startDateUtc || today
  );
  const [endDateUtc, setEndDateUtc] = useState(
    initialSelection?.endDateUtc || today
  );
  const [activeDateField, setActiveDateField] = useState<"start" | "end">(
    () => {
      if (initialSelection?.startDateUtc && !initialSelection?.endDateUtc) {
        return "end";
      }
      if (!initialSelection?.startDateUtc && initialSelection?.endDateUtc) {
        return "start";
      }
      return "start";
    }
  );
  const [duration, setDuration] = useState(initialSelection?.duration || 1);
  const [excludedWeekdays, setExcludedWeekdays] = useState<number[]>(
    initialSelection?.excludedWeekdays || []
  );
  const [excludedSpecificDates, setExcludedSpecificDates] = useState<string[]>(
    initialSelection?.excludedSpecificDates || []
  );

  // Ref for measuring text width
  const durationInputRef = useRef<HTMLInputElement>(null);
  const [unitPosition, setUnitPosition] = useState(0);

  // Exclude filter state
  const [excludeEnabled, setExcludeEnabled] = useState(false);
  const [excludeFilterTypes, setExcludeFilterTypes] = useState<
    SupportedExcludeFilterType[]
  >(initialSupportedExcludeFilterTypes);
  const [activeFilterView, setActiveFilterView] =
    useState<SupportedExcludeFilterType | null>(null);
  const [excludedSavedDates, setExcludedSavedDates] = useState<string[]>(
    initialSelection?.excludedSavedDates || []
  );
  const [savedDatesSearchTerm, setSavedDatesSearchTerm] = useState("");
  const [excludedDateRanges, setExcludedDateRanges] = useState<
    Array<{ id: string; start: string; end: string }>
  >(initialSelection?.excludedDateRanges || []);
  const excludeSavedStateRef = useRef<{
    excludeFilterTypes: AnyExcludeFilterType[];
    excludedWeekdays: number[];
    excludedSpecificDates: string[];
    excludedSavedDates: string[];
    excludedDateRanges: Array<{ id: string; start: string; end: string }>;
  }>({
    excludeFilterTypes: initialSupportedExcludeFilterTypes,
    excludedWeekdays: initialSelection?.excludedWeekdays || [],
    excludedSpecificDates: initialSelection?.excludedSpecificDates || [],
    excludedSavedDates: initialSelection?.excludedSavedDates || [],
    excludedDateRanges: initialSelection?.excludedDateRanges || [],
  });
  const [excludeApplied, setExcludeApplied] = useState<boolean>(() => {
    if (initialSelection?.excludeEnabled) {
      return true;
    }
    return Boolean(
      initialSupportedExcludeFilterTypes.length > 0 ||
        (initialSelection?.excludedWeekdays &&
          initialSelection.excludedWeekdays.length > 0) ||
        (initialSelection?.excludedSavedDates &&
          initialSelection.excludedSavedDates.length > 0)
    );
  });
  // Load saved dates for filter
  const [savedDatesForFilter, setSavedDatesForFilter] = useState<
    SavedDateRange[]
  >([]);

  // State to control which month is displayed in DayPicker
  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => {
    // Initialize with start date or today
    if (initialSelection?.startDateUtc) {
      return startOfMonth(parseUtc(initialSelection.startDateUtc));
    }
    return startOfMonth(parseUtc(today));
  });

  // State to control months view mode (0 = left calendar, 1 = right calendar, null = day view)
  const [monthsViewIndex, setMonthsViewIndex] = useState<number | null>(null);
  const [monthsViewYear, setMonthsViewYear] = useState<number>(() => {
    if (initialSelection?.startDateUtc) {
      return getYear(parseUtc(initialSelection.startDateUtc));
    }
    return getYear(parseUtc(today));
  });

  // State to control years view mode (0 = left calendar, 1 = right calendar, null = day view)
  const [yearsViewIndex, setYearsViewIndex] = useState<number | null>(null);
  const [yearsViewDecade, setYearsViewDecade] = useState<number>(() => {
    if (initialSelection?.startDateUtc) {
      const year = getYear(parseUtc(initialSelection.startDateUtc));
      return Math.floor(year / 10) * 10; // Get decade (e.g., 2024 -> 2020)
    }
    const currentYear = getYear(parseUtc(today));
    return Math.floor(currentYear / 10) * 10;
  });

  // Recalculate duration whenever dependencies change
  useEffect(() => {
    if (startDateUtc && endDateUtc) {
      const newDuration = calcDurationFromRange(
        startDateUtc,
        endDateUtc,
        unit,
        excludedWeekdays
      );
      setDuration(newDuration);
    } else {
      setDuration(1);
    }
  }, [startDateUtc, endDateUtc, unit, excludedWeekdays]);
  // Calculate unit position based on duration text width
  useEffect(() => {
    if (durationInputRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        // Match the input's font style
        context.font = "14px system-ui, -apple-system, sans-serif";
        const textWidth = context.measureText(duration.toString()).width;
        // 12px (left padding) + text width + 4px (one space)
        setUnitPosition(12 + textWidth + 4);
      }
    }
  }, [duration]);

  // Load saved dates for filter
  useEffect(() => {
    const loadSavedDates = async () => {
      await storageService.init();
      const data = await storageService.getData<SavedDateRange[]>(
        "savedDateRanges"
      );
      if (data) {
        setSavedDatesForFilter(data);
      }
    };
    loadSavedDates();
  }, []);

  useEffect(() => {
    if (startDateUtc && !endDateUtc) {
      setActiveDateField("end");
    } else if (!startDateUtc && endDateUtc) {
      setActiveDateField("start");
    }
  }, [startDateUtc, endDateUtc]);

  const handleStartDateChange = (value: string) => {
    if (excludeEnabled) return;
    setStartDateUtc(value);
    if (value) {
      if (!endDateUtc) {
        setActiveDateField("end");
      }
    } else {
      setActiveDateField("start");
    }
    // If new start is after end, adjust end (only if both dates are valid)
    if (value && endDateUtc && parseUtc(value) > parseUtc(endDateUtc)) {
      setEndDateUtc(value);
    }
    // Navigate calendar to show the month of the new start date
    if (value) {
      setDisplayedMonth(startOfMonth(parseUtc(value)));
    }
  };

  const handleEndDateChange = (value: string) => {
    if (excludeEnabled) return;
    setEndDateUtc(value);
    if (value) {
      if (!startDateUtc) {
        setActiveDateField("start");
      }
    } else {
      setActiveDateField("end");
    }
    // If new end is before start, adjust start (only if both dates are valid)
    if (value && startDateUtc && parseUtc(value) < parseUtc(startDateUtc)) {
      setStartDateUtc(value);
    }
    // Navigate calendar to show the month of the new end date
    if (value) {
      setDisplayedMonth(startOfMonth(parseUtc(value)));
    }
  };

  // Check if dates violate ALLOW_FUTURE_DATES condition
  const hasFutureDates =
    !ALLOW_FUTURE_DATES &&
    startDateUtc &&
    endDateUtc &&
    (startDateUtc > today || endDateUtc > today);
  const getFutureDateWarning = () => {
    if (!hasFutureDates) return null;

    const startIsFuture = startDateUtc && startDateUtc > today;
    const endIsFuture = endDateUtc && endDateUtc > today;

    if (startIsFuture && endIsFuture) {
      return "Start date and end date cannot be in the future.";
    } else if (startIsFuture) {
      return "Start date cannot be in the future.";
    } else if (endIsFuture) {
      return "End date cannot be in the future.";
    }
    return null;
  };

  const sanitizeExcludeFilterTypes = (
    types: AnyExcludeFilterType[]
  ): SupportedExcludeFilterType[] =>
    types.filter(
      (type): type is SupportedExcludeFilterType =>
        type === "days" || type === "saved-dates"
    );

  const handleExcludeToggle = (checked: boolean) => {
    if (checked) {
      setExcludeEnabled(true);
      const savedState = excludeSavedStateRef.current;
      const sanitizedTypes = sanitizeExcludeFilterTypes(
        savedState.excludeFilterTypes
      );
      setExcludeFilterTypes([...sanitizedTypes]);
      setExcludedWeekdays([...savedState.excludedWeekdays]);
      setExcludedSpecificDates([...savedState.excludedSpecificDates]);
      setExcludedSavedDates([...savedState.excludedSavedDates]);
      setExcludedDateRanges([...savedState.excludedDateRanges]);

      const nextActive = sanitizedTypes.find(
        (type) => type === "days" || type === "saved-dates"
      );
      setActiveFilterView(
        (nextActive as SupportedExcludeFilterType | null) ?? null
      );
    } else {
      handleExcludeCancel();
    }
  };

  const handleExcludeFilterButtonClick = (type: SupportedExcludeFilterType) => {
    if (!excludeEnabled) return;

    if (!excludeFilterTypes.includes(type)) {
      setExcludeFilterTypes([...excludeFilterTypes, type]);
    }

    setActiveFilterView((prev) => (prev === type ? null : type));
  };

  const handleExcludeRemoveType = (type: SupportedExcludeFilterType) => {
    if (!excludeEnabled) return;

    const nextTypes = excludeFilterTypes.filter((t) => t !== type);
    setExcludeFilterTypes(nextTypes);

    if (type === "days") {
      setExcludedWeekdays([]);
    }
    if (type === "saved-dates") {
      setExcludedSavedDates([]);
    }

    if (activeFilterView === type) {
      const fallback = nextTypes.find(
        (t) => t === "days" || t === "saved-dates"
      );
      setActiveFilterView(
        (fallback as SupportedExcludeFilterType | null) ?? null
      );
    }
  };

  const handleExcludeCancel = () => {
    const savedState = excludeSavedStateRef.current;
    const sanitizedTypes = sanitizeExcludeFilterTypes(
      savedState.excludeFilterTypes
    );
    setExcludeFilterTypes([...sanitizedTypes]);
    setExcludedWeekdays([...savedState.excludedWeekdays]);
    setExcludedSpecificDates([...savedState.excludedSpecificDates]);
    setExcludedSavedDates([...savedState.excludedSavedDates]);
    setExcludedDateRanges([...savedState.excludedDateRanges]);
    setExcludeApplied(
      sanitizedTypes.length > 0 ||
        savedState.excludedWeekdays.length > 0 ||
        savedState.excludedSavedDates.length > 0
    );
    setExcludeEnabled(false);
    setActiveFilterView(null);
  };

  const handleExcludeSave = () => {
    const includeWeekDays = excludedWeekdays.length > 0;
    const includeSavedDates = excludedSavedDates.length > 0;

    const nextTypes: SupportedExcludeFilterType[] = [];
    if (includeWeekDays) {
      nextTypes.push("days");
    }
    if (includeSavedDates) {
      nextTypes.push("saved-dates");
    }

    const nextWeekdays = includeWeekDays ? [...excludedWeekdays] : [];
    const nextSpecificDates: string[] = [];
    const nextSavedDates = includeSavedDates ? [...excludedSavedDates] : [];
    const nextDateRanges: Array<{ id: string; start: string; end: string }> =
      [];

    excludeSavedStateRef.current = {
      excludeFilterTypes: nextTypes,
      excludedWeekdays: nextWeekdays,
      excludedSpecificDates: nextSpecificDates,
      excludedSavedDates: nextSavedDates,
      excludedDateRanges: nextDateRanges,
    };

    setExcludeFilterTypes(nextTypes);
    setExcludedWeekdays(nextWeekdays);
    setExcludedSpecificDates(nextSpecificDates);
    setExcludedSavedDates(nextSavedDates);
    setExcludedDateRanges(nextDateRanges);
    setExcludeApplied(nextTypes.length > 0);
    setExcludeEnabled(false);
    setActiveFilterView(null);
  };

  const handleDurationChange = (value: number) => {
    if (excludeEnabled) return;
    if (value <= 0) return;
    setDuration(value);

    // If startDate exists, calculate endDate from startDate
    if (startDateUtc) {
      const newEndDate = calcEndFromDuration(
        startDateUtc,
        unit,
        value,
        excludedWeekdays
      );
      setEndDateUtc(newEndDate);
      // Navigate calendar to show the month of the calculated end date
      setDisplayedMonth(startOfMonth(parseUtc(newEndDate)));
    }
    // If only endDate exists, calculate startDate from endDate (backwards)
    else if (endDateUtc) {
      const newStartDate = calcStartFromDuration(
        endDateUtc,
        unit,
        value,
        excludedWeekdays
      );
      setStartDateUtc(newStartDate);
      // Navigate calendar to show the month of the calculated start date
      setDisplayedMonth(startOfMonth(parseUtc(newStartDate)));
    }
    // If neither exists, do nothing (handled by input being disabled or validation)
    setActiveDateField("start");
  };

  const handleUnitChange = (newUnit: DateRangeUnit) => {
    if (excludeEnabled) return;
    setUnit(newUnit);
  };

  const toggleWeekday = (day: number) => {
    setExcludedWeekdays((current) => {
      if (current.includes(day)) {
        return current.filter((d) => d !== day);
      }
      return [...current, day];
    });

    if (excludeEnabled) {
      setExcludeFilterTypes((current) => {
        if (current.includes("days")) {
          return current;
        }
        return [...current, "days"];
      });
    }
  };

  const handlePresetSelect = (startDate: string, endDate: string) => {
    if (excludeEnabled) return;
    setStartDateUtc(startDate);
    setEndDateUtc(endDate);
    setActiveDateField("start");
    // Navigate calendar to show the month of the start date
    if (startDate) {
      setDisplayedMonth(startOfMonth(parseUtc(startDate)));
    }
  };

  const handleSavedDateSelect = (selection: DateRangeSelection) => {
    if (excludeEnabled) return;
    setStartDateUtc(selection.startDateUtc);
    setEndDateUtc(selection.endDateUtc);
    setUnit(selection.unit);
    const restoredWeekdays = selection.excludedWeekdays || [];
    setExcludedWeekdays(restoredWeekdays);
    setDuration(selection.duration);
    setActiveDateField("start");

    const restoredTypes = (selection.excludeFilterTypes || []).filter(
      (type): type is "days" | "saved-dates" =>
        type === "days" || type === "saved-dates"
    );

    const restoredSpecificDates = selection.excludedSpecificDates || [];
    const restoredSavedDates = selection.excludedSavedDates || [];
    const restoredDateRanges = selection.excludedDateRanges || [];

    setExcludeFilterTypes(restoredTypes);
    setExcludedSpecificDates(restoredSpecificDates);
    setExcludedSavedDates(restoredSavedDates);
    setExcludedDateRanges(restoredDateRanges);

    excludeSavedStateRef.current = {
      excludeFilterTypes: restoredTypes,
      excludedWeekdays: restoredWeekdays,
      excludedSpecificDates: restoredSpecificDates,
      excludedSavedDates: restoredSavedDates,
      excludedDateRanges: restoredDateRanges,
    };
    setExcludeApplied(
      restoredTypes.length > 0 ||
        restoredWeekdays.length > 0 ||
        restoredSavedDates.length > 0
    );
    setExcludeEnabled(false);
    setActiveFilterView(null);

    // Navigate calendar to show the month of the start date
    if (selection.startDateUtc) {
      setDisplayedMonth(startOfMonth(parseUtc(selection.startDateUtc)));
    }
  };

  const handleToday = () => {
    if (excludeEnabled) return;
    setStartDateUtc(today);
    setEndDateUtc(today);
    setExcludedWeekdays([]);
    setActiveDateField("start");
    // Navigate calendar to show the current month
    setDisplayedMonth(startOfMonth(parseUtc(today)));
  };

  const handleClear = () => {
    if (excludeEnabled) return;
    setStartDateUtc("");
    setEndDateUtc("");
    setDuration(1);
    setUnit("day");
    setExcludedWeekdays([]);
    setActiveDateField("start");

    // Clear all exclude filters
    setExcludeEnabled(false);
    setExcludeFilterTypes([]);
    setExcludedSpecificDates([]);
    setExcludedSavedDates([]);
    setExcludedDateRanges([]);
    setActiveFilterView(null);
    excludeSavedStateRef.current = {
      excludeFilterTypes: [],
      excludedWeekdays: [],
      excludedSpecificDates: [],
      excludedSavedDates: [],
      excludedDateRanges: [],
    };
    setExcludeApplied(false);

    // Navigate calendar to current month
    setDisplayedMonth(startOfMonth(parseUtc(today)));
  };

  // Check if dates are empty
  const hasEmptyDates = Boolean(
    !startDateUtc ||
      startDateUtc.trim() === "" ||
      !endDateUtc ||
      endDateUtc.trim() === ""
  );

  const handleApply = () => {
    if (excludeEnabled) return;
    // Prevent applying if dates are empty
    if (hasEmptyDates) {
      return;
    }

    // Prevent applying if future dates are not allowed and dates violate the rule
    if (hasFutureDates) {
      return;
    }

    const selection = createSelection(
      startDateUtc,
      endDateUtc,
      unit,
      excludedWeekdays,
      excludeApplied,
      excludeFilterTypes,
      excludedSpecificDates,
      excludedSavedDates,
      excludedDateRanges
    );
    onApply(selection);
  };

  const handleCalendarSelect = (
    range: { from?: Date; to?: Date } | undefined
  ) => {
    if (excludeEnabled) return;
    if (range?.from) {
      const newStart = formatUtc(range.from);
      setStartDateUtc(newStart);

      if (range?.to) {
        const newEnd = formatUtc(range.to);
        setEndDateUtc(newEnd);
        setActiveDateField("start");
      } else {
        setEndDateUtc(newStart);
        setActiveDateField("end");
      }
    }
  };

  const handleResetCalendarSelect = (
    range: { from?: Date; to?: Date } | undefined,
    dayPickerProps: Date
  ) => {
    if (excludeEnabled) return;
    if (startDateUtc && endDateUtc && range?.to) {
      const nextStart = formatUtc(dayPickerProps);
      if (activeDateField === "start") {
        if (parseUtc(endDateUtc).getTime() > parseUtc(nextStart).getTime()) {
          setStartDateUtc(nextStart);
        } else {
          setStartDateUtc(nextStart);
          setEndDateUtc("");
        }
      } else {
        if (parseUtc(startDateUtc).getTime() > parseUtc(nextStart).getTime()) {
          setEndDateUtc(startDateUtc);
          setStartDateUtc(nextStart);
        } else {
          setEndDateUtc(nextStart);
          setStartDateUtc(startDateUtc);
        }
      }
      setActiveDateField(activeDateField === "start" ? "end" : "start");
      return;
    }
    if (!startDateUtc && endDateUtc && range?.from) {
      setEndDateUtc(formatUtc(range?.from));
      setActiveDateField("start");
      return;
    }
    if (!startDateUtc && !endDateUtc && range?.from) {
      setStartDateUtc(formatUtc(range?.from));
      setEndDateUtc("");
      setActiveDateField("end");
      return;
    }
    if (range?.from) {
      const newStart = formatUtc(range.from);
      setStartDateUtc(newStart);

      if (range?.to) {
        const newEnd = formatUtc(range.to);
        setEndDateUtc(newEnd);
        setActiveDateField("start");
      } else {
        setEndDateUtc(newStart);
        setActiveDateField("end");
      }
    }
  };

  // When in week mode, snap the selection to whole weeks
  const handleWeekCalendarSelect = (
    range: { from?: Date; to?: Date } | undefined,
    dayPickerProps: Date
  ) => {
    if (excludeEnabled) return;
    if (!range) return;

    if (range.from) {
      let weekStartFrom = startOfWeek(range.from, {
        weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
      });
      let weekEndFrom = addDays(weekStartFrom, 6);

      if (startDateUtc && endDateUtc) {
        if (activeDateField === "start") {
          if (
            parseUtc(formatUtc(dayPickerProps)).getTime() >
              parseUtc(endDateUtc).getTime() &&
            parseUtc(formatUtc(dayPickerProps)).getTime() >
              parseUtc(startDateUtc).getTime()
          ) {
            weekStartFrom = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(weekStartFrom, 6);

            handleCalendarSelect({ from: weekStartFrom, to: weekEndFrom });

            // setStartDateUtc(formatUtc(dayPickerProps));
          } else if (
            parseUtc(formatUtc(dayPickerProps)).getTime() <
              parseUtc(endDateUtc).getTime() &&
            parseUtc(formatUtc(dayPickerProps)).getTime() <
              parseUtc(startDateUtc).getTime()
          ) {
            weekStartFrom = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(weekStartFrom, 6);

            const weekStartTo = startOfWeek(endDateUtc, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            const weekEndTo = addDays(weekStartTo, 6);
            handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
          } else if (
            parseUtc(formatUtc(dayPickerProps)).getTime() >
              parseUtc(startDateUtc).getTime() &&
            parseUtc(formatUtc(dayPickerProps)).getTime() <
              parseUtc(endDateUtc).getTime()
          ) {
            weekStartFrom = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(weekStartFrom, 6);

            const weekStartTo = startOfWeek(endDateUtc, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            const weekEndTo = addDays(weekStartTo, 6);
            handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
          } else {
            weekStartFrom = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(dayPickerProps, 6);
            handleCalendarSelect({ from: weekStartFrom, to: weekEndFrom });
          }
        } else {
          if (
            parseUtc(formatUtc(dayPickerProps)).getTime() >
            parseUtc(endDateUtc).getTime()
          ) {
            weekStartFrom = startOfWeek(range.from, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(weekStartFrom, 6);

            const weekStartTo = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            const weekEndTo = addDays(weekStartTo, 6);

            handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
          } else if (
            parseUtc(formatUtc(dayPickerProps)).getTime() <
              parseUtc(endDateUtc).getTime() &&
            parseUtc(formatUtc(dayPickerProps)).getTime() <
              parseUtc(startDateUtc).getTime()
          ) {
            weekStartFrom = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(weekStartFrom, 6);

            const weekStartTo = startOfWeek(startDateUtc, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            const weekEndTo = addDays(weekStartTo, 6);
            handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
          } else {
            weekStartFrom = startOfWeek(startDateUtc, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            weekEndFrom = addDays(weekStartFrom, 6);

            const weekStartTo = startOfWeek(dayPickerProps, {
              weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
            });
            const weekEndTo = addDays(weekStartTo, 6);
            handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
          }
        }
      }
      if (range.to && (!startDateUtc || !endDateUtc)) {
        const weekStartTo = startOfWeek(range.to, {
          weekStartsOn: WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
        });
        const weekEndTo = addDays(weekStartTo, 6);
        handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
      }
      setActiveDateField(activeDateField === "start" ? "end" : "start");
    }
  };

  // Week numbers are currently supplied by DayPicker and formatted below.

  // Use today as default dates for MonthPicker and QuarterPicker when empty
  const todayDateObj = parseUtc(today);
  const selectedRange: DateRange = {
    from: startDateUtc ? parseUtc(startDateUtc) : undefined,
    to: endDateUtc ? parseUtc(endDateUtc) : undefined,
  };

  const dayPickerModifiers = useMemo(() => {
    if (excludedWeekdays.length === 0) {
      return {};
    }
    return {
      excludedWeekday: {
        dayOfWeek: excludedWeekdays,
      },
    };
  }, [excludedWeekdays]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "adrp-excluded-weekday-style";
    if (document.getElementById(styleId)) return;

    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = `
      .rdp-day_excluded-weekday:not(.rdp-day_disabled):not(.rdp-day_selected) {
        background-color: #E6ECFB;
        color: #1F2937;
      }

      .rdp-day_excluded-weekday:not(.rdp-day_disabled):not(.rdp-day_selected):hover {
        background-color: #D8E0F6;
        color: #1F2937;
      }
    `;
    document.head.appendChild(styleElement);
  }, []);

  // For MonthPicker and QuarterPicker, provide default dates if empty
  const monthQuarterRange = {
    from: startDateUtc ? parseUtc(startDateUtc) : todayDateObj,
    to: endDateUtc ? parseUtc(endDateUtc) : todayDateObj,
  };

  const dayPickerDisabledMatcher = (date: Date): boolean =>
    excludeEnabled ? true : isDateDisabled(date);

  const filteredSavedDates = useMemo(() => {
    const term = savedDatesSearchTerm.trim().toLowerCase();
    if (!term) return savedDatesForFilter;

    return savedDatesForFilter.filter((saved) => {
      const start = new Date(saved.selection.startDateUtc + "T00:00:00")
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toLowerCase();
      const end = new Date(saved.selection.endDateUtc + "T00:00:00")
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toLowerCase();

      return (
        saved.label.toLowerCase().includes(term) ||
        `${start} - ${end}`.includes(term)
      );
    });
  }, [savedDatesForFilter, savedDatesSearchTerm]);

  useEffect(() => {
    if (activeFilterView !== "saved-dates") {
      setSavedDatesSearchTerm("");
    }
  }, [activeFilterView]);

  // Helper function for disabled date logic (used by all DayPicker instances)
  const isDateDisabled = (date: Date): boolean => {
    // Check if future dates are not allowed
    const isFutureDate = !ALLOW_FUTURE_DATES && formatUtc(date) > today;

    const isWeekdayExcluded =
      excludeEnabled &&
      excludeFilterTypes.includes("days") &&
      excludedWeekdays.includes(date.getDay());

    // Check if date falls within any excluded saved date range
    const isInExcludedSavedDate =
      excludeEnabled &&
      excludeFilterTypes.includes("saved-dates") &&
      excludedSavedDates.some((savedId) => {
        const saved = savedDatesForFilter.find((s) => s.id === savedId);
        if (!saved) return false;
        const dateStr = formatUtc(date);

        const isInRange =
          dateStr >= saved.selection.startDateUtc &&
          dateStr <= saved.selection.endDateUtc;

        if (!isInRange) return false;

        if (
          saved.selection.excludedWeekdays &&
          saved.selection.excludedWeekdays.length > 0 &&
          saved.selection.excludedWeekdays.includes(date.getDay())
        ) {
          return true;
        }

        if (
          saved.selection.excludedSpecificDates &&
          saved.selection.excludedSpecificDates.length > 0 &&
          saved.selection.excludedSpecificDates.includes(dateStr)
        ) {
          return true;
        }

        if (saved.selection.excludedSavedDates) {
          const isInExcludedSaved = saved.selection.excludedSavedDates.some(
            (excludedSavedId) => {
              const excludedSaved = savedDatesForFilter.find(
                (s) => s.id === excludedSavedId
              );
              if (!excludedSaved) return false;
              return (
                dateStr >= excludedSaved.selection.startDateUtc &&
                dateStr <= excludedSaved.selection.endDateUtc
              );
            }
          );
          if (isInExcludedSaved) return true;
        }

        let isInExcludedRange = false;
        if (saved.selection.excludedDateRanges) {
          isInExcludedRange = saved.selection.excludedDateRanges.some(
            (range) => dateStr >= range.start && dateStr <= range.end
          );
          if (isInExcludedRange) return true;
        }

        return false;
      });

    return isFutureDate || isWeekdayExcluded || isInExcludedSavedDate;
  };

  // Handle month selection from months grid
  const handleMonthSelect = (year: number, monthIndex: number) => {
    const newDate = startOfMonth(
      setMonth(setYear(new Date(), year), monthIndex)
    );
    setDisplayedMonth(newDate);
    setMonthsViewIndex(null);
    setMonthsViewYear(year);
  };

  // Handle year selection from years grid
  const handleYearSelect = (year: number) => {
    const currentMonth = getMonth(displayedMonth);
    const newDate = startOfMonth(
      setMonth(setYear(new Date(), year), currentMonth)
    );
    setDisplayedMonth(newDate);
    setYearsViewIndex(null);
    setYearsViewDecade(Math.floor(year / 10) * 10);
  };

  // Sync monthsViewYear when displayedMonth changes
  useEffect(() => {
    if (monthsViewIndex === null) {
      setMonthsViewYear(getYear(displayedMonth));
    }
  }, [displayedMonth, monthsViewIndex]);

  // Render years grid component
  const renderYearsGrid = (decade: number) => {
    const startYear = decade - 1; // Show one year before decade (e.g., 2019 for 2020-2029)
    const endYear = decade + 10; // Show one year after decade (e.g., 2030 for 2020-2029)
    const currentYear = getYear(displayedMonth);

    const years: number[] = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }

    return (
      <div className="flex flex-col w-full">
        {/* Decade Navigation */}
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
        {/* Years Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {years.map((year) => {
            const isFuture =
              !ALLOW_FUTURE_DATES && year > getYear(parseUtc(today));
            const isOutsideDecade = year < decade || year > decade + 9;
            const isSelected = currentYear === year;
            return (
              <button
                key={year}
                onClick={() => !isFuture && handleYearSelect(year)}
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

  // Render months grid component
  const renderMonthsGrid = (year: number) => {
    return (
      <div className="flex flex-col w-full">
        {/* Year Navigation */}
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
        {/* Months Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {MONTHS.map((month, index) => {
            const isFuture =
              !ALLOW_FUTURE_DATES &&
              startOfMonth(setMonth(setYear(new Date(), year), index)) >
                parseUtc(today);
            const isSelected =
              getYear(displayedMonth) === year &&
              getMonth(displayedMonth) === index;
            return (
              <button
                key={month}
                onClick={() => !isFuture && handleMonthSelect(year, index)}
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
  };

  // Refs for the calendar containers to attach click handlers
  const leftCalendarRef = useRef<HTMLDivElement>(null);
  const rightCalendarRef = useRef<HTMLDivElement>(null);

  // Add click handlers to month names in captions without changing visual appearance
  useEffect(() => {
    if (unit !== "day") return;

    const applyMonthClickHandler = (
      captionElement: HTMLElement,
      actualCalendarIndex: number
    ) => {
      // Check if already processed by looking for the month span
      const existingMonthSpan = captionElement.querySelector(
        "span[data-month-name]"
      );
      const existingYearSpan = captionElement.querySelector(
        "span[data-year-name]"
      );

      if (existingMonthSpan) {
        // Already processed, ensure year span exists and handlers are updated
        const textContent = captionElement.textContent || "";
        captionElement.style.gap = "6px";

        // Get year from existing year span or text node
        let year = "";
        if (existingYearSpan) {
          year = existingYearSpan.textContent || "";
        } else {
          const yearMatch = textContent.match(/\d{4}/);
          if (yearMatch) year = yearMatch[0];
        }

        // If no year span exists, create it
        if (!existingYearSpan && year) {
          const yearSpan = document.createElement("span");
          yearSpan.textContent = year;
          yearSpan.setAttribute("data-year-name", "true");
          yearSpan.style.cursor = "pointer";

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

          // Find where to insert (after space after month span)
          const spaceNode = existingMonthSpan.nextSibling;
          if (spaceNode && spaceNode.nodeType === Node.TEXT_NODE) {
            spaceNode.parentNode?.insertBefore(yearSpan, spaceNode.nextSibling);
          } else {
            // Insert space and year
            const space = document.createTextNode(" ");
            captionElement.appendChild(space);
            captionElement.appendChild(yearSpan);
          }
        } else if (existingYearSpan) {
          // Update year span click handler
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

        // Update month span click handler
        (existingMonthSpan as HTMLElement).onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          const yearNum = parseInt(year, 10);
          if (!isNaN(yearNum)) {
            setMonthsViewYear(yearNum);
            setMonthsViewIndex(actualCalendarIndex);
            setYearsViewIndex(null);
          }
        };

        return;
      }

      // Get the month name from the caption text
      const text = captionElement.textContent || "";
      const parts = text.trim().split(/\s+/);
      // Also try splitting without space if no space found
      let monthName = "";
      let year = "";
      if (parts.length >= 2) {
        monthName = parts[0]; // First word is the month name
        year = parts[1]; // Second word is the year
      } else if (parts.length === 1) {
        // If no space, try to extract month and year (e.g., "July2025")
        const match = text.match(/^([A-Za-z]+)(\d{4})$/);
        if (match) {
          monthName = match[1];
          year = match[2];
        } else {
          return; // Skip if we can't parse
        }
      } else {
        return; // Skip if we can't parse
      }

      if (monthName && year) {
        // Get text node
        const textNode = captionElement.firstChild as Text;
        captionElement.style.gap = "6px";

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const fullText = textNode.textContent || "";
          const monthNameIndex = fullText.indexOf(monthName);

          if (monthNameIndex !== -1) {
            // Split the text node: month name + space + year
            // Create span for month name that inherits all styles
            const monthSpan = document.createElement("span");
            monthSpan.textContent = monthName;
            monthSpan.setAttribute("data-month-name", "true");
            monthSpan.style.cursor = "pointer";
            // Don't set any other styles - let it inherit from parent to look identical

            // Handle click on month name
            monthSpan.onclick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              const yearNum = parseInt(year, 10);
              if (!isNaN(yearNum)) {
                setMonthsViewYear(yearNum);
                setMonthsViewIndex(actualCalendarIndex);
                setYearsViewIndex(null); // Close years view if open
              }
            };

            // Create year span that is clickable
            const yearSpan = document.createElement("span");
            yearSpan.textContent = year;
            yearSpan.setAttribute("data-year-name", "true");
            yearSpan.style.cursor = "pointer";

            // Handle click on year
            yearSpan.onclick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              const yearNum = parseInt(year, 10);
              if (!isNaN(yearNum)) {
                const decade = Math.floor(yearNum / 10) * 10;
                setYearsViewDecade(decade);
                setYearsViewIndex(actualCalendarIndex);
                setMonthsViewIndex(null); // Close months view if open
              }
            };

            // Replace content: monthSpan + space + yearSpan (ensure space is visible)
            captionElement.innerHTML = "";
            captionElement.appendChild(monthSpan);
            // Add a space character between month and year
            const spaceNode = document.createTextNode(" "); // Regular space
            captionElement.appendChild(spaceNode);
            captionElement.appendChild(yearSpan);
          }
        }
      }
    };

    const attachMonthClickHandlers = (
      container: HTMLDivElement | null,
      calendarIndex: number | null // null means single DayPicker with 2 months
    ) => {
      if (!container) return;

      const captions = container.querySelectorAll(".rdp-caption_label");
      captions.forEach((caption, index) => {
        const captionElement = caption as HTMLElement;

        // Determine which calendar this caption belongs to
        // If calendarIndex is null and numberOfMonths === 2, index 0 = left, index 1 = right
        const actualCalendarIndex =
          calendarIndex !== null ? calendarIndex : index === 0 ? 0 : 1;

        // Skip if this calendar is in months view or years view
        if (
          monthsViewIndex === actualCalendarIndex ||
          yearsViewIndex === actualCalendarIndex
        )
          return;

        // Apply the month click handler
        applyMonthClickHandler(captionElement, actualCalendarIndex);
      });
    };

    // Small delay to ensure calendar is rendered
    const timer = setTimeout(() => {
      if (monthsViewIndex === null && yearsViewIndex === null) {
        // Single DayPicker with 2 months
        attachMonthClickHandlers(leftCalendarRef.current, null);
      } else {
        // Two separate calendars
        attachMonthClickHandlers(leftCalendarRef.current, 0);
        attachMonthClickHandlers(rightCalendarRef.current, 1);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [unit, displayedMonth, monthsViewIndex, yearsViewIndex]);

  return (
    <div
      className="flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200"
      style={containerStyle}
    >
      {/* Left Sidebar: Presets and Saved Dates */}
      <PresetSidebar
        onPresetSelect={handlePresetSelect}
        onSavedDateSelect={handleSavedDateSelect}
        currentSelection={createSelection(
          startDateUtc,
          endDateUtc,
          unit,
          excludedWeekdays,
          excludeApplied,
          excludeFilterTypes,
          excludedSpecificDates,
          excludedSavedDates,
          excludedDateRanges
        )}
        themeColors={themeColors}
        disabled={excludeEnabled}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-6 pt-6 overflow-y-auto flex-1">
          {/* Unit Tabs */}
          <div className="flex gap-2 mb-4">
            {(["day", "week", "month", "quarter"] as DateRangeUnit[]).map(
              (u) => (
                <button
                  key={u}
                  onClick={() => handleUnitChange(u)}
                  disabled={excludeEnabled}
                  className={`px-4 py-2 rounded-lg text-sm font-light transition-colors ${
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
              )
            )}
          </div>

          {/* Date Inputs Row */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label
                className={`block text-xs font-medium mb-1 ${
                  excludeEnabled ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Start Date
              </label>
              <DateInput
                value={startDateUtc}
                onChange={handleStartDateChange}
                placeholder="DD/MM/YYYY"
                onFocus={() => setActiveDateField("start")}
                disabled={excludeEnabled}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 ${
                  activeDateField === "start"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-xs font-medium mb-1 ${
                  excludeEnabled ? "text-gray-400" : "text-gray-600"
                }`}
              >
                End Date
              </label>
              <DateInput
                value={endDateUtc}
                onChange={handleEndDateChange}
                placeholder="DD/MM/YYYY"
                onFocus={() => setActiveDateField("end")}
                disabled={excludeEnabled}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 ${
                  activeDateField === "end"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Duration
              </label>
              <div className="relative">
                <input
                  ref={durationInputRef}
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => handleDurationChange(Number(e.target.value))}
                  disabled={excludeEnabled}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 text-sm pointer-events-none ${
                    excludeEnabled ? "text-gray-300" : "text-gray-500"
                  }`}
                  style={{ left: `${unitPosition}px` }}
                >
                  {getUnitAbbreviation(unit)}
                </span>
              </div>
            </div>
          </div>

          {/* Future Date Warning */}
          {hasFutureDates && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{getFutureDateWarning()}</p>
            </div>
          )}

          {/* Exclude Filter */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="exclude-checkbox"
                  checked={excludeEnabled}
                  onChange={(e) => handleExcludeToggle(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="exclude-checkbox"
                  className="text-sm text-gray-700"
                >
                  {!excludeEnabled ? "exclude dates from selection" : "exclude"}
                </label>
              </div>

              {excludeEnabled && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => handleExcludeFilterButtonClick("days")}
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
                          <div className="absolute right-0 mt-2 z-20">
                            <div className="flex flex-col gap-3 px-2 py-2 bg-white border border-gray-200 rounded-xl shadow-xl">
                              <div className="flex justify-center">
                                <div className="inline-flex flex-col items-center gap-2 ">
                                  {WEEKDAY_LABELS.map((day) => {
                                    const isSelected =
                                      excludedWeekdays.includes(day.value);
                                    return (
                                      <button
                                        key={day.value}
                                        onClick={() => toggleWeekday(day.value)}
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
                        )}
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          handleExcludeFilterButtonClick("saved-dates")
                        }
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
                                    const isExcluded =
                                      excludedSavedDates.includes(saved.id);

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
                                              if (
                                                types.includes("saved-dates")
                                              ) {
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
                                  <span>
                                    {excludedSavedDates.length} selected
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleExcludeRemoveType("saved-dates")
                                  }
                                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={handleExcludeCancel}
                      className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleExcludeSave}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}

              {!excludeEnabled && excludeApplied && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {excludeSavedStateRef.current.excludedWeekdays.length > 0 && (
                    <span>
                      Week Days (
                      {excludeSavedStateRef.current.excludedWeekdays.length})
                    </span>
                  )}
                  {excludeSavedStateRef.current.excludedSavedDates.length >
                    0 && (
                    <span>
                      Saved Dates (
                      {excludeSavedStateRef.current.excludedSavedDates.length})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Specific Date filter UI temporarily disabled for redesign */}
            {/* Saved Dates Filter Content - Shown when icon clicked */}
            {/* Date Range filter UI temporarily disabled for redesign */}
          </div>

          {/* Calendar Views - Conditional based on unit */}
          <div className="flex gap-4 justify-center mb-4">
            {unit === "day" && (
              <div
                className={`flex gap-4 ${
                  excludeEnabled ? "excluded-enabled" : "excluded-disabled"
                }`}
              >
                {/* Check years view first, then months view, then default calendar */}
                {yearsViewIndex !== null ? (
                  yearsViewIndex === 0 ? (
                    // When yearsViewIndex === 0, show years grid on left and single calendar on right
                    <>
                      <div
                        className="w-full flex-shrink-0"
                        style={{ minWidth: "280px", maxWidth: "280px" }}
                      >
                        {renderYearsGrid(yearsViewDecade)}
                      </div>
                      <div ref={rightCalendarRef}>
                        dsdsdsdsd
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
                            const diff =
                              newMonth.getMonth() - prevMonth.getMonth();
                            if (diff !== 1 && diff !== -11) {
                              setDisplayedMonth(
                                startOfMonth(addMonths(date, -1))
                              );
                            }
                          }}
                          numberOfMonths={1}
                          disabled={dayPickerDisabledMatcher}
                          modifiersClassNames={{
                            selected: "rdp-day_selected bg-[#003DB8]",
                            disabled:
                              "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                            excludedWeekday: "rdp-day_excluded-weekday",
                          }}
                          classNames={{
                            chevron: "fill-black",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    // When yearsViewIndex === 1, show single calendar on left and years grid on right
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
                          }}
                          classNames={{
                            chevron: "fill-black",
                          }}
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
                  // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
                  <div ref={leftCalendarRef}>
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
                      modifiersClassNames={{
                        selected: "rdp-day_selected",
                        disabled: "rdp-day_disabled text-black",
                        excludedWeekday: "rdp-day_excluded-weekday",
                      }}
                      classNames={{
                        chevron: "fill-black",
                      }}
                      styles={{
                        month_grid: {
                          borderCollapse: "separate",
                          borderSpacing: "0 0.40rem",
                        },
                        cell: {
                          padding: "0.25rem 0",
                          backgroundClip: "content-box",
                        },
                      }}
                    />
                  </div>
                ) : monthsViewIndex === 0 ? (
                  // When monthsViewIndex === 0, show months grid on left and single calendar on right
                  <>
                    <div
                      className="w-full flex-shrink-0"
                      style={{ minWidth: "280px", maxWidth: "280px" }}
                    >
                      {renderMonthsGrid(monthsViewYear)}
                    </div>
                    <div ref={rightCalendarRef}>
                      dddd
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
                          const diff =
                            newMonth.getMonth() - prevMonth.getMonth();
                          if (diff !== 1 && diff !== -11) {
                            setDisplayedMonth(
                              startOfMonth(addMonths(date, -1))
                            );
                          }
                        }}
                        numberOfMonths={1}
                        disabled={dayPickerDisabledMatcher}
                        modifiersClassNames={{
                          selected: "rdp-day_selected bg-[#003DB8]",
                          disabled:
                            "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                          excludedWeekday: "rdp-day_excluded-weekday",
                        }}
                        classNames={{
                          chevron: "fill-black",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  // When monthsViewIndex === 1, show single calendar on left and months grid on right
                  <>
                    <div ref={leftCalendarRef}>
                      dsds
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
                        }}
                        classNames={{
                          chevron: "fill-black",
                        }}
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
                disabled={(date) => {
                  if (excludeEnabled) return true;
                  const isFutureDate =
                    !ALLOW_FUTURE_DATES && formatUtc(date) > today;

                  const isWeekdayExcluded =
                    excludeEnabled &&
                    excludeFilterTypes.includes("days") &&
                    excludedWeekdays.includes(date.getDay());

                  const isInExcludedSavedDate =
                    excludeEnabled &&
                    excludeFilterTypes.includes("saved-dates") &&
                    excludedSavedDates.some((savedId) => {
                      const saved = savedDatesForFilter.find(
                        (s) => s.id === savedId
                      );
                      if (!saved) return false;
                      const dateStr = formatUtc(date);
                      const isInRange =
                        dateStr >= saved.selection.startDateUtc &&
                        dateStr <= saved.selection.endDateUtc;
                      if (!isInRange) return false;
                      if (
                        saved.selection.excludedWeekdays &&
                        saved.selection.excludedWeekdays.length > 0 &&
                        saved.selection.excludedWeekdays.includes(date.getDay())
                      ) {
                        return true;
                      }
                      if (
                        saved.selection.excludedSpecificDates &&
                        saved.selection.excludedSpecificDates.length > 0 &&
                        saved.selection.excludedSpecificDates.includes(dateStr)
                      ) {
                        return true;
                      }
                      if (saved.selection.excludedSavedDates) {
                        const isInExcludedSaved =
                          saved.selection.excludedSavedDates.some(
                            (excludedSavedId) => {
                              const excludedSaved = savedDatesForFilter.find(
                                (s) => s.id === excludedSavedId
                              );
                              if (!excludedSaved) return false;
                              return (
                                dateStr >=
                                  excludedSaved.selection.startDateUtc &&
                                dateStr <= excludedSaved.selection.endDateUtc
                              );
                            }
                          );
                        if (isInExcludedSaved) return true;
                      }
                      let isInExcludedRange = false;
                      if (saved.selection.excludedDateRanges) {
                        isInExcludedRange =
                          saved.selection.excludedDateRanges.some(
                            (range) =>
                              dateStr >= range.start && dateStr <= range.end
                          );
                        if (isInExcludedRange) return true;
                      }
                      return false;
                    });

                  return (
                    isFutureDate || isWeekdayExcluded || isInExcludedSavedDate
                  );
                }}
                modifiersClassNames={{
                  selected: "rdp-day_selected bg-[#003DB8]",
                  disabled:
                    "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                  excludedWeekday: "rdp-day_excluded-weekday",
                }}
                classNames={{
                  chevron: "fill-black",
                }}
                styles={{
                  month_grid: {
                    borderCollapse: "separate",
                    borderSpacing: "0 0.40rem",
                  },
                  cell: {
                    padding: "0.25rem 0",
                    backgroundClip: "content-box",
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
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200">
          <button
            onClick={handleToday}
            disabled={excludeEnabled}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              excludeEnabled
                ? "text-blue-300 cursor-not-allowed bg-transparent"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            Today
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              disabled={excludeEnabled}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                excludeEnabled
                  ? "text-gray-300 cursor-not-allowed bg-gray-100/40"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Clear dates
            </button>
            <button
              onClick={onCancel}
              disabled={excludeEnabled}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                excludeEnabled
                  ? "text-gray-300 cursor-not-allowed bg-gray-100/40"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={Boolean(
                excludeEnabled || hasEmptyDates || hasFutureDates
              )}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                excludeEnabled || hasEmptyDates || hasFutureDates
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
