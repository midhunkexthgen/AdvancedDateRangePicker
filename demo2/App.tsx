import { useState } from "react";
import AdvancedDateRangePicker from "../src/components/AdvancedDateRangePicker/AdvancedDateRangePicker";
import type { DateRangeSelection } from "../src/types/dateRange";

// Import the CSS file

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeSelection | null>(null);

  const handleApply = (selection: DateRangeSelection) => {
    setDateRange(selection);
    setShowPicker(false);
    console.log("Selected range:", selection);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Advanced Date Range Picker - Demo 2
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Date Range Picker Test</h2>
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {showPicker ? "Hide Picker" : "Show Picker"}
            </button>
          </div>

          {dateRange && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                Selected Date Range:
              </h3>
              <div className="text-sm text-green-800 space-y-1">
                <p>
                  <strong>Start Date:</strong> {dateRange.startDateUtc}
                </p>
                <p>
                  <strong>End Date:</strong> {dateRange.endDateUtc}
                </p>
                <p>
                  <strong>Unit:</strong> {dateRange.unit}
                </p>
                <p>
                  <strong>Duration:</strong> {dateRange.duration}
                </p>
                {dateRange.excludedWeekdays &&
                  dateRange.excludedWeekdays.length > 0 && (
                    <p>
                      <strong>Excluded Weekdays:</strong>{" "}
                      {dateRange.excludedWeekdays.join(", ")}
                    </p>
                  )}
              </div>
            </div>
          )}

          {showPicker && (
            <div className="mt-6">
              <AdvancedDateRangePicker
                initialSelection={dateRange || undefined}
                onApply={handleApply}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;




