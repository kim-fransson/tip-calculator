import { Form, I18nProvider } from "react-aria-components";
import { ResultsContainer } from "./components/ResultsContainer/ResultsContainer";
import { twJoin } from "tailwind-merge";

import splitterLogoSrc from "./assets/logo.svg";
import { SelectTipField } from "./components/SelectTipField";
import { NumberField } from "./components/NumberField";
import { Users } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { calculateTip, splitAmount } from "./utils/tip-calculator-utils";

function App() {
  const errors = [];
  const [bill, setBill] = useState<number>();
  const [tip, setTip] = useState<number>();
  const [numberOfPeople, setNumberOfPeople] = useState<number>();
  const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0);
  const [totalAmountPerPerson, setTotalAmountPerPerson] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  if (numberOfPeople === 0) {
    errors.push("Can't be zero");
  }

  const handleReset = () => {
    setTipAmountPerPerson(0);
    setTotalAmountPerPerson(0);
    formRef.current?.reset();
  };

  useEffect(() => {
    if (bill && numberOfPeople) {
      let totalTipAmount = 0;
      if (tip) {
        totalTipAmount = calculateTip(bill, tip);
      }
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
              onBillChange={setBill}
              onTipChange={setTip}
              onNumberOfPeopleChange={setNumberOfPeople}
              formRef={formRef}
              errors={errors}
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
  onBillChange: (val: number) => void;
  onTipChange: (val: number) => void;
  onNumberOfPeopleChange: (val: number) => void;
  formRef?: RefObject<HTMLFormElement | null>;
  errors: string[];
}
const BillSection = ({
  onBillChange,
  onTipChange,
  onNumberOfPeopleChange,
  formRef,
  errors,
}: BillSectionProps) => {
  return (
    <section>
      <h2 className="sr-only">Let's Break Down the Feast</h2>
      <Form ref={formRef} className="grid gap-8">
        <NumberField
          testid="bill"
          label="Bill"
          postfix="$"
          minValue={0}
          onChange={onBillChange}
          placeholder="0"
          formatOptions={{
            maximumFractionDigits: 2,
          }}
        />
        <SelectTipField onTipChange={onTipChange} />
        <NumberField
          testid="number-of-people"
          label="Number of People"
          postfix={<Users strokeWidth={3} />}
          placeholder="0"
          minValue={0}
          onChange={onNumberOfPeopleChange}
          isInvalid={errors.length > 0}
          errorMessage={errors[0]}
        />
      </Form>
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
