import { describe, it, expect } from "vitest";
import { calculateTip } from "../../utils/tip-calculator-utils"; // adjust the path as needed

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
