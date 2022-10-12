// TODO: check best practices, if these should return a copy instead
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
