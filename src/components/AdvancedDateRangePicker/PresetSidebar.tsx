import { useState, useEffect } from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import type { DateRangeSelection, SavedDateRange } from "../../types/dateRange";
import { getPresets } from "../../utils/dateRange";
import { storageService } from "../../services/storageService";

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

const SAVED_DATES_KEY = "savedDateRanges";

export default function PresetSidebar({
  onPresetSelect,
  onSavedDateSelect,
  currentSelection,
  themeColors,
  disabled = false,
}: PresetSidebarProps) {
  const [savedDates, setSavedDates] = useState<SavedDateRange[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // Initialize storage service and load saved dates
  useEffect(() => {
    const loadSavedDates = async () => {
      await storageService.init();
      const data = await storageService.getData<SavedDateRange[]>(
        SAVED_DATES_KEY
      );
      if (data) {
        setSavedDates(data);
      }
    };
    loadSavedDates();
  }, []);

  const presets = getPresets();

  const handlePresetClick = (
    getValue: () => { startDateUtc: string; endDateUtc: string }
  ) => {
    if (disabled) return;
    const { startDateUtc, endDateUtc } = getValue();
    onPresetSelect(startDateUtc, endDateUtc);
  };

  const handleSaveDateRange = async () => {
    if (disabled) return;
    if (newLabel.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }

    const newSavedDate: SavedDateRange = {
      id: `saved-${Date.now()}`,
      label: newLabel.trim(),
      selection: currentSelection,
      createdAt: Date.now(),
    };

    const updatedSavedDates = [...savedDates, newSavedDate];
    setSavedDates(updatedSavedDates);
    await storageService.saveData(SAVED_DATES_KEY, updatedSavedDates);

    setNewLabel("");
    setShowSaveModal(false);
  };

  const handleDeleteSavedDate = async (id: string) => {
    if (disabled) return;
    const updatedSavedDates = savedDates.filter((d) => d.id !== id);
    setSavedDates(updatedSavedDates);
    await storageService.saveData(SAVED_DATES_KEY, updatedSavedDates);
  };

  const handleLoadSavedDate = (saved: SavedDateRange) => {
    // If there's a handler for full saved date selection, use it
    if (disabled) return;
    if (onSavedDateSelect) {
      onSavedDateSelect(saved.selection);
    } else {
      // Fallback to just setting the date range
      onPresetSelect(saved.selection.startDateUtc, saved.selection.endDateUtc);
    }
  };

  const formatDateRange = (start: string, end: string) => {
    // Format dates as "MMM DD, YYYY"
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr + "T00:00:00");
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    if (start === end) {
      return formatDate(start);
    }
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  return (
    <div
      className={`w-44 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden ${
        disabled ? "opacity-60" : ""
      }`}
      style={{ ...themeColors }}
    >
      {/* Default Presets */}
      <div className="mb-1 mt-4 px-3 flex-shrink-0">
        {/* <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-600 uppercase">
            Quick Select
          </h3>
        </div> */}
        <div className="flex flex-col">
          {Object.values(presets).map((preset) => {
            const { startDateUtc, endDateUtc } = preset.getValue();
            return (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset.getValue)}
                disabled={disabled}
                aria-disabled={disabled}
                className={`w-full text-left px-1 rounded-md transition-all mb-3 ${
                  disabled
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "hover:bg-white hover:shadow-sm"
                }`}
              >
                <div
                  className={`text-xs font-semibold ${
                    disabled ? "text-gray-400" : "text-[#1F1F1F]"
                  }`}
                >
                  {preset.label}
                </div>
                <div
                  className={`text-[10px] leading-relaxed font-medium
 mt-0.5 ${disabled ? "text-gray-400" : "text-[#61708F]"}`}
                >
                  {formatDateRange(startDateUtc, endDateUtc)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Saved Dates Section */}
      <div className="flex justify-between flex-col flex-1 min-h-0 border-t border-gray-200 px-3 h-full">
        <div className="overflow-y-auto">
          <div className="flex items-center justify-between mb-3 flex-shrink-0 mt-3">
            <div className="flex items-center gap-1">
              <h3 className="text-xs font-semibold text-[#757575]">
                Saved Dates
              </h3>
            </div>
            <button
              onClick={() => {
                if (disabled) return;
                setShowHelp(!showHelp);
              }}
              disabled={disabled}
              className={`text-gray-400 ${
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-gray-600"
              }`}
            >
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>

          {showHelp && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0">
              Save your frequently used date ranges for quick access later.
            </div>
          )}

          {savedDates.length === 0 ? (
            <p className="text-xs text-gray-500 mb-3 italic flex-shrink-0">
              No saved dates yet
            </p>
          ) : (
            <div className="space-y-3 mb-3 overflow-y-auto flex-1 min-h-0">
              {savedDates.map((saved) => (
                <div
                  key={saved.id}
                  className="group bg-white rounded-md hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between px-1">
                    <button
                      onClick={() => handleLoadSavedDate(saved)}
                      disabled={disabled}
                      className={`flex-1 text-left ${
                        disabled ? "cursor-not-allowed opacity-60" : ""
                      }`}
                    >
                      <div
                        className={`text-xs font-semibold mb-1 ${
                          disabled ? "text-gray-400" : "text-gray-900"
                        }`}
                      >
                        {saved.label}
                      </div>

                      {/* TODO: Add back in when we have a way to display the excluded dates */}
                      {/* {(saved.selection.excludedWeekdays?.length > 0 ||
                      (saved.selection.excludedSpecificDates &&
                        saved.selection.excludedSpecificDates.length > 0) ||
                      (saved.selection.excludedSavedDates &&
                        saved.selection.excludedSavedDates.length > 0) ||
                      (saved.selection.excludedDateRanges &&
                        saved.selection.excludedDateRanges.length > 0)) && (
                      <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                        {saved.selection.excludedWeekdays?.length > 0 && (
                          <div>
                            Days:{" "}
                            {saved.selection.excludedWeekdays
                              .map(
                                (d) =>
                                  [
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                  ][d]
                              )
                              .join(", ")}
                          </div>
                        )}
                        {saved.selection.excludedSpecificDates &&
                          saved.selection.excludedSpecificDates.length > 0 && (
                            <div>
                              Specific Dates:{" "}
                              {saved.selection.excludedSpecificDates.length}
                            </div>
                          )}
                        {saved.selection.excludedSavedDates &&
                          saved.selection.excludedSavedDates.length > 0 && (
                            <div>
                              Saved: {saved.selection.excludedSavedDates.length}
                            </div>
                          )}
                        {saved.selection.excludedDateRanges &&
                          saved.selection.excludedDateRanges.length > 0 && (
                            <div>
                              Ranges:{" "}
                              {saved.selection.excludedDateRanges.length}
                            </div>
                          )}
                      </div>
                    )} */}
                    </button>
                    <button
                      onClick={() => handleDeleteSavedDate(saved.id)}
                      disabled={disabled}
                      className={`${
                        disabled
                          ? "opacity-40 cursor-not-allowed"
                          : "opacity-0 group-hover:opacity-100"
                      } text-red-500 hover:text-red-700 transition-opacity ml-2`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div
                    className={`text-[10px] leading-relaxed font-medium px-1 ${
                      disabled ? "text-gray-400" : "text-[#61708F]"
                    }`}
                  >
                    {formatDateRange(
                      saved.selection.startDateUtc,
                      saved.selection.endDateUtc
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => {
              if (disabled) return;
              setShowSaveModal(true);
            }}
            disabled={disabled}
            className={`w-full flex-shrink-0 px-1 py-4 text-[#003DB8] opacity-50 hover:opacity-100 text-xs font-medium rounded-md transition-colors flex items-center justify-center mt-auto ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            <Plus className="w-4 h-4" />
            Save selected date
          </button>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setShowSaveModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto">
              <h3 className="text-base font-semibold mb-3 text-gray-800">
                Save Date Range
              </h3>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g., Q1 2025, Holiday Period"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveDateRange();
                    }
                  }}
                />
              </div>
              <div className="mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1">
                <div>
                  <strong>Range:</strong>{" "}
                  {formatDateRange(
                    currentSelection.startDateUtc,
                    currentSelection.endDateUtc
                  )}
                </div>
                <div>
                  <strong>Duration:</strong> {currentSelection.duration}{" "}
                  {currentSelection.unit}(s)
                </div>
                {currentSelection.excludedWeekdays &&
                  currentSelection.excludedWeekdays.length > 0 && (
                    <div>
                      <strong>Excluded Days:</strong>{" "}
                      {currentSelection.excludedWeekdays
                        .map(
                          (d) =>
                            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]
                        )
                        .join(", ")}
                    </div>
                  )}
                {currentSelection.excludedSpecificDates &&
                  currentSelection.excludedSpecificDates.length > 0 && (
                    <div>
                      <strong>Excluded Specific Dates:</strong>{" "}
                      {currentSelection.excludedSpecificDates.length} date(s)
                    </div>
                  )}
                {currentSelection.excludedSavedDates &&
                  currentSelection.excludedSavedDates.length > 0 && (
                    <div>
                      <strong>Excluded Saved Dates:</strong>{" "}
                      {currentSelection.excludedSavedDates.length} saved date(s)
                    </div>
                  )}
                {currentSelection.excludedDateRanges &&
                  currentSelection.excludedDateRanges.length > 0 && (
                    <div>
                      <strong>Excluded Date Ranges:</strong>{" "}
                      {currentSelection.excludedDateRanges.length} range(s)
                    </div>
                  )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDateRange}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
