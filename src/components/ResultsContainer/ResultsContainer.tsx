import { Button, type ButtonProps } from "react-aria-components";
import { Currency } from "../Currency";
import { twJoin } from "tailwind-merge";

interface ResultsContainerProps {
  tipAmountPerPerson?: number;
  totalAmountPerPerson?: number;
  isResetDisabled?: boolean;
  onReset?: () => void;
}
export const ResultsContainer = ({
  tipAmountPerPerson,
  totalAmountPerPerson,
  isResetDisabled = true,
  onReset = () => {},
}: ResultsContainerProps) => {
  return (
    <ResultsContent>
      <ResultsDetails>
        <ResultRow>
          <ResultsLabel label="Tip Amount" />
          <Currency
            testid="tip-amount-per-person"
            value={tipAmountPerPerson || 0}
          />
        </ResultRow>

        <ResultRow>
          <ResultsLabel label="Total" />
          <Currency
            testid="total-amount-per-person"
            value={totalAmountPerPerson || 0}
          />
        </ResultRow>
      </ResultsDetails>
      <ResetButton isDisabled={isResetDisabled} onPress={onReset} />
    </ResultsContent>
  );
};

const ResultsContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 bg-green-900 grid gap-8 rounded-2xl">{children}</div>
  );
};

const ResultsDetails = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid gap-6">{children}</div>;
};

const ResultRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center">
      {children}
    </div>
  );
};

const ResultsLabel = ({ label }: { label: string }) => {
  return (
    <div className="grid">
      <span className="text-white font-bold">{label}</span>
      <span className="text-grey-400 font-bold text-sm">/ person</span>
    </div>
  );
};

const ResetButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={twJoin(
        "px-8 py-2 h-12 text-xl tracking-wider rounded-sm font-bold outline-0 transition-all duration-200",
        "self-end",
        "text-green-900 bg-green-400 cursor-pointer",
        "hover:bg-green-200",
        "pressed:scale-95",
        "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
        "disabled:text-green-200/33 disabled:bg-green-750 disabled:cursor-not-allowed"
      )}
    >
      RESET
    </Button>
  );
};
