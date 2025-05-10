import { I18nProvider } from "react-aria-components";
import { ResultsContainer } from "./components/ResultsContainer/ResultsContainer";
import { twJoin } from "tailwind-merge";

import splitterLogoSrc from "./assets/logo.svg";
import { SelectTipField } from "./components/SelectTipField";

function App() {
  return (
    <I18nProvider locale="en-US">
      <AppContainer>
        <SplitterLogo />
        <BillContainer>
          <MainContainer>
            <BillSection />
            <ResultsSection />
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
      <main className="grid gap-8">{children}</main>
    </>
  );
};

const BillSection = () => {
  return (
    <section>
      <h2 className="sr-only">Let's Break Down the Feast</h2>
      <SelectTipField />
    </section>
  );
};

const ResultsSection = () => {
  return (
    <section>
      <h2 className="sr-only">Split Happens, Here's the Breakdown</h2>
      <ResultsContainer />
    </section>
  );
};

export default App;
