import App from "./App";
import { render, screen } from "./utils/test-utils";

describe("test tsx setup", () => {
  it("renders", () => {
    render(<App />);

    expect(screen.queryByText("Vite + React")).toBeVisible();
  });
});
