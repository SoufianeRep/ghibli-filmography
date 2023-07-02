/**
 *
 * @param minutes
 * @returns
 */
export const toHouresAndMinutes = (minutes: string) => {
  const totalMin = parseInt(minutes, 10);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}
