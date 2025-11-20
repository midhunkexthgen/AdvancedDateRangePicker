import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import type { DateRange, Matcher } from "react-day-picker";
import {
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfWeek,
  addDays,
  getYear,
  getMonth,
  setMonth,
  setYear,
} from "date-fns";
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
} from "../../utils/dateRange";
import {
  ALLOW_FUTURE_DATES,
  WEEK_STARTS_ON,
  WEEK_NUMBERING_MODE,
} from "../../config/dateConfig";
import { storageService } from "../../services/storageService";
import type { SupportedExcludeFilterType } from "./constants";
type LegacyExcludeFilterType = "specific-date" | "date-range";
type AnyExcludeFilterType =
  | SupportedExcludeFilterType
  | LegacyExcludeFilterType;

interface ExcludeSavedState {
  excludeFilterTypes: AnyExcludeFilterType[];
  excludedWeekdays: number[];
  excludedSpecificDates: string[];
  excludedSavedDates: string[];
  excludedDateRanges: Array<{ id: string; start: string; end: string }>;
}

interface UseAdvancedDateRangeStateParams {
  initialSelection?: Partial<DateRangeSelection>;
  onApply: (selection: DateRangeSelection) => void;
}

export function useAdvancedDateRangeState({
  initialSelection,
  onApply,
}: UseAdvancedDateRangeStateParams) {
  const today = getTodayUtc();

  const initialSupportedExcludeFilterTypes: SupportedExcludeFilterType[] = (
    initialSelection?.excludeFilterTypes || []
  ).filter(
    (type): type is SupportedExcludeFilterType =>
      type === "days" || type === "saved-dates" || type === "date-range"
  );

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
  const [excludeSelectionStart, setExcludeSelectionStart] = useState<
    string | null
  >(null);

  const [excludedWeekdays, setExcludedWeekdays] = useState<number[]>(
    initialSelection?.excludedWeekdays || []
  );
  const [excludedSpecificDates, setExcludedSpecificDates] = useState<string[]>(
    initialSelection?.excludedSpecificDates || []
  );
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

  const excludeSavedStateRef = useRef<ExcludeSavedState>({
    excludeFilterTypes: initialSupportedExcludeFilterTypes,
    excludedWeekdays: initialSelection?.excludedWeekdays || [],
    excludedSpecificDates: initialSelection?.excludedSpecificDates || [],
    excludedSavedDates: initialSelection?.excludedSavedDates || [],
    excludedDateRanges: initialSelection?.excludedDateRanges || [],
  });

  const [savedDatesForFilter, setSavedDatesForFilter] = useState<
    SavedDateRange[]
  >([]);

  const [tempExcludedRange, setTempExcludedRange] = useState<
    DateRange | undefined
  >(undefined);

  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => {
    if (initialSelection?.startDateUtc) {
      return startOfMonth(parseUtc(initialSelection.startDateUtc));
    }
    return startOfMonth(parseUtc(today));
  });

  const [monthsViewIndex, setMonthsViewIndex] = useState<number | null>(null);
  const [monthsViewYear, setMonthsViewYear] = useState<number>(() => {
    if (initialSelection?.startDateUtc) {
      return getYear(parseUtc(initialSelection.startDateUtc));
    }
    return getYear(parseUtc(today));
  });

  const [yearsViewIndex, setYearsViewIndex] = useState<number | null>(null);
  const [yearsViewDecade, setYearsViewDecade] = useState<number>(() => {
    if (initialSelection?.startDateUtc) {
      const year = getYear(parseUtc(initialSelection.startDateUtc));
      return Math.floor(year / 10) * 10;
    }
    const currentYear = getYear(parseUtc(today));
    return Math.floor(currentYear / 10) * 10;
  });

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

  useEffect(() => {
    if (monthsViewIndex === null) {
      setMonthsViewYear(getYear(displayedMonth));
    }
  }, [displayedMonth, monthsViewIndex]);

  useEffect(() => {
    if (activeFilterView !== "saved-dates") {
      setSavedDatesSearchTerm("");
    }
  }, [activeFilterView]);

  const isDateExcludedBySavedDates = useCallback(
    (date: Date): boolean => {
      if (excludedSavedDates.length === 0) return false;

      const dateStr = formatUtc(date);

      return excludedSavedDates.some((savedId) => {
        const saved = savedDatesForFilter.find((s) => s.id === savedId);
        if (!saved) return false;

        const inRange =
          dateStr >= saved.selection.startDateUtc &&
          dateStr <= saved.selection.endDateUtc;
        if (!inRange) return false;

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
          const inExcludedSaved = saved.selection.excludedSavedDates.some(
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
          if (inExcludedSaved) return true;
        }

        if (saved.selection.excludedDateRanges) {
          const inExcludedRange = saved.selection.excludedDateRanges.some(
            (range) => dateStr >= range.start && dateStr <= range.end
          );
          if (inExcludedRange) return true;
        }

        // Highlight the full saved date range by default.
        return true;
      });
    },
    [excludedSavedDates, savedDatesForFilter]
  );
  const dayPickerModifiers = useMemo(() => {
    const modifiers: Record<
      string,
      Matcher | Matcher[] | ((date: Date) => boolean)
    > = {};

    if (excludedWeekdays.length > 0) {
      modifiers.excludedWeekday = {
        dayOfWeek: excludedWeekdays,
      };
    }

    if (excludedSavedDates.length > 0) {
      modifiers["excluded-saved-date"] = isDateExcludedBySavedDates;
    }

    if (excludedSpecificDates.length > 0) {
      modifiers["excluded-specific-date"] = (date) =>
        excludedSpecificDates.includes(formatUtc(date));
    }

    if (excludedDateRanges.length > 0) {
      modifiers["excluded-range"] = (date) => {
        const d = formatUtc(date);
        return excludedDateRanges.some(
          (range) => d >= range.start && d <= range.end
        );
      };
    }

    if (excludeSelectionStart) {
      modifiers["exclude-range-start"] = (date) =>
        formatUtc(date) === excludeSelectionStart;
    }

    return modifiers;
  }, [
    excludedSavedDates,
    excludedWeekdays,
    isDateExcludedBySavedDates,
    excludedSpecificDates,
    excludedDateRanges,
    excludeSelectionStart,
  ]);

  const selectedRange: DateRange = useMemo(
    () => ({
      from: startDateUtc ? parseUtc(startDateUtc) : undefined,
      to: endDateUtc ? parseUtc(endDateUtc) : undefined,
    }),
    [startDateUtc, endDateUtc]
  );

  const todayDateObj = useMemo(() => parseUtc(today), [today]);

  const monthQuarterRange = useMemo<{ from: Date; to: Date }>(
    () => ({
      from: startDateUtc ? parseUtc(startDateUtc) : todayDateObj,
      to: endDateUtc ? parseUtc(endDateUtc) : todayDateObj,
    }),
    [endDateUtc, startDateUtc, todayDateObj]
  );

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

  const hasEmptyDates = useMemo(
    () =>
      Boolean(
        !startDateUtc ||
          startDateUtc.trim() === "" ||
          !endDateUtc ||
          endDateUtc.trim() === ""
      ),
    [endDateUtc, startDateUtc]
  );

  const hasFutureDates = useMemo(() => {
    if (ALLOW_FUTURE_DATES || !startDateUtc || !endDateUtc) {
      return false;
    }
    return startDateUtc > today || endDateUtc > today;
  }, [endDateUtc, startDateUtc, today]);

  const sanitizeExcludeFilterTypes = useCallback(
    (types: AnyExcludeFilterType[]): SupportedExcludeFilterType[] =>
      types.filter(
        (type): type is SupportedExcludeFilterType =>
          type === "days" || type === "saved-dates" || type === "date-range"
      ),
    []
  );

  const handleExcludeToggle = useCallback(
    (checked: boolean) => {
      if (checked) {
        setExcludeEnabled(true);
        setUnit("day");
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
        setExcludeSelectionStart(null);
      }
    },
    [sanitizeExcludeFilterTypes]
  );

  const handleExcludeFilterButtonClick = useCallback(
    (type: SupportedExcludeFilterType) => {
      if (!excludeEnabled) return;

      if (!excludeFilterTypes.includes(type)) {
        setExcludeFilterTypes([...excludeFilterTypes, type]);
      }

      setActiveFilterView((prev) => (prev === type ? null : type));
    },
    [excludeEnabled, excludeFilterTypes]
  );

  const handleExcludeRemoveType = useCallback(
    (type: SupportedExcludeFilterType) => {
      if (!excludeEnabled) return;

      const nextTypes = excludeFilterTypes.filter((t) => t !== type);
      setExcludeFilterTypes(nextTypes);

      if (type === "days") {
        setExcludedWeekdays([]);
      }
      if (type === "saved-dates") {
        setExcludedSavedDates([]);
      }
      if (type === "date-range") {
        setExcludedDateRanges([]);
      }

      if (activeFilterView === type) {
        const fallback = nextTypes.find(
          (t) => t === "days" || t === "saved-dates"
        );
        setActiveFilterView(
          (fallback as SupportedExcludeFilterType | null) ?? null
        );
      }
    },
    [activeFilterView, excludeEnabled, excludeFilterTypes]
  );

  const handleExcludeCancel = useCallback(() => {
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
    setExcludeSelectionStart(null);
  }, [sanitizeExcludeFilterTypes]);

  const handleExcludeSave = useCallback(() => {
    const includeWeekDays = excludedWeekdays.length > 0;
    const includeSavedDates = excludedSavedDates.length > 0;
    const includeDateRanges = excludedDateRanges.length > 0;
    const includeSpecificDates = excludedSpecificDates.length > 0;

    const nextTypes: AnyExcludeFilterType[] = [];
    if (includeWeekDays) {
      nextTypes.push("days");
    }
    if (includeSavedDates) {
      nextTypes.push("saved-dates");
    }
    if (includeDateRanges) {
      nextTypes.push("date-range");
    }
    if (includeSpecificDates) {
      nextTypes.push("specific-date");
    }

    const nextWeekdays = includeWeekDays ? [...excludedWeekdays] : [];
    const nextSpecificDates = includeSpecificDates
      ? [...excludedSpecificDates]
      : [];
    const nextSavedDates = includeSavedDates ? [...excludedSavedDates] : [];
    const nextDateRanges = includeDateRanges ? [...excludedDateRanges] : [];

    excludeSavedStateRef.current = {
      excludeFilterTypes: nextTypes,
      excludedWeekdays: nextWeekdays,
      excludedSpecificDates: nextSpecificDates,
      excludedSavedDates: nextSavedDates,
      excludedDateRanges: nextDateRanges,
    };

    // We only set SupportedExcludeFilterType to state because 'specific-date' is legacy/internal
    // and doesn't have a filter button.
    const supportedTypes = sanitizeExcludeFilterTypes(nextTypes);
    setExcludeFilterTypes(supportedTypes);

    setExcludedWeekdays(nextWeekdays);
    setExcludedSpecificDates(nextSpecificDates);
    setExcludedSavedDates(nextSavedDates);
    setExcludedDateRanges(nextDateRanges);
    setExcludeApplied(nextTypes.length > 0);
    setExcludeEnabled(false);
    setActiveFilterView(null);
    setExcludeSelectionStart(null);
  }, [
    excludedDateRanges,
    excludedSavedDates,
    excludedWeekdays,
    excludedSpecificDates,
    sanitizeExcludeFilterTypes,
  ]);

  const toggleWeekday = useCallback(
    (day: number) => {
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
    },
    [excludeEnabled]
  );

  const updateDisplayedMonth = useCallback((value?: string) => {
    if (value) {
      setDisplayedMonth(startOfMonth(parseUtc(value)));
    }
  }, []);

  const handleStartDateChange = useCallback(
    (value: string) => {
      if (excludeEnabled) return;
      setStartDateUtc(value);
      if (value) {
        if (!endDateUtc) {
          setActiveDateField("end");
        }
      } else {
        setActiveDateField("start");
      }
      if (value && endDateUtc && parseUtc(value) > parseUtc(endDateUtc)) {
        setEndDateUtc(value);
      }
      updateDisplayedMonth(value);
    },
    [endDateUtc, excludeEnabled, updateDisplayedMonth]
  );

  const handleEndDateChange = useCallback(
    (value: string) => {
      if (excludeEnabled) return;
      setEndDateUtc(value);
      if (value) {
        if (!startDateUtc) {
          setActiveDateField("start");
        }
      } else {
        setActiveDateField("end");
      }
      if (value && startDateUtc && parseUtc(value) < parseUtc(startDateUtc)) {
        setStartDateUtc(value);
      }
      updateDisplayedMonth(value);
    },
    [excludeEnabled, startDateUtc, updateDisplayedMonth]
  );

  const handleDurationChange = useCallback(
    (value: number) => {
      if (excludeEnabled || value <= 0) return;
      setDuration(value);

      if (startDateUtc) {
        const newEndDate = calcEndFromDuration(
          startDateUtc,
          unit,
          value,
          excludedWeekdays
        );
        setEndDateUtc(newEndDate);
        updateDisplayedMonth(newEndDate);
      } else if (endDateUtc) {
        const newStartDate = calcStartFromDuration(
          endDateUtc,
          unit,
          value,
          excludedWeekdays
        );
        setStartDateUtc(newStartDate);
        updateDisplayedMonth(newStartDate);
      }
      setActiveDateField("start");
    },
    [
      endDateUtc,
      excludeEnabled,
      excludedWeekdays,
      startDateUtc,
      unit,
      updateDisplayedMonth,
    ]
  );

  const handleUnitChange = useCallback(
    (newUnit: DateRangeUnit) => {
      if (excludeEnabled) return;
      setUnit(newUnit);

      if ((newUnit === "day" || newUnit === "week") && startDateUtc) {
        setDisplayedMonth(startOfMonth(parseUtc(startDateUtc)));
      }
    },
    [excludeEnabled, startDateUtc]
  );

  const handlePresetSelect = useCallback(
    (startDate: string, endDate: string) => {
      if (excludeEnabled) return;
      setStartDateUtc(startDate);
      setEndDateUtc(endDate);
      setActiveDateField("start");
      updateDisplayedMonth(startDate);
    },
    [excludeEnabled, updateDisplayedMonth]
  );

  const handleSavedDateSelect = useCallback(
    (selection: DateRangeSelection) => {
      if (excludeEnabled) return;
      setStartDateUtc(selection.startDateUtc);
      setEndDateUtc(selection.endDateUtc);
      setUnit(selection.unit);
      const restoredWeekdays = selection.excludedWeekdays || [];
      setExcludedWeekdays(restoredWeekdays);
      setDuration(selection.duration);
      setActiveDateField("start");

      const restoredTypes = (selection.excludeFilterTypes || []).filter(
        (type): type is SupportedExcludeFilterType =>
          type === "days" || type === "saved-dates" || type === "date-range"
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

      if (selection.startDateUtc) {
        updateDisplayedMonth(selection.startDateUtc);
      }
    },
    [excludeEnabled, updateDisplayedMonth]
  );

  const handleToday = useCallback(() => {
    if (excludeEnabled) return;
    setStartDateUtc(today);
    setEndDateUtc(today);
    setExcludedWeekdays([]);
    setActiveDateField("start");
    updateDisplayedMonth(today);
  }, [excludeEnabled, today, updateDisplayedMonth]);

  const handleClear = useCallback(() => {
    if (excludeEnabled) return;
    setStartDateUtc("");
    setEndDateUtc("");
    setDuration(1);
    setExcludedWeekdays([]);
    setActiveDateField("start");

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

    updateDisplayedMonth(today);
  }, [excludeEnabled, today, updateDisplayedMonth]);

  const handleApply = useCallback(() => {
    if (excludeEnabled || hasEmptyDates || hasFutureDates) return;

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
  }, [
    endDateUtc,
    excludeApplied,
    excludeEnabled,
    excludeFilterTypes,
    excludedDateRanges,
    excludedSavedDates,
    excludedSpecificDates,
    excludedWeekdays,
    hasEmptyDates,
    hasFutureDates,
    onApply,
    startDateUtc,
    unit,
  ]);

  const handleCalendarSelect = useCallback(
    (range: { from?: Date; to?: Date } | undefined) => {
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
    },
    [excludeEnabled]
  );

  const handleResetCalendarSelect = useCallback(
    (range: { from?: Date; to?: Date } | undefined, dayPickerProps: Date) => {
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
          if (
            parseUtc(startDateUtc).getTime() > parseUtc(nextStart).getTime()
          ) {
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
    },
    [activeDateField, endDateUtc, excludeEnabled, startDateUtc]
  );

  const handleWeekCalendarSelect = useCallback(
    (range: { from?: Date; to?: Date } | undefined, dayPickerProps: Date) => {
      if (excludeEnabled || !range) return;

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
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              weekEndFrom = addDays(weekStartFrom, 6);

              handleCalendarSelect({ from: weekStartFrom, to: weekEndFrom });
            } else if (
              parseUtc(formatUtc(dayPickerProps)).getTime() <
                parseUtc(endDateUtc).getTime() &&
              parseUtc(formatUtc(dayPickerProps)).getTime() <
                parseUtc(startDateUtc).getTime()
            ) {
              weekStartFrom = startOfWeek(dayPickerProps, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              weekEndFrom = addDays(weekStartFrom, 6);

              const weekStartTo = startOfWeek(endDateUtc, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
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
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              weekEndFrom = addDays(weekStartFrom, 6);

              const weekStartTo = startOfWeek(endDateUtc, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              const weekEndTo = addDays(weekStartTo, 6);
              handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
            } else {
              weekStartFrom = startOfWeek(dayPickerProps, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
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
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              weekEndFrom = addDays(weekStartFrom, 6);

              const weekStartTo = startOfWeek(dayPickerProps, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
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
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              weekEndFrom = addDays(weekStartFrom, 6);

              const weekStartTo = startOfWeek(startDateUtc, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              const weekEndTo = addDays(weekStartTo, 6);
              handleCalendarSelect({ from: weekStartFrom, to: weekEndTo });
            } else {
              weekStartFrom = startOfWeek(startDateUtc, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
              });
              weekEndFrom = addDays(weekStartFrom, 6);

              const weekStartTo = startOfWeek(dayPickerProps, {
                weekStartsOn:
                  WEEK_NUMBERING_MODE === "iso" ? 1 : WEEK_STARTS_ON,
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
    },
    [
      activeDateField,
      endDateUtc,
      excludeEnabled,
      handleCalendarSelect,
      startDateUtc,
    ]
  );

  const dayPickerDisabledMatcher = useCallback(
    (date: Date): boolean => {
      if (excludeEnabled) {
        if (!startDateUtc || !endDateUtc) return true;
        const current = formatUtc(date);
        return current < startDateUtc || current > endDateUtc;
      }
      const dateStr = formatUtc(date);

      const isFutureDate = !ALLOW_FUTURE_DATES && dateStr > today;

      const isWeekdayExcluded =
        excludeEnabled &&
        excludeFilterTypes.includes("days") &&
        excludedWeekdays.includes(date.getDay());

      const isInExcludedSavedDate =
        excludeEnabled &&
        excludeFilterTypes.includes("saved-dates") &&
        isDateExcludedBySavedDates(date);

      return isFutureDate || isWeekdayExcluded || isInExcludedSavedDate;
    },
    [
      excludeEnabled,
      excludeFilterTypes,
      excludedWeekdays,
      isDateExcludedBySavedDates,
      today,
      startDateUtc,
      endDateUtc,
    ]
  );

  const getFutureDateWarning = useCallback(() => {
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
  }, [endDateUtc, hasFutureDates, startDateUtc, today]);

  const handleMonthSelect = useCallback((year: number, monthIndex: number) => {
    const newDate = startOfMonth(
      setMonth(setYear(new Date(), year), monthIndex)
    );
    setDisplayedMonth(newDate);
    setMonthsViewIndex(null);
    setMonthsViewYear(year);
  }, []);

  const handleYearSelect = useCallback(
    (year: number) => {
      const currentMonth = getMonth(displayedMonth);
      const newDate = startOfMonth(
        setMonth(setYear(new Date(), year), currentMonth)
      );
      setDisplayedMonth(newDate);
      setYearsViewIndex(null);
      setYearsViewDecade(Math.floor(year / 10) * 10);
    },
    [displayedMonth]
  );

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!excludeEnabled) return;

      const dateStr = formatUtc(date);

      if (startDateUtc && endDateUtc) {
        if (dateStr < startDateUtc || dateStr > endDateUtc) return;
      }

      if (excludeSelectionStart) {
        // Second click: complete the range
        const start =
          dateStr < excludeSelectionStart ? dateStr : excludeSelectionStart;
        const end =
          dateStr < excludeSelectionStart ? excludeSelectionStart : dateStr;

        const newRange = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          start,
          end,
        };

        setExcludedDateRanges((current) => [...current, newRange]);
        setExcludeSelectionStart(null);

        // Also ensure 'date-range' filter type is active
        setExcludeFilterTypes((current) => {
          if (current.includes("date-range")) return current;
          return [...current, "date-range"];
        });
      } else {
        // First click: start selection
        setExcludeSelectionStart(dateStr);
      }
    },
    [excludeEnabled, startDateUtc, endDateUtc, excludeSelectionStart]
  );

  return {
    today,
    unit,
    startDateUtc,
    endDateUtc,
    activeDateField,
    duration,
    excludedWeekdays,
    excludedSpecificDates,
    excludeEnabled,
    excludeFilterTypes,
    activeFilterView,
    excludedSavedDates,
    savedDatesSearchTerm,
    excludedDateRanges,
    savedDatesForFilter,
    displayedMonth,
    monthsViewIndex,
    monthsViewYear,
    yearsViewIndex,
    yearsViewDecade,
    excludeApplied,
    hasFutureDates,
    hasEmptyDates,
    dayPickerModifiers,
    selectedRange,
    todayDateObj,
    monthQuarterRange,
    filteredSavedDates,
    dayPickerDisabledMatcher,
    getFutureDateWarning,
    setActiveDateField,
    setSavedDatesSearchTerm,
    setMonthsViewIndex,
    setYearsViewIndex,
    setYearsViewDecade,
    setMonthsViewYear,
    setDisplayedMonth,
    handleStartDateChange,
    handleEndDateChange,
    handleDurationChange,
    handleUnitChange,
    handlePresetSelect,
    handleSavedDateSelect,
    handleToday,
    handleClear,
    handleApply,
    handleCalendarSelect,
    handleResetCalendarSelect,
    handleWeekCalendarSelect,
    handleExcludeToggle,
    handleExcludeFilterButtonClick,
    handleExcludeRemoveType,
    handleExcludeCancel,
    handleExcludeSave,
    toggleWeekday,
    setExcludedSavedDates,
    setExcludedSpecificDates,
    setExcludedDateRanges,
    setExcludeFilterTypes,
    setActiveFilterView,
    excludeSavedStateRef,
    sanitizeExcludeFilterTypes,
    handleMonthSelect,
    handleYearSelect,
    handleDayClick,
    excludeSelectionStart,
  };
}
