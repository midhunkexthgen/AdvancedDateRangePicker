import { DateRangeUnit, DateRangeSelection } from '../types/dateRange';
/**
 * Parse a date string (yyyy-MM-dd) as UTC
 */
export declare function parseUtc(dateStr: string): Date;
/**
 * Format a Date as yyyy-MM-dd (date only, no timezone conversion)
 */
export declare function formatUtc(date: Date): string;
/**
 * Get today's date in local timezone as yyyy-MM-dd
 */
export declare function getTodayUtc(): string;
/**
 * Add units to a date in UTC
 */
export declare function addUnitUtc(dateStr: string, unit: DateRangeUnit, amount: number): string;
/**
 * Calculate the end date from start, duration, and excluded weekdays
 * For day unit, we count only included days
 */
export declare function calcEndFromDuration(startDateUtc: string, unit: DateRangeUnit, duration: number, excludedWeekdays: number[]): string;
/**
 * Calculate the start date from end date, duration, and excluded weekdays
 * For day unit, we count only included days (working backwards)
 */
export declare function calcStartFromDuration(endDateUtc: string, unit: DateRangeUnit, duration: number, excludedWeekdays: number[]): string;
/**
 * Calculate duration from start and end dates
 */
export declare function calcDurationFromRange(startDateUtc: string, endDateUtc: string, unit: DateRangeUnit, excludedWeekdays: number[]): number;
/**
 * Enumerate all included dates (excluding specified weekdays)
 */
export declare function enumerateIncludedDates(startDateUtc: string, endDateUtc: string, excludedWeekdays: number[]): string[];
/**
 * Create a complete DateRangeSelection from start and end dates
 */
export declare function createSelection(startDateUtc: string, endDateUtc: string, unit?: DateRangeUnit, excludedWeekdays?: number[], excludeEnabled?: boolean, excludeFilterTypes?: ("days" | "specific-date" | "saved-dates" | "date-range")[], excludedSpecificDates?: string[], excludedSavedDates?: string[], excludedDateRanges?: Array<{
    id: string;
    start: string;
    end: string;
}>): DateRangeSelection;
/**
 * Convert YYYY-MM-DD to DD/MM/YYYY
 */
export declare function formatDisplayDate(dateStr: string): string;
/**
 * Convert DD/MM/YYYY to YYYY-MM-DD
 */
export declare function parseDisplayDate(displayStr: string): string | null;
/**
 * Get unit abbreviation
 */
export declare function getUnitAbbreviation(unit: DateRangeUnit): string;
/**
 * Format a date range label intelligently based on the start and end dates
 * - Single date: "Feb 22, 2025"
 * - Same month range: "Feb 12-14, 2025"
 * - Different months, same year: "Feb 20 - Nov 18, 2025"
 * - Different years: "Mar 6, 2024 - May 19, 2025"
 */
export declare function formatDateRangeLabel(startStr: string, endStr: string): string;
/**
 * Get preset date ranges
 */
export declare function getPresets(): {
    today: {
        label: string;
        getValue: () => {
            startDateUtc: string;
            endDateUtc: string;
        };
    };
    yesterday: {
        label: string;
        getValue: () => {
            startDateUtc: string;
            endDateUtc: string;
        };
    };
    thisWeek: {
        label: string;
        getValue: () => {
            startDateUtc: string;
            endDateUtc: string;
        };
    };
    monthToDate: {
        label: string;
        getValue: () => {
            startDateUtc: string;
            endDateUtc: string;
        };
    };
    yearToDate: {
        label: string;
        getValue: () => {
            startDateUtc: string;
            endDateUtc: string;
        };
    };
};
//# sourceMappingURL=dateRange.d.ts.map