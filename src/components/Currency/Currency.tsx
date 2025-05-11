import { useNumberFormatter } from "react-aria";

interface CurrencyProps {
  value: number | string;
  // 'currency' should be a [3-letter ISO 4217 currency code](https://www.iso.org/iso-4217-currency-codes.html).
  currency?: string;
  testid?: string;
}
export const Currency = ({
  value,
  currency = "USD",
  testid,
}: CurrencyProps) => {
  let numberValue = value;
  if (typeof numberValue === "string") {
    numberValue = Number.parseFloat(numberValue);
  }
  const formatter = useNumberFormatter({
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

  return (
    <span
      data-testid={testid}
      className="text-3xl font-bold tracking-tighter text-green-400 md:text-5xl"
    >
      {formatter.format(numberValue)}
    </span>
  );
};
