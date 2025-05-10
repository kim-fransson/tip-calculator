import { I18nProvider } from "react-aria-components";
import { ResultsContainer } from "./components/ResultsContainer/ResultsContainer";
import { twJoin } from "tailwind-merge";

import splitterLogoSrc from "./assets/logo.svg";
import { SelectTipField } from "./components/SelectTipField";
import { NumberField } from "./components/NumberField";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { calculateTip, splitAmount } from "./utils/tip-calculator-utils";

function App() {
  const [bill, setBill] = useState<number | undefined | null>();
  const [tip, setTip] = useState<number | undefined | null>();
  const [numberOfPeople, setNumberOfPeople] = useState<
    number | undefined | null
  >();
  const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0);
  const [totalAmountPerPerson, setTotalAmountPerPerson] = useState(0);

  const handleReset = () => {
    setBill(null);
    setTip(null);
    setNumberOfPeople(null);
    setTipAmountPerPerson(0);
    setTotalAmountPerPerson(0);
  };

  useEffect(() => {
    if (bill && tip && numberOfPeople) {
      const totalTipAmount = calculateTip(bill, tip);
      const totalAmount = bill + totalTipAmount;

      setTipAmountPerPerson(splitAmount(totalTipAmount, numberOfPeople));
      setTotalAmountPerPerson(splitAmount(totalAmount, numberOfPeople));
    }
  }, [bill, tip, numberOfPeople]);

  return (
    <I18nProvider locale="en-US">
      <AppContainer>
        <SplitterLogo />
        <BillContainer>
          <MainContainer>
            <BillSection
              bill={bill}
              onBillChange={setBill}
              tip={tip}
              onTipChange={setTip}
              numberOfPeople={numberOfPeople}
              onNumberOfPeopleChange={setNumberOfPeople}
            />
            <ResultsSection
              tipAmountPerPerson={tipAmountPerPerson}
              totalAmountPerPerson={totalAmountPerPerson}
              onReset={handleReset}
              isResetDisabled={!bill && !tip && !numberOfPeople}
            />
          </MainContainer>
        </BillContainer>
      </AppContainer>
    </I18nProvider>
  );
}

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-12 min-h-svh flex flex-col items-center justify-center gap-8">
      {children}
    </div>
  );
};

const SplitterLogo = () => {
  return <img src={splitterLogoSrc} alt="Splitter" className="max-w-[87px]" />;
};

const BillContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={twJoin(
        "px-6 py-8 bg-white rounded-t-2xl flex-1 w-full md:flex-none",
        "md:shadow-xl md:rounded-2xl md:px-20 md:py-12 md:max-w-[608px]",
        "lg:max-w-[920px] lg:p-8"
      )}
    >
      {children}
    </div>
  );
};

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="sr-only">
        Let's Split It! Said the One Who Ordered a Salad
      </h1>
      <main className="grid gap-8 lg:grid-cols-2">{children}</main>
    </>
  );
};

interface BillSectionProps {
  bill: number | undefined | null;
  onBillChange: (val: number) => void;
  tip: number | undefined | null;
  onTipChange: (val: number) => void;
  numberOfPeople: number | undefined | null;
  onNumberOfPeopleChange: (val: number) => void;
}
const BillSection = ({
  bill,
  onBillChange,
  tip,
  onTipChange,
  numberOfPeople,
  onNumberOfPeopleChange,
}: BillSectionProps) => {
  return (
    <section className="grid gap-8">
      <h2 className="sr-only">Let's Break Down the Feast</h2>
      <NumberField
        label="Bill"
        postfix="$"
        value={bill as number}
        onChange={onBillChange}
        placeholder="0"
        formatOptions={{
          maximumFractionDigits: 2,
        }}
      />
      <SelectTipField tip={tip} onTipChange={onTipChange} />
      <NumberField
        label="Number of People"
        postfix={<Users strokeWidth={3} />}
        placeholder="0"
        minValue={0}
        value={numberOfPeople as number}
        onChange={onNumberOfPeopleChange}
        errorMessage="Can't be zero"
        isInvalid={numberOfPeople === 0}
      />
    </section>
  );
};

interface ResultsSectionProps {
  tipAmountPerPerson: number;
  totalAmountPerPerson: number;
  onReset: () => void;
  isResetDisabled: boolean;
}
const ResultsSection = ({
  tipAmountPerPerson,
  totalAmountPerPerson,
  isResetDisabled,
  onReset,
}: ResultsSectionProps) => {
  return (
    <section className="grid">
      <h2 className="sr-only">Split Happens, Here's the Breakdown</h2>
      <ResultsContainer
        tipAmountPerPerson={tipAmountPerPerson}
        totalAmountPerPerson={totalAmountPerPerson}
        onReset={onReset}
        isResetDisabled={isResetDisabled}
      />
    </section>
  );
};

export default App;
