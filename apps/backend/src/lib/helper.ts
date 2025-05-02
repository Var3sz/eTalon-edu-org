export function addTwoHoursToDate(iso: string): Date {
  const d = new Date(iso);
  d.setHours(d.getHours() + 2);
  return d;
}
