import App from "./App";
import { render, screen, userEvent } from "./utils/test-utils";

const setup = async () => {
  const user = userEvent.setup();
  render(<App />);
  return { user };
};

const getFields = () => ({
  billField: screen.getByTestId("bill"),
  numberOfPeopleField: screen.getByTestId("number-of-people"),
  tipAmountPerPerson: screen.getByTestId("tip-amount-per-person"),
  totalAmountPerPerson: screen.getByTestId("total-amount-per-person"),
  resetButton: screen.getByRole("button", { name: "RESET" }),
  customTipInput: screen.getByPlaceholderText("Custom"),
});

const tipButtons = ["5%", "10%", "15%", "25%", "50%"];

describe("App", () => {
  it("initializes with empty fields and no selections", async () => {
    const { user } = await setup();
    const {
      billField,
      numberOfPeopleField,
      tipAmountPerPerson,
      totalAmountPerPerson,
      resetButton,
      customTipInput,
    } = getFields();

    await user.click(billField);
    expect(document.activeElement).toHaveValue("");

    tipButtons.forEach((tip) => {
      expect(screen.getByRole("radio", { name: tip })).not.toBeChecked();
    });
    expect(customTipInput).toBeVisible();

    await user.click(numberOfPeopleField);
    expect(document.activeElement).toHaveValue("");

    expect(tipAmountPerPerson).toHaveTextContent("$0.00");
    expect(totalAmountPerPerson).toHaveTextContent("$0.00");
    expect(resetButton).toBeDisabled();
  });

  it("calculates total without tip when bill and people are provided", async () => {
    const { user } = await setup();
    const {
      billField,
      numberOfPeopleField,
      tipAmountPerPerson,
      totalAmountPerPerson,
    } = getFields();

    await user.type(billField, "20");
    await user.type(numberOfPeopleField, "2");
    await user.tab();

    expect(tipAmountPerPerson).toHaveTextContent("$0.00");
    expect(totalAmountPerPerson).toHaveTextContent("$10.00");
  });

  it("calculates tip and total when all fields are filled", async () => {
    const { user } = await setup();
    const {
      billField,
      numberOfPeopleField,
      tipAmountPerPerson,
      totalAmountPerPerson,
    } = getFields();

    await user.type(billField, "20");
    await user.click(screen.getByRole("radio", { name: "10%" }));
    await user.type(numberOfPeopleField, "2");
    await user.tab();

    expect(tipAmountPerPerson).toHaveTextContent("$1.00");
    expect(totalAmountPerPerson).toHaveTextContent("$11.00");
  });

  it("resets all fields and selections when reset is clicked", async () => {
    const { user } = await setup();
    const {
      billField,
      numberOfPeopleField,
      tipAmountPerPerson,
      totalAmountPerPerson,
      resetButton,
      customTipInput,
    } = getFields();

    await user.type(billField, "20");
    await user.click(screen.getByRole("radio", { name: "10%" }));
    await user.type(numberOfPeopleField, "2");
    await user.tab();
    await user.click(resetButton);

    expect(tipAmountPerPerson).toHaveTextContent("$0.00");
    expect(totalAmountPerPerson).toHaveTextContent("$0.00");

    await user.click(billField);
    expect(document.activeElement).toHaveValue("");

    tipButtons.forEach((tip) => {
      expect(screen.getByRole("radio", { name: tip })).not.toBeChecked();
    });
    expect(customTipInput).toBeVisible();

    await user.click(numberOfPeopleField);
    expect(document.activeElement).toHaveValue("");
  });

  it("displays error message when number of people is 0", async () => {
    const { user } = await setup();
    const { numberOfPeopleField } = getFields();

    await user.type(numberOfPeopleField, "0");
    await user.tab();

    expect(screen.getByText("Can't be zero")).toBeVisible();
  });
});
