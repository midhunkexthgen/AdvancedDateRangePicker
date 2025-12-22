import { DateRangeUnit } from '../../types/dateRange';
interface DateInputsRowProps {
    startDateUtc: string;
    endDateUtc: string;
    duration: number;
    unit: DateRangeUnit;
    selectedUnit?: DateRangeUnit;
    excludeEnabled: boolean;
    activeDateField: "start" | "end";
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onDurationChange: (value: number) => void;
    onActiveFieldChange: (field: "start" | "end") => void;
    endFieldError: boolean;
    setEndFieldError: (hasError: boolean) => void;
    startFieldError: boolean;
    setStartFieldError: (hasError: boolean) => void;
}
export default function DateInputsRow({ startDateUtc, endDateUtc, duration, unit, selectedUnit, excludeEnabled, activeDateField, onStartDateChange, onEndDateChange, onDurationChange, onActiveFieldChange, endFieldError, setEndFieldError, startFieldError, setStartFieldError, }: DateInputsRowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DateInputsRow.d.ts.map