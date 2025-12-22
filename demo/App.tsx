import { useState } from "react";
import { AdvancedDateRangePicker, DateRangeSelection } from "../src";
// Import the CSS file
import "../dist/advanced-date-range-picker.css";

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
          Advanced Date Range Picker Demo
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Date Range Picker</h2>
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
                // themeColors={{
                //   background: "#eff6ff",
                // }}
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">1. Install Tailwind CSS</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
                {`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                2. Configure Tailwind (tailwind.config.js)
              </h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
                {`module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/advanced-date-range-picker/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Import CSS in your app</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
                {`import "advanced-date-range-picker/dist/advanced-date-range-picker.css";`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Use the component</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
                {`import { AdvancedDateRangePicker } from "advanced-date-range-picker";

function MyComponent() {
  return (
    <AdvancedDateRangePicker
      onApply={(selection) => console.log(selection)}
      onCancel={() => {}}
    />
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
