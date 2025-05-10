import type {
  NumberFieldProps as RACNumberFieldProps,
  ValidationResult,
} from "react-aria-components";
import {
  FieldError,
  Input,
  NumberField as RACNumberField,
} from "react-aria-components";
import { FieldLabel } from "../FieldLabel";
import { twJoin } from "tailwind-merge";
import type { ReactNode } from "react";

interface NumberFieldProps extends RACNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  postfix?: string | ReactNode;
}

export const NumberField = ({
  label,
  errorMessage,
  placeholder,
  postfix,
  ...props
}: NumberFieldProps) => {
  return (
    <RACNumberField {...props} className="grid gap-2">
      <div className="flex justify-between items-center">
        <FieldLabel>{label}</FieldLabel>
        <FieldError className="text-orange font-bold text-sm">
          {errorMessage}
        </FieldError>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-300 text-3xl">
          {postfix}
        </span>
        <Input
          placeholder={placeholder}
          className={twJoin(
            "pr-4 pl-12 w-full py-2 h-12 text-right bg-grey-50 text-grey-900 rounded-sm outline-2 outline-transparent cursor-pointer transition-all duration-200",
            "text-2xl font-bold text-green-900",
            "hover:outline-green-200",
            "focus:outline-green-400",
            "invalid:outline-orange",
            "placeholder:text-grey-300"
          )}
        />
      </div>
    </RACNumberField>
  );
};
