interface DayRange {
  start: Date,
  end: Date
}

export const set_end_of_day = (date: Date) => {
  date.setHours(23, 59, 59, 999);
  return date;
}

export const set_start_of_day = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
}

export const is_same_day =
    (first: Date, second: Date) => {
  return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDay() === second.getDay();
}

export const getDayRange = (date: Date): DayRange => {
  return {
    start: set_start_of_day(new Date(date.getTime())),
    end: set_end_of_day(new Date(date.getTime()))
  }
}

export const getDayRangeISOString = (date: Date): {start: string, end: string} => {
  const range = getDayRange(date);
  return {
    start: range.start.toISOString(),
    end: range.end.toISOString()
  }
}
