import { Dispatch, SetStateAction } from 'react';
import { SavedDateRange } from '../../types/dateRange';
import { SupportedExcludeFilterType } from './constants';
interface ExcludeFiltersProps {
    excludeEnabled: boolean;
    excludeFilterTypes: SupportedExcludeFilterType[];
    activeFilterView: SupportedExcludeFilterType | null;
    excludedWeekdays: number[];
    excludedSavedDates: string[];
    savedDatesSearchTerm: string;
    filteredSavedDates: SavedDateRange[];
    savedDatesForFilter: SavedDateRange[];
    onExcludeToggle: (checked: boolean) => void;
    onFilterButtonClick: (type: SupportedExcludeFilterType) => void;
    onRemoveFilterType: (type: SupportedExcludeFilterType) => void;
    onCancel: () => void;
    onSave: () => void;
    onToggleWeekday: (day: number) => void;
    setSavedDatesSearchTerm: (value: string) => void;
    setExcludedSavedDates: Dispatch<SetStateAction<string[]>>;
    setExcludeFilterTypes: Dispatch<SetStateAction<SupportedExcludeFilterType[]>>;
    setActiveFilterView: Dispatch<SetStateAction<SupportedExcludeFilterType | null>>;
}
export default function ExcludeFilters({ excludeEnabled, excludeFilterTypes, activeFilterView, excludedWeekdays, excludedSavedDates, savedDatesSearchTerm, filteredSavedDates, onExcludeToggle, onFilterButtonClick, onRemoveFilterType, onCancel, onSave, onToggleWeekday, setSavedDatesSearchTerm, setExcludedSavedDates, setExcludeFilterTypes, setActiveFilterView, savedDatesForFilter, }: ExcludeFiltersProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ExcludeFilters.d.ts.map