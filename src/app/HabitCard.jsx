'use client';

import { CheckIcon, EllipsisHorizontalIcon, FireIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { colors } from './types';
import { isDone, streak } from './utils';
import { useHabits } from './HabitContext';

export function HabitCard({ habit, onEdit }) {
  const { toggleHabit, removeHabit } = useHabits(); const [menu, setMenu] = useState(false); const done = isDone(habit); const days = streak(habit);
  return <article className="card relative flex items-center gap-4 p-4">
    <button onClick={() => toggleHabit(habit.id)} aria-label={`Mark ${habit.name} ${done ? 'incomplete' : 'complete'}`} className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition ${done ? 'bg-ink text-white' : `${colors[habit.color].bg} ${colors[habit.color].text}`}`}>{done ? <CheckIcon className="h-6 w-6" /> : <span className="text-2xl">{habit.emoji}</span>}</button>
    <button onClick={() => toggleHabit(habit.id)} className="min-w-0 flex-1 text-left"><h3 className={`font-bold ${done ? 'text-slate-400 line-through' : ''}`}>{habit.name}</h3><p className="mt-0.5 text-sm text-slate-500">{habit.frequency === 'daily' ? 'Daily rhythm' : 'Weekly intention'} {days > 0 && <span className="ml-1 inline-flex items-center gap-1 font-medium text-orange-500"><FireIcon className="h-4 w-4" />{days} day streak</span>}</p></button>
    <div className="relative"><button onClick={() => setMenu(!menu)} className="icon-button" aria-label="Habit actions"><EllipsisHorizontalIcon className="h-5 w-5" /></button>{menu && <div className="absolute right-0 z-10 w-36 rounded-xl border border-slate-100 bg-white p-1 shadow-lg"><button onClick={() => { onEdit(habit); setMenu(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-50"><PencilSquareIcon className="h-4 w-4" />Edit</button><button onClick={() => removeHabit(habit.id)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"><TrashIcon className="h-4 w-4" />Delete</button></div>}</div>
  </article>;
}
