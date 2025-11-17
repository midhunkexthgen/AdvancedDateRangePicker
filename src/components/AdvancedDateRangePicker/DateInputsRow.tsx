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
  const [startFieldError, setStartFieldError] = useState<boolean>(false);
  const [endFieldError, setEndFieldError] = useState<boolean>(false);

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

  const getDateFieldStyles = (isActive: boolean, hasError: boolean) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: hasError ? undefined : isActive ? "#3b82f6" : undefined,
      },
      "&:hover fieldset": {
        borderColor: hasError ? undefined : isActive ? "#2563eb" : undefined,
      },
      "&.Mui-focused fieldset": {
        borderColor: hasError ? undefined : "#3b82f6",
        boxShadow: hasError ? undefined : "0 0 0 2px rgba(59,130,246,0.2)",
      },
      "&.Mui-error fieldset": {
        borderColor: "#d32f2f",
      },
      "&.Mui-error:hover fieldset": {
        borderColor: "#d32f2f",
      },
      "&.Mui-error.Mui-focused fieldset": {
        borderColor: "#d32f2f",
        boxShadow: "0 0 0 2px rgba(211,47,47,0.2)",
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
    const parsed = parseDateValue(startDateUtc);
    setStartFieldValue(parsed);
    // Clear error if date is valid or empty
    if (!startDateUtc || (parsed && parsed.isValid())) {
      setStartFieldError(false);
    }
  }, [startDateUtc]);

  useEffect(() => {
    const parsed = parseDateValue(endDateUtc);
    setEndFieldValue(parsed);
    // Clear error if date is valid or empty
    if (!endDateUtc || (parsed && parsed.isValid())) {
      setEndFieldError(false);
    }
  }, [endDateUtc]);

  const handleStartChange: DateFieldProps<Dayjs>["onChange"] = (
    newValue,
    context
  ) => {
    setStartFieldValue(newValue);

    // Only update parent if there's no validation error
    if (context?.validationError == null) {
      if (!newValue) {
        onStartDateChange("");
      } else if (newValue.isValid()) {
        onStartDateChange(newValue.format("YYYY-MM-DD"));
      }
    }
  };

  const handleStartError: DateFieldProps<Dayjs>["onError"] = (error) => {
    // MUI's onError callback is the source of truth for validation state
    // error will be null when there's no error, or a validation error object when there is
    setStartFieldError(error != null);
  };

  const handleEndChange: DateFieldProps<Dayjs>["onChange"] = (
    newValue,
    context
  ) => {
    setEndFieldValue(newValue);

    // Only update parent if there's no validation error
    if (context?.validationError == null) {
      if (!newValue) {
        onEndDateChange("");
      } else if (newValue.isValid()) {
        onEndDateChange(newValue.format("YYYY-MM-DD"));
      }
    }
  };

  const handleEndError: DateFieldProps<Dayjs>["onError"] = (error) => {
    // MUI's onError callback is the source of truth for validation state
    // error will be null when there's no error, or a validation error object when there is
    setEndFieldError(error != null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex gap-3 mb-4 px-4">
        <div>
          <label
            className={`block text-xs font-medium mb-1 ${
              excludeEnabled ? "text-gray-400" : "text-[#61708F]"
            }`}
          >
            Start Date
          </label>
          <DateField
            value={startFieldValue}
            onChange={handleStartChange}
            onError={handleStartError}
            format="DD/MM/YYYY"
            disabled={excludeEnabled}
            onFocus={() => onActiveFieldChange("start")}
            className="w-full"
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                variant: "outlined",
                error: startFieldError,
                // To ensure the height is reflected, use InputProps with sx for the input element
                InputProps: {
                  sx: {
                    minHeight: "28px",
                    height: "28px",
                    maxHeight: "28px",
                    boxSizing: "border-box",
                    fontSize: "12px",
                  },
                },
                sx: {
                  ...getDateFieldStyles(
                    activeDateField === "start",
                    startFieldError
                  ),
                  width: "172px",
                  // Do NOT specify height here, but ensure InputProps.sx sets the height
                  // Optionally, you can add padding to control inner height if needed
                },
                disabled: excludeEnabled,
              },
            }}
          />
        </div>
        <div>
          <label
            className={`block text-xs font-medium mb-1 ${
              excludeEnabled ? "text-gray-400" : "text-[#61708F]"
            }`}
          >
            End Date
          </label>
          <DateField
            value={endFieldValue}
            onChange={handleEndChange}
            onError={handleEndError}
            format="DD/MM/YYYY"
            disabled={excludeEnabled}
            onFocus={() => onActiveFieldChange("end")}
            className="w-full"
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                variant: "outlined",
                error: endFieldError,
                // To ensure the height is reflected, use InputProps with sx for the input element
                InputProps: {
                  sx: {
                    minHeight: "28px",
                    height: "28px",
                    maxHeight: "28px",
                    boxSizing: "border-box",
                    fontSize: "12px",
                  },
                },
                sx: {
                  ...getDateFieldStyles(
                    activeDateField === "end",
                    endFieldError
                  ),
                  width: "172px",
                  // Do NOT specify height here, but ensure InputProps.sx sets the height
                  // Optionally, you can add padding to control inner height if needed
                },
                disabled: excludeEnabled,
              },
            }}
          />
        </div>
        <div>
          <label
            className={`block text-xs font-medium ${
              excludeEnabled ? "text-gray-400" : "text-[#61708F]"
            } mb-1`}
          >
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
              className="w-[120px] h-[28px] pl-3 pr-10 py-2 text-gray-500 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-[12px] pointer-events-none ${
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
