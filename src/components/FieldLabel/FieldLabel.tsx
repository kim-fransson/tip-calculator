import { Label, type LabelProps } from "react-aria-components";

export const FieldLabel = ({ children, ...props }: LabelProps) => {
  return (
    <Label className="text-grey-500 font-bold" {...props}>
      {children}
    </Label>
  );
};
