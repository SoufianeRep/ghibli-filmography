/**
* Converts the given number of minutes into a string representation of hours and minutes.
* @param minutes - The number of minutes.
* @returns The formatted string representing hours and minutes.
*/
export const toHouresAndMinutes = (minutes: string | undefined): string => {
  if (!minutes) return "No Data";

  const h = Math.floor(+minutes / 60);
  const m = +minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}
