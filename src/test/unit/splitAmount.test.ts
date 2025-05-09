import { describe, it, expect } from "vitest";
import { splitAmount } from "../../utils/tip-calculator-utils";

describe("splitAmount", () => {
  it("splits the amount evenly between persons", () => {
    expect(splitAmount(100, 4)).toBe(25);
  });

  it("returns a float when division is not even", () => {
    expect(splitAmount(100, 3)).toBeCloseTo(33.3333, 4);
  });

  it("handles zero amount correctly", () => {
    expect(splitAmount(0, 5)).toBe(0);
  });

  it("throws an error when numberOfPersons is zero", () => {
    expect(() => splitAmount(100, 0)).toThrow(
      "'numberOfPerson' must be greater than zero"
    );
  });

  it("throws an error when numberOfPersons is negative", () => {
    expect(() => splitAmount(100, -2)).toThrow(
      "'numberOfPerson' must be greater than zero"
    );
  });

  it("handles negative amounts", () => {
    expect(splitAmount(-100, 4)).toBe(-25);
  });
});
