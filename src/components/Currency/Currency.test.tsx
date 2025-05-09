import { Currency } from "./Currency";
import { render, screen } from "../../utils/test-utils";

describe("<Currency />", () => {
  it("renders and displays $0.00 for zero", () => {
    render(<Currency value={0} currency="USD" />);
    expect(screen.getByText("$0.00")).toBeVisible();
  });

  it("rounds and displays correctly for fractional input", () => {
    render(<Currency value={100.555} currency="USD" />);
    expect(screen.getByText("$100.56")).toBeVisible();
  });

  it("renders negative values correctly", () => {
    render(<Currency value={-42.1} currency="USD" />);
    expect(screen.getByText("-$42.10")).toBeVisible();
  });

  it("renders whole numbers correctly", () => {
    render(<Currency value={2500} currency="USD" />);
    expect(screen.getByText("$2,500.00")).toBeVisible();
  });

  it("handles large numbers", () => {
    render(<Currency value={12345678.9} currency="USD" />);
    expect(screen.getByText("$12,345,678.90")).toBeVisible();
  });

  it("displays correct format for one decimal input", () => {
    render(<Currency value={19.9} currency="USD" />);
    expect(screen.getByText("$19.90")).toBeVisible();
  });

  it("renders minimal fractional digits when input has many", () => {
    render(<Currency value={0.00001} currency="USD" />);
    expect(screen.getByText("$0.00")).toBeVisible();
  });

  it("displays proper formatting when passed as string", () => {
    render(<Currency value={"1234.5"} currency="USD" />);
    expect(screen.getByText("$1,234.50")).toBeVisible();
  });

  it("displays proper formatting when passed as invalid string", () => {
    render(<Currency value={"ABCD"} currency="USD" />);
    expect(screen.getByText("$NaN")).toBeVisible();
  });
});
