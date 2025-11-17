interface FooterActionsProps {
  excludeEnabled: boolean;
  hasEmptyDates: boolean;
  hasFutureDates: boolean;
  onToday: () => void;
  onClear: () => void;
  onCancel: () => void;
  onApply: () => void;
}

export default function FooterActions({
  excludeEnabled,
  hasEmptyDates,
  hasFutureDates,
  onToday,
  onClear,
  onCancel,
  onApply,
}: FooterActionsProps) {
  return (
    <div className="flex items-center justify-between pt-2 pb-2 px-6 border-t border-gray-200">
      <button
        onClick={onToday}
        disabled={excludeEnabled}
        className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
          excludeEnabled
            ? "text-blue-300 cursor-not-allowed bg-transparent"
            : "text-blue-600 hover:bg-blue-50"
        }`}
      >
        Today
      </button>
      <div className="flex gap-2">
        <button
          onClick={onClear}
          disabled={excludeEnabled}
          className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
            excludeEnabled
              ? "text-gray-300 cursor-not-allowed bg-gray-100/40"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Clear dates
        </button>
        <button
          onClick={onCancel}
          disabled={excludeEnabled}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
            excludeEnabled
              ? "text-gray-300 cursor-not-allowed bg-gray-100/40"
              : "text-[#003DB8] hover:bg-gray-100"
          }`}
        >
          Cancel
        </button>
        <button
          onClick={onApply}
          disabled={Boolean(excludeEnabled || hasEmptyDates || hasFutureDates)}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
            excludeEnabled || hasEmptyDates || hasFutureDates
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#003DB8] text-white hover:bg-[#003DB8]"
          }`}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
