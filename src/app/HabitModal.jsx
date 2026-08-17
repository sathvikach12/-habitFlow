'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useHabits } from './HabitContext';
import { colors } from './types';

export function HabitModal({ habit, onClose }) {
  const { addHabit, updateHabit } = useHabits();
  const [name, setName] = useState(habit?.name ?? '');
  const [emoji, setEmoji] = useState(habit?.emoji ?? 'HF');
  const [frequency, setFrequency] = useState(habit?.frequency ?? 'daily');
  const [color, setColor] = useState(habit?.color ?? 'emerald');

  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  function submit(event) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const draft = { name: name.trim(), emoji: emoji || 'HF', frequency, goal: 1, color };

    if (habit) {
      updateHabit(habit.id, draft);
    } else {
      addHabit(draft);
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <form onSubmit={submit} onMouseDown={event => event.stopPropagation()} className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{habit ? 'Edit habit' : 'Create a habit'}</h2>
            <p className="text-sm text-slate-500">Keep it small enough to make it stick.</p>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close modal">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <label className="label">Habit name</label>
        <input
          autoFocus
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="e.g. Drink a glass of water"
          className="mb-4 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-moss"
        />

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="label">Icon</label>
            <input
              value={emoji}
              maxLength={2}
              onChange={event => setEmoji(event.target.value.toUpperCase())}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-center text-xl outline-none focus:border-moss"
            />
          </div>
          <div>
            <label className="label">Cadence</label>
            <select
              value={frequency}
              onChange={event => setFrequency(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-moss"
            >
              <option value="daily">Every day</option>
              <option value="weekly">Once a week</option>
            </select>
          </div>
        </div>

        <span className="label">Accent color</span>
        <div className="mb-6 flex gap-3">
          {Object.keys(colors).map(key => (
            <button
              key={key}
              type="button"
              aria-label={key}
              onClick={() => setColor(key)}
              className={`h-9 w-9 rounded-full ${colors[key].dot} ${
                color === key ? 'ring-4 ring-slate-200 ring-offset-2' : ''
              }`}
            />
          ))}
        </div>

        <button className="w-full rounded-lg bg-ink py-3 font-bold text-white transition hover:bg-moss">
          {habit ? 'Save changes' : 'Add to my flow'}
        </button>
      </form>
    </div>
  );
}
