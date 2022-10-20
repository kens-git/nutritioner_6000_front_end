/** Defines the start and end of a particular day. */
interface DayRange {

  /** The day start (midnight). */
  start: Date,

  /** The day end (11:59:59 PM). */
  end: Date
}

/**
 * Assigns a date's time data to equal the end of the day (11:59:59 PM).
 * 
 * @param date The date to modify.
 * @returns The modified date.
 */
export const set_end_of_day = (date: Date) => {
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * Assigns a date's time data to equal the start of the day (midnight).
 * 
 * @param date The date to modify.
 * @returns The modified date.
 */
export const set_start_of_day = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Determines if two dates contain the same day in the same year.
 * 
 * @param first The first date.
 * @param second The second date.
 * @returns True if the days are the same, false otherwise.
 */
export const is_same_day =
    (first: Date, second: Date) => {
  return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDay() === second.getDay();
}

/**
 * @param date The date.
 * @returns The DayRange of the given date.
 */
export const getDayRange = (date: Date): DayRange => {
  return {
    start: set_start_of_day(new Date(date.getTime())),
    end: set_end_of_day(new Date(date.getTime()))
  }
}

/**
 * @param date The date.
 * @returns An object containing the day range as two simplified extended
 *          ISO format strings.
 */
export const getDayRangeISOString = (date: Date): {start: string, end: string} => {
  const range = getDayRange(date);
  return {
    start: range.start.toISOString(),
    end: range.end.toISOString()
  }
}
