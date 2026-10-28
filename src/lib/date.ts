export function formatDuration(startISO: string, endISO: string | 'present'): string {
  const [startYear, startMonth] = startISO.split('-').map(Number);
  const startDate = new Date(startYear, startMonth - 1, 1);

  let endDate: Date;
  if (endISO === 'present') {
    endDate = new Date();
  } else {
    const [endYear, endMonth] = endISO.split('-').map(Number);
    endDate = new Date(endYear, endMonth - 1, 1);
  }

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let durationStr = '';
  if (years > 0) {
    durationStr += `${years} yr${years > 1 ? 's' : ''} `;
  }
  if (remainingMonths > 0 || years === 0) {
    durationStr += `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
  }

  return durationStr.trim();
}
