import { dateKey } from './types';

export const prettyDate = (date = new Date()) => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(date);
export const isDone = (habit, day = dateKey()) => habit.completions.includes(day);
export function streak(habit) {
  let count = 0; const day = new Date();
  while (habit.completions.includes(dateKey(day))) { count++; day.setDate(day.getDate() - 1); }
  return count;
}
export function weekDays() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => { const day = new Date(today); day.setDate(today.getDate() - 6 + index); return day; });
}
export function weeklyProgress(habits) {
  const days = weekDays().map(dateKey);
  const possible = habits.filter(h => h.frequency === 'daily').length * 7 + habits.filter(h => h.frequency === 'weekly').length;
  const done = habits.reduce((total, h) => total + h.completions.filter(c => days.includes(c)).length, 0);
  return possible ? Math.min(100, Math.round(done / possible * 100)) : 0;
}
