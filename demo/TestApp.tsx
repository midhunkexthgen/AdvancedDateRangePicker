import { useState } from "react";
import { AdvancedDateRangePicker, DateRangeSelection } from "../src";
// Import the CSS file
import "../dist/advanced-date-range-picker.css";

function TestApp() {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeSelection | null>(null);

  const handleApply = (selection: DateRangeSelection) => {
    console.log("Applied:", selection);
    setDateRange(selection);
    setShowPicker(false);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setShowPicker(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test App</h1>
      <button onClick={() => setShowPicker(!showPicker)}>
        {showPicker ? "Hide" : "Show"} Picker
      </button>

      {dateRange && (
        <div
          style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}
        >
          <p>Start: {dateRange.startDateUtc}</p>
          <p>End: {dateRange.endDateUtc}</p>
        </div>
      )}

      {showPicker && (
        <div style={{ marginTop: "20px" }}>
          <AdvancedDateRangePicker
            onApply={handleApply}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

export default TestApp;
