interface MonthPickerProps {
    selectedRange: {
        from?: Date;
        to?: Date;
    };
    onSelect: (range: {
        from?: Date;
        to?: Date;
    } | undefined) => void;
    activeDateField?: "start" | "end";
    onActiveFieldChange?: (field: "start" | "end") => void;
}
export default function MonthPicker({ selectedRange, onSelect, activeDateField, onActiveFieldChange, }: MonthPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MonthPicker.d.ts.map