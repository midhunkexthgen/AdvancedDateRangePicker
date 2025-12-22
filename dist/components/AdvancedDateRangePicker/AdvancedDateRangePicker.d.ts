import { DateRangeSelection } from '../../types/dateRange';
interface AdvancedDateRangePickerProps {
    initialSelection?: Partial<DateRangeSelection>;
    onApply: (selection: DateRangeSelection) => void;
    onCancel: () => void;
    themeColors?: {
        background?: string;
        surface?: string;
        surfaceSecondary?: string;
        text?: string;
        textSecondary?: string;
        textMuted?: string;
        border?: string;
        primary?: string;
        primaryHover?: string;
        secondary?: string;
        accent?: string;
        error?: string;
        warning?: string;
        success?: string;
    };
}
export default function AdvancedDateRangePicker({ initialSelection, onApply, onCancel, themeColors, }: AdvancedDateRangePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AdvancedDateRangePicker.d.ts.map