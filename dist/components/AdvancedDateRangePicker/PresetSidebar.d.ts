import { DateRangeSelection } from '../../types/dateRange';
interface PresetSidebarProps {
    onPresetSelect: (startDate: string, endDate: string) => void;
    onSavedDateSelect?: (selection: DateRangeSelection) => void;
    currentSelection: DateRangeSelection;
}
export default function PresetSidebar({ onPresetSelect, onSavedDateSelect, currentSelection, }: PresetSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PresetSidebar.d.ts.map