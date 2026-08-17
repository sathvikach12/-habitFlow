'use client';

import { ChartBarIcon, FireIcon, SparklesIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { HabitCard } from './HabitCard';
import { HabitModal } from './HabitModal';
import { useHabits } from './HabitContext';
import { dateKey } from './types';
import { isDone, prettyDate, streak, weekDays, weeklyProgress } from './utils';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { habits, loaded } = useHabits();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const completed = habits.filter(habit => isDone(habit)).length;
  const progress = weeklyProgress(habits);
  const days = weekDays();
  const dailyHabits = habits.filter(habit => habit.frequency === 'daily');

  if (loading || !user || !loaded) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist text-moss">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-moss border-t-transparent"></div>
          <p className="font-semibold text-slate-500">Entering your flow...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mist font-sans">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-sm font-black text-white">HF</span>
            <span className="text-xl font-black tracking-tight">HabitFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#B5D7C0]/35 bg-[#DDEDE1]/35 px-3 py-1 text-xs font-bold text-moss">
              <span className="h-1.5 w-1.5 rounded-full bg-moss"></span>
              {user.email}
            </span>
            <button
              onClick={() => setModal('new')}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-moss"
            >
              <PlusIcon className="h-4 w-4" />
              New habit
            </button>
            <button
              onClick={logout}
              title="Sign Out"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition"
            >
              <ArrowRightOnRectangleIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div>
            <section className="mb-6 overflow-hidden bg-[#DDEDE1] p-6 sm:p-8">
              <p className="mb-2 text-sm font-semibold text-moss">{prettyDate()}</p>
              <h1 className="max-w-lg text-3xl font-black tracking-tight sm:text-4xl">
                Small actions. A steadier, brighter you.
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div className="rounded-lg bg-white/70 px-4 py-3">
                  <span className="text-2xl font-black">
                    {completed}/{habits.length}
                  </span>
                  <span className="ml-2 text-sm text-slate-600">done today</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-moss">
                  <SparklesIcon className="h-5 w-5" />
                  Every checkmark counts
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Today's flow</h2>
                  <p className="text-sm text-slate-500">Tap a habit when it is done.</p>
                </div>
                <span className="text-sm font-bold text-moss">
                  {completed === habits.length && habits.length ? 'All done' : `${habits.length - completed} to go`}
                </span>
              </div>

              <div className="space-y-3">
                {habits.length ? (
                  habits.map(habit => <HabitCard key={habit.id} habit={habit} onEdit={setModal} />)
                ) : (
                  <button
                    onClick={() => setModal('new')}
                    className="card w-full border-dashed p-10 text-center text-slate-500"
                  >
                    Start your first small habit <ArrowRightIcon className="ml-1 inline h-4 w-4" />
                  </button>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-bold">This week</h2>
                  <p className="text-sm text-slate-500">Your consistency view</p>
                </div>
                <ChartBarIcon className="h-6 w-6 text-moss" />
              </div>
              <div className="mb-4 flex items-end justify-between">
                <span className="text-3xl font-black">{progress}%</span>
                <span className="text-sm text-slate-500">complete</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-moss transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-5 grid grid-cols-7 gap-1.5">
                {days.map(day => {
                  const key = dateKey(day);
                  const done = dailyHabits.filter(habit => habit.completions.includes(key)).length;
                  const all = dailyHabits.length;
                  const fill = done && done === all ? 'bg-moss' : done ? 'bg-[#B5D7C0]' : 'bg-slate-100';

                  return (
                    <div key={key} className="text-center">
                      <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">
                        {day.toLocaleDateString('en-US', { weekday: 'narrow' })}
                      </p>
                      <div className={`mx-auto h-7 w-7 rounded-lg ${fill}`} />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card p-5">
              <h2 className="mb-4 font-bold">Your momentum</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange-50 text-orange-500">
                    <FireIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{Math.max(0, ...habits.map(streak))} day best streak</p>
                    <p className="text-xs text-slate-500">Keep the chain going</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">
                      {habits.reduce((sum, habit) => sum + habit.completions.length, 0)} total check-ins
                    </p>
                    <p className="text-xs text-slate-500">All your effort adds up</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {modal && <HabitModal habit={modal === 'new' ? undefined : modal} onClose={() => setModal(null)} />}
    </main>
  );
}
