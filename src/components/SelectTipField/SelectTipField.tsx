import {
  Input,
  NumberField,
  ToggleButton,
  ToggleButtonGroup,
  type Key,
} from "react-aria-components";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { twJoin } from "tailwind-merge";
import { useState } from "react";

const staticTipValues = [0.05, 0.1, 0.15, 0.25, 0.5];

export const SelectTipField = () => {
  const [selectedTip, setSelectedTip] = useState(new Set<Key>([]));
  const [customTip, setCustomTip] = useState<number | null>(null);

  const onStaticTipChange = (tip: Set<Key>) => {
    setSelectedTip(tip);
    setCustomTip(null);
  };

  const onCustomTipChange = (customTip: number) => {
    setSelectedTip(new Set<Key>([]));
    setCustomTip(customTip);
  };

  return (
    <SelectTipFieldContainer>
      <FieldLabel>Select Tip %</FieldLabel>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ToggleButtonGroup
          selectedKeys={selectedTip}
          onSelectionChange={onStaticTipChange}
          className="contents"
        >
          {staticTipValues.map((tip) => (
            <ToggleButton
              key={`tip-${tip}`}
              id={tip}
              className={twJoin(
                "col-span-1 h-12 cursor-pointer outline-0 px-4 py-2 bg-green-900 text-white font-bold text-2xl rounded-sm transition-all duration-200",
                "hover:text-green-900 hover:bg-green-200",
                "selected:bg-green-400 selected:text-green-900",
                "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              )}
            >{`${tip * 100}%`}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <CustomTip customTip={customTip} setCustomTip={onCustomTipChange} />
      </div>
    </SelectTipFieldContainer>
  );
};

const SelectTipFieldContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="grid gap-2">{children}</div>;
};

const CustomTip = ({
  customTip,
  setCustomTip,
}: {
  customTip?: number | null;
  setCustomTip: ((value: number) => void) | undefined;
}) => {
  return (
    <NumberField
      aria-label="Enter custom tip"
      minValue={0}
      value={customTip as number} // null sets Placeholder to 'Custom'
      onChange={setCustomTip}
      formatOptions={{
        style: "percent",
      }}
      className="col-span-1"
    >
      <Input
        placeholder="Custom"
        className={twJoin(
          "h-12 cursor-pointer outline-0 w-full px-4 py-2  font-bold text-2xl rounded-sm transition-all duration-200",
          "text-center placeholder:text-grey-550 placeholder:text-2xl placeholder:font-bold",
          "focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 hover:outline-2 hover:outline-green-200 hover:outline-offset-2",
          customTip ? "bg-green-400 text-green-900" : "bg-grey-50 text-grey-550"
        )}
      />
    </NumberField>
  );
};
