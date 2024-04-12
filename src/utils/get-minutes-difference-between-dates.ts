/**
 * Returns the difference in minutes between dates.
 *
 * @example
 *
 * const startDate = new Date();
 * // Add 5min after startDate
 * const endDate = new Date(startDate.getTime() + (5 * 60 * 1000));
 *
 * getMinutesDifferenceBetweenDates(startDate, endDate); // 5
 */
export function getMinutesDifferenceBetweenDates(
  startDate: Date,
  endDate: Date,
): number {
  const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

  return diffInMinutes;
}
