'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dateKey } from './types';
import { useAuth } from './AuthContext';

const HabitContext = createContext(undefined);

const starterHabits = [
  {
    id: 'move',
    name: 'Move my body',
    emoji: 'MV',
    frequency: 'daily',
    goal: 1,
    color: 'emerald',
    createdAt: '2026-01-01',
    completions: []
  },
  {
    id: 'read',
    name: 'Read 20 minutes',
    emoji: 'RD',
    frequency: 'daily',
    goal: 1,
    color: 'violet',
    createdAt: '2026-01-01',
    completions: []
  },
  {
    id: 'plan',
    name: 'Weekly planning',
    emoji: 'PL',
    frequency: 'weekly',
    goal: 1,
    color: 'orange',
    createdAt: '2026-01-01',
    completions: []
  }
];

export function HabitProvider({ children }) {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const storageKey = useMemo(() => {
    return user ? `habitflow-habits-${user.email.replace(/[^a-zA-Z0-9]/g, '_')}` : 'habitflow-habits-guest';
  }, [user]);

  useEffect(() => {
    setLoaded(false);
    try {
      const saved = localStorage.getItem(storageKey);
      setHabits(saved ? JSON.parse(saved) : starterHabits);
    } catch {
      setHabits(starterHabits);
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(habits));
    }
  }, [habits, loaded, storageKey]);

  const value = useMemo(
    () => ({
      habits,
      loaded,
      addHabit: draft =>
        setHabits(current => [
          ...current,
          { ...draft, id: crypto.randomUUID(), createdAt: dateKey(), completions: [] }
        ]),
      updateHabit: (id, draft) =>
        setHabits(current => current.map(habit => (habit.id === id ? { ...habit, ...draft } : habit))),
      removeHabit: id => setHabits(current => current.filter(habit => habit.id !== id)),
      toggleHabit: (id, day = dateKey()) =>
        setHabits(current =>
          current.map(habit =>
            habit.id !== id
              ? habit
              : {
                  ...habit,
                  completions: habit.completions.includes(day)
                    ? habit.completions.filter(completion => completion !== day)
                    : [...habit.completions, day]
                }
          )
        )
    }),
    [habits, loaded]
  );

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

export function useHabits() {
  const value = useContext(HabitContext);

  if (!value) {
    throw new Error('useHabits must be used within HabitProvider');
  }

  return value;
}

