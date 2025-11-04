# Advanced Date Range Picker

An advanced, feature-rich React date range picker component with presets, saved dates, exclusion filters, and support for day, week, month, and quarter views.

## Features

- 📅 **Multiple View Modes**: Day, Week, Month, and Quarter selection
- 💾 **Saved Date Ranges**: Save and quickly access frequently used date ranges
- 🎯 **Quick Presets**: Today, Yesterday, This Week, Month to Date, Year to Date
- 🚫 **Exclusion Filters**: Exclude specific days, dates, date ranges, or saved dates
- 📱 **Responsive Design**: Beautiful, modern UI built with Tailwind CSS
- ⚙️ **Configurable**: Customize week start day, future date restrictions, and more
- 🔧 **TypeScript**: Fully typed with TypeScript

## Installation

### Install from Git Repository

```bash
npm install git+https://github.com/your-username/advanced-date-range-picker.git
```

Or if the repository is private:

```bash
npm install git+ssh://git@github.com:your-username/advanced-date-range-picker.git
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom
```

### Required Dependencies

The package includes these dependencies, but ensure they're available:

```bash
npm install date-fns date-fns-tz lucide-react react-day-picker
```

### Tailwind CSS Setup

This component requires Tailwind CSS. Make sure you have Tailwind CSS configured in your project:

1. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add Tailwind to your CSS:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Import the package CSS** (required for react-day-picker styles):
```tsx
import "advanced-date-range-picker/dist/advanced-date-range-picker.css";
```

Or if using CSS imports:
```css
@import "advanced-date-range-picker/dist/advanced-date-range-picker.css";
```

## Usage

### Basic Example

```tsx
import React, { useState } from "react";
import { AdvancedDateRangePicker, DateRangeSelection } from "advanced-date-range-picker";
// Import the CSS file (required)
import "advanced-date-range-picker/dist/advanced-date-range-picker.css";

function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeSelection | null>(null);

  const handleApply = (selection: DateRangeSelection) => {
    setDateRange(selection);
    setShowPicker(false);
    console.log("Selected range:", selection);
    console.log("Start date:", selection.startDateUtc);
    console.log("End date:", selection.endDateUtc);
    console.log("Duration:", selection.duration, selection.unit);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Select Date Range
      </button>

      {dateRange && (
        <div className="mt-4">
          <p>
            {dateRange.startDateUtc} to {dateRange.endDateUtc}
          </p>
        </div>
      )}

      {showPicker && (
        <div className="mt-4">
          <AdvancedDateRangePicker
            initialSelection={dateRange || undefined}
            onApply={handleApply}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

export default App;
```

### With Modal/Overlay

```tsx
import React, { useState } from "react";
import { AdvancedDateRangePicker, DateRangeSelection } from "advanced-date-range-picker";
// Import the CSS file (required)
import "advanced-date-range-picker/dist/advanced-date-range-picker.css";

function DateRangeModal() {
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeSelection | null>(null);

  const handleApply = (selection: DateRangeSelection) => {
    setDateRange(selection);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Date Picker</button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <AdvancedDateRangePicker
              initialSelection={dateRange || undefined}
              onApply={handleApply}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
```

### Using Utility Functions

```tsx
import {
  parseUtc,
  formatUtc,
  createSelection,
  getTodayUtc,
} from "advanced-date-range-picker";

// Parse a date string
const date = parseUtc("2024-01-15");

// Format a date
const dateStr = formatUtc(new Date());

// Get today's date
const today = getTodayUtc();

// Create a selection object
const selection = createSelection(
  "2024-01-01",
  "2024-01-31",
  "month",
  [0, 6] // Exclude Sundays and Saturdays
);
```

## API Reference

### AdvancedDateRangePicker Props

```typescript
interface AdvancedDateRangePickerProps {
  initialSelection?: Partial<DateRangeSelection>;
  onApply: (selection: DateRangeSelection) => void;
  onCancel: () => void;
}
```

#### Props

- **initialSelection** (optional): Partial date range selection to initialize the picker
- **onApply**: Callback called when user clicks "Apply" with the complete selection
- **onCancel**: Callback called when user clicks "Cancel"

### DateRangeSelection Interface

```typescript
interface DateRangeSelection {
  startDateUtc: string; // yyyy-MM-dd format
  endDateUtc: string; // yyyy-MM-dd format
  unit: DateRangeUnit; // "day" | "week" | "month" | "quarter"
  duration: number; // in selected unit
  excludedWeekdays: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  includedDatesUtc: string[]; // all dates excluding weekdays
  excludeEnabled?: boolean;
  excludeFilterTypes?: ("days" | "specific-date" | "saved-dates" | "date-range")[];
  excludedSpecificDates?: string[];
  excludedSavedDates?: string[];
  excludedDateRanges?: Array<{ id: string; start: string; end: string }>;
}
```

## Configuration

You can customize the date picker behavior by modifying the configuration in `src/config/dateConfig.ts`:

- **WEEK_STARTS_ON**: Week start day (0=Sunday, 1=Monday, etc.)
- **ALLOW_FUTURE_DATES**: Whether to allow future date selection
- **WEEK_NUMBERING_MODE**: How week numbers are calculated

## Styling

The component uses Tailwind CSS classes. Make sure your Tailwind configuration includes the necessary paths:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/advanced-date-range-picker/**/*.{js,jsx,ts,tsx}",
  ],
  // ... rest of config
};
```

## Development

To build the package:

```bash
npm run build
```

To develop locally:

```bash
npm run dev
```

## License

MIT

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

# AdvancedDateRangePicker
