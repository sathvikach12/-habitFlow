export const colors = {
  emerald: { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  violet: { dot: 'bg-violet-500', bg: 'bg-violet-50', text: 'text-violet-700' },
  orange: { dot: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
  blue: { dot: 'bg-sky-500', bg: 'bg-sky-50', text: 'text-sky-700' },
  rose: { dot: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-700' }
};

export const dateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
