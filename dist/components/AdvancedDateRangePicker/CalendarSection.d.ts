import { DateRange, Matcher } from 'react-day-picker';
import { DateRangeUnit } from '../../types/dateRange';
interface CalendarSectionProps {
    unit: DateRangeUnit;
    excludeEnabled: boolean;
    selectedRange: DateRange;
    displayedMonth: Date;
    setDisplayedMonth: (date: Date) => void;
    dayPickerModifiers: Record<string, Matcher | Matcher[] | ((date: Date) => boolean)>;
    dayPickerDisabledMatcher: (date: Date) => boolean;
    monthsViewIndex: number | null;
    setMonthsViewIndex: (value: number | null) => void;
    monthsViewYear: number;
    setMonthsViewYear: (value: number) => void;
    yearsViewIndex: number | null;
    setYearsViewIndex: (value: number | null) => void;
    yearsViewDecade: number;
    setYearsViewDecade: (value: number) => void;
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
    monthQuarterRange: {
        from: Date;
        to: Date;
    };
    activeDateField: "start" | "end";
    setActiveDateField: (field: "start" | "end") => void;
    onMonthSelect: (year: number, monthIndex: number) => void;
    onYearSelect: (year: number) => void;
    todayDateObj: Date;
}
export default function CalendarSection({ unit, excludeEnabled, selectedRange, displayedMonth, setDisplayedMonth, dayPickerModifiers, dayPickerDisabledMatcher, monthsViewIndex, setMonthsViewIndex, monthsViewYear, setMonthsViewYear, yearsViewIndex, setYearsViewIndex, yearsViewDecade, setYearsViewDecade, handleCalendarSelect, handleResetCalendarSelect, handleWeekCalendarSelect, monthQuarterRange, activeDateField, setActiveDateField, onMonthSelect, onYearSelect, todayDateObj, }: CalendarSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CalendarSection.d.ts.map