import { I18nProvider } from "react-aria-components";
import "./App.css";
import { Currency } from "./components/Currency/Currency";
function App() {
  return (
    <I18nProvider locale="en-US">
      <Currency value={0} />
    </I18nProvider>
  );
}

export default App;
