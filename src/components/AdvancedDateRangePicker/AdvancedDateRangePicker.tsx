import type { CSSProperties } from "react";
import "react-day-picker/dist/style.css";
import { AlertTriangle } from "lucide-react";
import type { DateRangeSelection } from "../../types/dateRange";
import { createSelection } from "../../utils/dateRange";
import PresetSidebar from "./PresetSidebar";
import DateInputsRow from "./DateInputsRow";
import UnitTabs from "./UnitTabs";
import ExcludeFilters from "./ExcludeFilters";
import CalendarSection from "./CalendarSection";
import FooterActions from "./FooterActions";
import { useAdvancedDateRangeState } from "./useAdvancedDateRangeState";
import { DEFAULT_PICKER_HEIGHT, DEFAULT_PICKER_WIDTH } from "./constants";

interface AdvancedDateRangePickerProps {
  initialSelection?: Partial<DateRangeSelection>;
  onApply: (selection: DateRangeSelection) => void;
  onCancel: () => void;
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
}

export default function AdvancedDateRangePicker({
  initialSelection,
  onApply,
  onCancel,
  themeColors,
}: AdvancedDateRangePickerProps) {
  const {
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
    savedDatesForFilter,
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
    setExcludeFilterTypes,
    setActiveFilterView,
    handleMonthSelect,
    handleYearSelect,
  } = useAdvancedDateRangeState({
    initialSelection,
    onApply,
  });

  const containerStyle: CSSProperties = {
    height: "auto",
    minHeight: DEFAULT_PICKER_HEIGHT,
    width: DEFAULT_PICKER_WIDTH,
    minWidth: DEFAULT_PICKER_WIDTH,
    maxWidth: DEFAULT_PICKER_WIDTH,
    overflow: "visible",
    ...themeColors,
  };

  const currentSelection = createSelection(
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

  const futureWarning = getFutureDateWarning();

  return (
    <div
      className="flex bg-white rounded-xl shadow-xl border border-gray-200"
      style={containerStyle}
    >
      <PresetSidebar
        onPresetSelect={handlePresetSelect}
        onSavedDateSelect={handleSavedDateSelect}
        currentSelection={currentSelection}
        themeColors={themeColors}
        disabled={excludeEnabled}
      />

      <div
        className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden"
        style={{ minWidth: "520px" }}
      >
        <div className="pt-4 flex-1 min-w-0 overflow-x-hidden">
          <UnitTabs
            unit={unit}
            excludeEnabled={excludeEnabled}
            onUnitChange={handleUnitChange}
          />

          <DateInputsRow
            startDateUtc={startDateUtc}
            endDateUtc={endDateUtc}
            duration={duration}
            unit={unit}
            excludeEnabled={excludeEnabled}
            activeDateField={activeDateField}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onDurationChange={handleDurationChange}
            onActiveFieldChange={setActiveDateField}
          />

          {hasFutureDates && futureWarning && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{futureWarning}</p>
            </div>
          )}

          <ExcludeFilters
            excludeEnabled={excludeEnabled}
            excludeFilterTypes={excludeFilterTypes}
            activeFilterView={activeFilterView}
            excludedWeekdays={excludedWeekdays}
            excludedSavedDates={excludedSavedDates}
            savedDatesSearchTerm={savedDatesSearchTerm}
            filteredSavedDates={filteredSavedDates}
            savedDatesForFilter={savedDatesForFilter}
            onExcludeToggle={handleExcludeToggle}
            onFilterButtonClick={handleExcludeFilterButtonClick}
            onRemoveFilterType={handleExcludeRemoveType}
            onCancel={handleExcludeCancel}
            onSave={handleExcludeSave}
            onToggleWeekday={toggleWeekday}
            setSavedDatesSearchTerm={setSavedDatesSearchTerm}
            setExcludedSavedDates={setExcludedSavedDates}
            setExcludeFilterTypes={setExcludeFilterTypes}
            setActiveFilterView={setActiveFilterView}
          />
          <CalendarSection
            unit={unit}
            excludeEnabled={excludeEnabled}
            selectedRange={selectedRange}
            displayedMonth={displayedMonth}
            setDisplayedMonth={setDisplayedMonth}
            dayPickerModifiers={dayPickerModifiers}
            dayPickerDisabledMatcher={dayPickerDisabledMatcher}
            monthsViewIndex={monthsViewIndex}
            setMonthsViewIndex={setMonthsViewIndex}
            monthsViewYear={monthsViewYear}
            setMonthsViewYear={setMonthsViewYear}
            yearsViewIndex={yearsViewIndex}
            setYearsViewIndex={setYearsViewIndex}
            yearsViewDecade={yearsViewDecade}
            setYearsViewDecade={setYearsViewDecade}
            handleCalendarSelect={handleCalendarSelect}
            handleResetCalendarSelect={handleResetCalendarSelect}
            handleWeekCalendarSelect={handleWeekCalendarSelect}
            monthQuarterRange={monthQuarterRange}
            activeDateField={activeDateField}
            setActiveDateField={setActiveDateField}
            onMonthSelect={handleMonthSelect}
            onYearSelect={handleYearSelect}
            todayDateObj={todayDateObj}
          />
        </div>

        <FooterActions
          excludeEnabled={excludeEnabled}
          hasEmptyDates={hasEmptyDates}
          hasFutureDates={hasFutureDates}
          onToday={handleToday}
          onClear={handleClear}
          onCancel={onCancel}
          onApply={handleApply}
        />
      </div>
    </div>
  );
}
