/**
 * Calculates the tip amount based on the given amount and tip percentage.
 *
 * @param {number} amount - The base amount to calculate the tip from. Must be a non-negative number.
 * @param {number} tipInPercentage - The percentage of the amount to calculate as tip. Must be a non-negative number.
 *
 * @returns {number} The calculated tip amount.
 *
 * @throws {Error} Throws an error if `amount` or `tipInPercentage` is negative.
 *
 * @example
 * calculateTip(100, 15);
 * Returns: 15
 *
 * @example
 * calculateTip(200, 10);
 * Returns: 20
 */
export const calculateTip = (
  amount: number,
  tipInPercentage: number
): number => {
  if (amount < 0) {
    throw new Error("'amount' must be a non-negative number");
  }
  if (tipInPercentage < 0) {
    throw new Error("'tipInPercentage' must be a non-negative number");
  }

  return (amount * tipInPercentage) / 100;
};
