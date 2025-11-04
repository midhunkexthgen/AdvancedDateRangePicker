# How to Use AdvancedDateRangePicker from Git Repository

## Quick Start Guide

### Step 1: Install from Git Repository

Once you've pushed this package to a Git repository, you can install it in any project:

```bash
# Public repository
npm install git+https://github.com/your-username/advanced-date-range-picker.git

# Private repository (SSH)
npm install git+ssh://git@github.com:your-username/advanced-date-range-picker.git

# Specific branch or tag
npm install git+https://github.com/your-username/advanced-date-range-picker.git#main
npm install git+https://github.com/your-username/advanced-date-range-picker.git#v1.0.0
```

### Step 2: Install Peer Dependencies

```bash
npm install react react-dom
```

### Step 3: Install Tailwind CSS (Required)

The component uses Tailwind CSS for styling. Make sure you have it set up:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/advanced-date-range-picker/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Step 4: Import the CSS (Required)

Import the package CSS file in your main entry file (e.g., `main.tsx`, `App.tsx`, or `index.css`):

```tsx
// In your main component or entry file
import "advanced-date-range-picker/dist/advanced-date-range-picker.css";
```

Or in your CSS file:
```css
@import "advanced-date-range-picker/dist/advanced-date-range-picker.css";
```

### Step 5: Use the Component

```tsx
import React, { useState } from "react";
import {
  AdvancedDateRangePicker,
  DateRangeSelection,
} from "advanced-date-range-picker";
// Import the CSS file (required)
import "advanced-date-range-picker/dist/advanced-date-range-picker.css";

function MyComponent() {
  const [showPicker, setShowPicker] = useState(false);
  const [selection, setSelection] = useState<DateRangeSelection | null>(null);

  return (
    <div>
      <button onClick={() => setShowPicker(true)}>
        Select Date Range
      </button>

      {showPicker && (
        <AdvancedDateRangePicker
          initialSelection={selection || undefined}
          onApply={(newSelection) => {
            setSelection(newSelection);
            setShowPicker(false);
            console.log("Selected:", newSelection);
          }}
          onCancel={() => setShowPicker(false)}
        />
      )}

      {selection && (
        <div>
          <p>Start: {selection.startDateUtc}</p>
          <p>End: {selection.endDateUtc}</p>
          <p>Duration: {selection.duration} {selection.unit}(s)</p>
        </div>
      )}
    </div>
  );
}
```

## Complete Example with Modal

```tsx
import React, { useState } from "react";
import {
  AdvancedDateRangePicker,
  DateRangeSelection,
} from "advanced-date-range-picker";

function DatePickerExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeSelection | null>(null);

  const handleApply = (selection: DateRangeSelection) => {
    setDateRange(selection);
    setIsOpen(false);
    
    // Use the selection
    console.log("Date Range:", {
      start: selection.startDateUtc,
      end: selection.endDateUtc,
      duration: `${selection.duration} ${selection.unit}(s)`,
      excludedDays: selection.excludedWeekdays,
    });
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Date Range Picker
      </button>

      {dateRange && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Selected Range:</h3>
          <p>
            {dateRange.startDateUtc} to {dateRange.endDateUtc}
          </p>
          <p>
            Duration: {dateRange.duration} {dateRange.unit}(s)
          </p>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <AdvancedDateRangePicker
              initialSelection={dateRange || undefined}
              onApply={handleApply}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePickerExample;
```

## Using Utility Functions

```tsx
import {
  parseUtc,
  formatUtc,
  getTodayUtc,
  createSelection,
  calcEndFromDuration,
} from "advanced-date-range-picker";

// Parse a date string (YYYY-MM-DD) to Date object
const date = parseUtc("2024-01-15");

// Format a Date object to YYYY-MM-DD string
const dateStr = formatUtc(new Date());

// Get today's date as YYYY-MM-DD string
const today = getTodayUtc();

// Calculate end date from start date and duration
const endDate = calcEndFromDuration("2024-01-01", "month", 3, []);

// Create a complete selection object
const selection = createSelection(
  "2024-01-01",
  "2024-03-31",
  "month",
  [0, 6] // Exclude Sundays and Saturdays
);
```

## Data Format

All dates are in `YYYY-MM-DD` format (UTC date strings):

```typescript
const selection: DateRangeSelection = {
  startDateUtc: "2024-01-01",  // YYYY-MM-DD
  endDateUtc: "2024-01-31",    // YYYY-MM-DD
  unit: "month",               // "day" | "week" | "month" | "quarter"
  duration: 1,                 // Number of units
  excludedWeekdays: [0, 6],   // [0=Sun, 1=Mon, ..., 6=Sat]
  includedDatesUtc: ["2024-01-01", "2024-01-02", ...], // All included dates
};
```

## Features You Can Use

1. **Quick Presets**: Today, Yesterday, This Week, Month to Date, Year to Date
2. **Saved Dates**: Save frequently used date ranges for quick access
3. **Exclusion Filters**: Exclude specific days, dates, date ranges, or saved dates
4. **Multiple Views**: Day, Week, Month, and Quarter selection modes
5. **Duration Input**: Automatically calculate end date from duration
6. **Future Date Control**: Configurable to allow or disallow future dates

## Troubleshooting

### Component not rendering

- Make sure Tailwind CSS is properly configured
- Check that `react-day-picker/dist/style.css` is imported (it's included in the package)

### Styles not applying

- **Import the CSS file**: Make sure you've imported `advanced-date-range-picker/dist/advanced-date-range-picker.css` in your project
- Update your `tailwind.config.js` to include the package path in `content`
- Make sure Tailwind CSS is compiled in your build process
- Verify the CSS file exists in `node_modules/advanced-date-range-picker/dist/advanced-date-range-picker.css`

### TypeScript errors

- Ensure you have `@types/react` and `@types/react-dom` installed
- Check that your TypeScript version is compatible (5.8+)

## Next Steps

1. Push this package to your Git repository
2. Install it in your project using the git URL
3. Import and use the component as shown above
4. Customize the configuration in `src/config/dateConfig.ts` if needed

