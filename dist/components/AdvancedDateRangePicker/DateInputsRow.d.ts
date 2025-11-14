import { DateRangeUnit } from '../../types/dateRange';
interface DateInputsRowProps {
    startDateUtc: string;
    endDateUtc: string;
    duration: number;
    unit: DateRangeUnit;
    excludeEnabled: boolean;
    activeDateField: "start" | "end";
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onDurationChange: (value: number) => void;
    onActiveFieldChange: (field: "start" | "end") => void;
}
export default function DateInputsRow({ startDateUtc, endDateUtc, duration, unit, excludeEnabled, activeDateField, onStartDateChange, onEndDateChange, onDurationChange, onActiveFieldChange, }: DateInputsRowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DateInputsRow.d.ts.map