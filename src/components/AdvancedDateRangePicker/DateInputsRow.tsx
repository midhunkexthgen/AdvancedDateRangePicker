import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import type { DateFieldProps } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { getUnitAbbreviation } from "../../utils/dateRange";
import type { DateRangeUnit } from "../../types/dateRange";

const parseDateValue = (value: string): Dayjs | null => {
  if (!value) {
    return null;
  }
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

interface DateInputsRowProps {
  startDateUtc: string;
  endDateUtc: string;
  duration: number;
  unit: DateRangeUnit;
  excludeEnabled: boolean;
  activeDateField: "start" | "end";
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onDurationChange: (value: number) => void;
  onActiveFieldChange: (field: "start" | "end") => void;
}

export default function DateInputsRow({
  startDateUtc,
  endDateUtc,
  duration,
  unit,
  excludeEnabled,
  activeDateField,
  onStartDateChange,
  onEndDateChange,
  onDurationChange,
  onActiveFieldChange,
}: DateInputsRowProps) {
  const durationInputRef = useRef<HTMLInputElement>(null);
  const [unitPosition, setUnitPosition] = useState(0);
  const [startFieldValue, setStartFieldValue] = useState<Dayjs | null>(() =>
    parseDateValue(startDateUtc)
  );
  const [endFieldValue, setEndFieldValue] = useState<Dayjs | null>(() =>
    parseDateValue(endDateUtc)
  );

  useEffect(() => {
    if (durationInputRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = "14px system-ui, -apple-system, sans-serif";
        const textWidth = context.measureText(duration.toString()).width;
        setUnitPosition(12 + textWidth + 4);
      }
    }
  }, [duration]);

  const getDateFieldStyles = (isActive: boolean) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: isActive ? "#3b82f6" : undefined,
      },
      "&:hover fieldset": {
        borderColor: isActive ? "#2563eb" : undefined,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 2px rgba(59,130,246,0.2)",
      },
      "&.Mui-disabled fieldset": {
        borderColor: "#e5e7eb",
      },
    },
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: excludeEnabled ? "#9ca3af" : undefined,
    },
    "& .MuiInputLabel-root": {
      color: excludeEnabled ? "#9ca3af" : undefined,
    },
  });

  useEffect(() => {
    setStartFieldValue(parseDateValue(startDateUtc));
  }, [startDateUtc]);

  useEffect(() => {
    setEndFieldValue(parseDateValue(endDateUtc));
  }, [endDateUtc]);

  const handleStartChange: DateFieldProps<Dayjs>["onChange"] = (
    newValue,
    context
  ) => {
    if (context?.validationError == null) {
      if (!newValue) {
        onStartDateChange("");
      } else if (newValue.isValid()) {
        onStartDateChange(newValue.format("YYYY-MM-DD"));
      }
    }
    setStartFieldValue(newValue);
  };

  const handleEndChange: DateFieldProps<Dayjs>["onChange"] = (
    newValue,
    context
  ) => {
    if (context?.validationError == null) {
      if (!newValue) {
        onEndDateChange("");
      } else if (newValue.isValid()) {
        onEndDateChange(newValue.format("YYYY-MM-DD"));
      }
    }
    setEndFieldValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label
            className={`block text-xs font-medium mb-1 ${
              excludeEnabled ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Start Date
          </label>
          <DateField
            value={startFieldValue}
            onChange={handleStartChange}
            format="DD/MM/YYYY"
            disabled={excludeEnabled}
            onFocus={() => onActiveFieldChange("start")}
            className="w-full"
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                variant: "outlined",
                sx: {
                  ...getDateFieldStyles(activeDateField === "start"),
                },
                disabled: excludeEnabled,
              },
            }}
          />
        </div>
        <div>
          <label
            className={`block text-xs font-medium mb-1 ${
              excludeEnabled ? "text-gray-400" : "text-gray-600"
            }`}
          >
            End Date
          </label>
          <DateField
            value={endFieldValue}
            onChange={handleEndChange}
            format="DD/MM/YYYY"
            disabled={excludeEnabled}
            onFocus={() => onActiveFieldChange("end")}
            className="w-full"
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                variant: "outlined",
                sx: {
                  ...getDateFieldStyles(activeDateField === "end"),
                },
                disabled: excludeEnabled,
              },
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Duration
          </label>
          <div className="relative">
            <input
              ref={durationInputRef}
              type="number"
              min="1"
              value={duration}
              onChange={(e) => onDurationChange(Number(e.target.value))}
              disabled={excludeEnabled}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-sm pointer-events-none ${
                excludeEnabled ? "text-gray-300" : "text-gray-500"
              }`}
              style={{ left: `${unitPosition}px` }}
            >
              {getUnitAbbreviation(unit)}
            </span>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
