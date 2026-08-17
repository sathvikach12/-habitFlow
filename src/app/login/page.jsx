'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ExclamationCircleIcon,
  SparklesIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, signup, loading: authLoading } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation and process states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // If user is already logged in, redirect them to dashboard
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Clean form errors when switching modes
  useEffect(() => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSubmitError('');
    setConfirmPassword('');
  }, [isLoginMode]);

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    
    // Email Validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password Validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Confirm Password Validation (Sign Up only)
    if (!isLoginMode) {
      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password');
        isValid = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      } else {
        setConfirmPasswordError('');
      }
    }

    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isLoginMode) {
        await login(email, password);
        router.push('/');
      } else {
        await signup(email, password);
        setSignupSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 1200);
      }
    } catch (err) {
      setSubmitError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('test@example.com');
    setPassword('password123');
    setEmailError('');
    setPasswordError('');
    setSubmitError('');
  };

  if (authLoading && !isSubmitting && !signupSuccess) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist text-moss">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-moss border-t-transparent"></div>
          <p className="font-medium text-slate-500">Checking auth state...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist font-sans px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Brand logo & header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-2 text-center">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-sm font-black text-white">HF</span>
            <span className="text-xl font-black tracking-tight text-ink">HabitFlow</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-bold tracking-wider uppercase">
            Make progress feel natural
          </p>
        </div>

        {/* Auth form card */}
        <div className="card p-8 bg-white border border-white shadow-soft relative overflow-hidden transition-all duration-300">
          
          {/* Success Overlay for signup */}
          {signupSuccess && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center z-10 transition-all duration-300">
              <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 animate-bounce">
                <CheckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-ink mb-1">Account Created!</h3>
              <p className="text-sm text-slate-500">Welcome to HabitFlow. Loading your flow...</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-black text-ink">
              {isLoginMode ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isLoginMode 
                ? 'Sign in to review and tick off your habits today.' 
                : 'Start a steady, balanced journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Global Submit Error Message */}
            {submitError && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2.5 text-xs font-semibold text-rose-600 animate-shake">
                <ExclamationCircleIcon className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  disabled={isSubmitting || signupSuccess}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`block w-full rounded-lg border bg-mist/50 py-2.5 pl-10 pr-3 text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                    emailError 
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' 
                      : 'border-slate-200 focus:border-moss focus:ring-moss/20'
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {emailError && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                  <ExclamationCircleIcon className="h-3 w-3" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                  value={password}
                  disabled={isSubmitting || signupSuccess}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  className={`block w-full rounded-lg border bg-mist/50 py-2.5 pl-10 pr-3 text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                    passwordError 
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' 
                      : 'border-slate-200 focus:border-moss focus:ring-moss/20'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {passwordError && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                  <ExclamationCircleIcon className="h-3 w-3" />
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password Field (Sign Up Mode Only) */}
            {!isLoginMode && (
              <div className="animate-fade-in">
                <label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    disabled={isSubmitting || signupSuccess}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError('');
                    }}
                    className={`block w-full rounded-lg border bg-mist/50 py-2.5 pl-10 pr-3 text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                      confirmPasswordError 
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-moss focus:ring-moss/20'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {confirmPasswordError && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                    <ExclamationCircleIcon className="h-3 w-3" />
                    {confirmPasswordError}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || signupSuccess}
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-ink py-2.5 text-sm font-bold text-white transition hover:bg-moss focus:outline-none focus:ring-2 focus:ring-moss/20 disabled:opacity-75 relative min-h-[44px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>{isLoginMode ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          {/* Toggle login/signup mode */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              disabled={isSubmitting || signupSuccess}
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="font-bold text-moss hover:underline focus:outline-none"
            >
              {isLoginMode ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>

        {/* Demo Account info banner */}
        {isLoginMode && (
          <div className="p-4 bg-[#DDEDE1]/60 border border-[#B5D7C0]/50 rounded-lg flex items-start gap-3 text-xs text-moss hover:bg-[#DDEDE1] transition duration-200">
            <SparklesIcon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1 w-full">
              <div className="flex justify-between items-center">
                <span className="font-bold">Test Account Pre-configured</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="font-bold underline hover:text-ink cursor-pointer focus:outline-none"
                >
                  Auto-fill
                </button>
              </div>
              <p className="text-slate-600 font-medium">
                Email: <span className="font-bold text-ink">test@example.com</span> &nbsp;|&nbsp; 
                Pass: <span className="font-bold text-ink">password123</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
