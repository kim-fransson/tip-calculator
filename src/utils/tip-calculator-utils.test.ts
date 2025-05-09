import { describe, it, expect } from "vitest";
import { calculateTip, splitAmount } from "./tip-calculator-utils"; // adjust the path as needed

describe("tip-calculator-utils", () => {
  describe("calculateTip", () => {
    it("calculates 20% tip on $100 correctly", () => {
      expect(calculateTip(100, 20)).toBe(20);
    });

    it("calculates 15% tip on $80 correctly", () => {
      expect(calculateTip(80, 15)).toBe(12);
    });

    it("returns 0 for 0% tip", () => {
      expect(calculateTip(100, 0)).toBe(0);
    });

    it("returns 0 for $0 amount regardless of tip percentage", () => {
      expect(calculateTip(0, 20)).toBe(0);
    });

    it("handles floating point amounts correctly", () => {
      expect(calculateTip(56.75, 18)).toBeCloseTo(10.215, 3);
    });

    it("throws error for negative amount", () => {
      expect(() => calculateTip(-100, 10)).toThrow(
        "'amount' must be a non-negative number"
      );
    });

    it("throws error for negative tip", () => {
      expect(() => calculateTip(100, -10)).toThrow(
        "'tipInPercentage' must be a non-negative number"
      );
    });
  });

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
});
