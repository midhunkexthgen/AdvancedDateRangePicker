import { DateRangeSelection } from '../../types/dateRange';
interface PresetSidebarProps {
    onPresetSelect: (startDate: string, endDate: string) => void;
    onSavedDateSelect?: (selection: DateRangeSelection) => void;
    currentSelection: DateRangeSelection;
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
    disabled?: boolean;
}
export default function PresetSidebar({ onPresetSelect, onSavedDateSelect, currentSelection, themeColors, disabled, }: PresetSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PresetSidebar.d.ts.map