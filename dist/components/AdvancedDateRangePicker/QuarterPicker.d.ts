interface QuarterPickerProps {
    selectedRange: {
        from: Date;
        to: Date;
    };
    onSelect: (range: {
        from?: Date;
        to?: Date;
    } | undefined) => void;
    disabled?: boolean;
}
export default function QuarterPicker({ selectedRange, onSelect, disabled, }: QuarterPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=QuarterPicker.d.ts.map