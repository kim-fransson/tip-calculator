import { fireEvent, render, screen } from "../../utils/test-utils";
import { SelectTipField } from "./SelectTipField";

describe("SelectTipField", () => {
  it("renders all static tip radio buttons and the custom tip input", () => {
    render(<SelectTipField />);

    const tips = ["5%", "10%", "15%", "25%", "50%"];
    tips.forEach((tip) => {
      expect(screen.getByRole("radio", { name: tip })).toBeVisible();
    });

    expect(screen.getByPlaceholderText("Custom")).toBeVisible();
  });

  it("deselect static tip when custom tip is entered", () => {
    render(<SelectTipField />);
    const tenPercentButton = screen.getByRole("radio", { name: "10%" });
    fireEvent.click(tenPercentButton);
    expect(tenPercentButton).toHaveAttribute("aria-checked", "true");

    const customTipInput = screen.getByLabelText("Enter custom tip");
    fireEvent.click(customTipInput);
    fireEvent.change(customTipInput, { target: { value: 45 } });
    fireEvent.blur(customTipInput);
    expect(customTipInput).toHaveValue("45%");
    expect(tenPercentButton).toHaveAttribute("aria-checked", "false");
  });

  it("clears the custom tip input when a static tip is selected", () => {
    render(<SelectTipField />);

    const customTipInput = screen.getByLabelText("Enter custom tip");
    fireEvent.click(customTipInput);
    fireEvent.change(customTipInput, { target: { value: 45 } });
    fireEvent.blur(customTipInput);
    expect(customTipInput).toHaveValue("45%");

    const tenPercentButton = screen.getByRole("radio", { name: "10%" });
    fireEvent.click(tenPercentButton);
    expect(tenPercentButton).toHaveAttribute("aria-checked", "true");

    expect(screen.getByPlaceholderText("Custom")).toBeVisible();
  });
});
