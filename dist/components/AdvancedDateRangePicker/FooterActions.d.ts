interface FooterActionsProps {
    excludeEnabled: boolean;
    hasEmptyDates: boolean;
    hasFutureDates: boolean;
    allowClear?: boolean;
    onToday: () => void;
    onClear: () => void;
    onCancel: () => void;
    onApply: () => void;
}
export default function FooterActions({ excludeEnabled, hasEmptyDates, hasFutureDates, allowClear, onToday, onClear, onCancel, onApply, }: FooterActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FooterActions.d.ts.map