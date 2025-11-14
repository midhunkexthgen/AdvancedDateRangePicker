import { DateRange, Matcher } from 'react-day-picker';
import { DateRangeSelection, DateRangeUnit, SavedDateRange } from '../../types/dateRange';
import { SupportedExcludeFilterType } from './constants';
type LegacyExcludeFilterType = "specific-date" | "date-range";
type AnyExcludeFilterType = SupportedExcludeFilterType | LegacyExcludeFilterType;
interface ExcludeSavedState {
    excludeFilterTypes: AnyExcludeFilterType[];
    excludedWeekdays: number[];
    excludedSpecificDates: string[];
    excludedSavedDates: string[];
    excludedDateRanges: Array<{
        id: string;
        start: string;
        end: string;
    }>;
}
interface UseAdvancedDateRangeStateParams {
    initialSelection?: Partial<DateRangeSelection>;
    onApply: (selection: DateRangeSelection) => void;
}
export declare function useAdvancedDateRangeState({ initialSelection, onApply, }: UseAdvancedDateRangeStateParams): {
    today: string;
    unit: DateRangeUnit;
    startDateUtc: string;
    endDateUtc: string;
    activeDateField: "start" | "end";
    duration: number;
    excludedWeekdays: number[];
    excludedSpecificDates: string[];
    excludeEnabled: boolean;
    excludeFilterTypes: SupportedExcludeFilterType[];
    activeFilterView: SupportedExcludeFilterType | null;
    excludedSavedDates: string[];
    savedDatesSearchTerm: string;
    excludedDateRanges: {
        id: string;
        start: string;
        end: string;
    }[];
    savedDatesForFilter: SavedDateRange[];
    displayedMonth: Date;
    monthsViewIndex: number | null;
    monthsViewYear: number;
    yearsViewIndex: number | null;
    yearsViewDecade: number;
    excludeApplied: boolean;
    hasFutureDates: boolean;
    hasEmptyDates: boolean;
    dayPickerModifiers: Record<string, Matcher | Matcher[] | ((date: Date) => boolean)>;
    selectedRange: DateRange;
    todayDateObj: Date;
    monthQuarterRange: {
        from: Date;
        to: Date;
    };
    filteredSavedDates: SavedDateRange[];
    dayPickerDisabledMatcher: (date: Date) => boolean;
    getFutureDateWarning: () => "Start date and end date cannot be in the future." | "Start date cannot be in the future." | "End date cannot be in the future." | null;
    setActiveDateField: import('react').Dispatch<import('react').SetStateAction<"start" | "end">>;
    setSavedDatesSearchTerm: import('react').Dispatch<import('react').SetStateAction<string>>;
    setMonthsViewIndex: import('react').Dispatch<import('react').SetStateAction<number | null>>;
    setYearsViewIndex: import('react').Dispatch<import('react').SetStateAction<number | null>>;
    setYearsViewDecade: import('react').Dispatch<import('react').SetStateAction<number>>;
    setMonthsViewYear: import('react').Dispatch<import('react').SetStateAction<number>>;
    setDisplayedMonth: import('react').Dispatch<import('react').SetStateAction<Date>>;
    handleStartDateChange: (value: string) => void;
    handleEndDateChange: (value: string) => void;
    handleDurationChange: (value: number) => void;
    handleUnitChange: (newUnit: DateRangeUnit) => void;
    handlePresetSelect: (startDate: string, endDate: string) => void;
    handleSavedDateSelect: (selection: DateRangeSelection) => void;
    handleToday: () => void;
    handleClear: () => void;
    handleApply: () => void;
    handleCalendarSelect: (range: {
        from?: Date;
        to?: Date;
    } | undefined) => void;
    handleResetCalendarSelect: (range: {
        from?: Date;
        to?: Date;
    } | undefined, dayPickerProps: Date) => void;
    handleWeekCalendarSelect: (range: {
        from?: Date;
        to?: Date;
    } | undefined, dayPickerProps: Date) => void;
    handleExcludeToggle: (checked: boolean) => void;
    handleExcludeFilterButtonClick: (type: SupportedExcludeFilterType) => void;
    handleExcludeRemoveType: (type: SupportedExcludeFilterType) => void;
    handleExcludeCancel: () => void;
    handleExcludeSave: () => void;
    toggleWeekday: (day: number) => void;
    setExcludedSavedDates: import('react').Dispatch<import('react').SetStateAction<string[]>>;
    setExcludeFilterTypes: import('react').Dispatch<import('react').SetStateAction<SupportedExcludeFilterType[]>>;
    setActiveFilterView: import('react').Dispatch<import('react').SetStateAction<SupportedExcludeFilterType | null>>;
    excludeSavedStateRef: import('react').RefObject<ExcludeSavedState>;
    sanitizeExcludeFilterTypes: (types: AnyExcludeFilterType[]) => SupportedExcludeFilterType[];
    handleMonthSelect: (year: number, monthIndex: number) => void;
    handleYearSelect: (year: number) => void;
};
export {};
//# sourceMappingURL=useAdvancedDateRangeState.d.ts.map