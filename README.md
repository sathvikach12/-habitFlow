#  HabitFlow

[![Next.js](https://img.shields.io/badge/Next.js-15.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> **Make progress feel natural.** A calm, modern, and highly responsive habit-tracking web application designed to help you build consistency, track daily streaks, and visualize weekly progress.

---

##  Key Features

- ** Fluid Habit Management**: Create, view, check off, edit, and delete daily and weekly habits.
- ** Streak & Consistency Trackers**: Automatically calculates active/best streaks and total check-ins to build long-term momentum.
- ** Consistency Matrix**: A clean weekly consistency grid mapping your weekly progress percentage and daily check-ins.
- ** Secure Client-side Auth**: Lightweight authentication context with automatic user database simulation, demo accounts, and account-isolated habit storage.
- ** Cozy Aesthetics**: Minimalist, responsive UI built with Tailwind CSS using custom tones: *Ink* (`#19221E`), *Moss* (`#47735B`), *Mist* (`#F3F6F2`), and *Peach* (`#FFB899`).

---

##  Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Client Components, Server-ready Routing)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom theme extension, responsive layout system)
- **Icons**: [@heroicons/react](https://heroicons.com/)
- **Context/State**: React Context API (`AuthContext`, `HabitContext`) with `localStorage` persistent layers.

---

##  Folder Structure

This application uses a streamlined, **flat layout structure** under the Next.js App Router for ease of development:

```text
src/
└── app/
    ├── login/
    │   └── page.tsx          # Standalone Login/Signup UI
    ├── AuthContext.tsx       # Auth provider (Simulated database)
    ├── HabitContext.tsx      # Habits provider (User-isolated storage)
    ├── HabitCard.tsx         # Interactive habit toggle/progress card
    ├── HabitModal.tsx        # Create & edit habits form modal
    ├── page.tsx              # Main protected habits dashboard
    ├── layout.tsx            # Global layout wrapper
    ├── globals.css           # Custom Tailwind base utilities
    ├── types.ts              # TS interfaces (Habit, HabitColor, Frequency)
    └── utils.ts              # Helpers (Streaks, date formatting, progress calculation


--- ## Demo Account Credentials
For quick testing, a demo account is pre-registered in the authentication database simulation:

- **Email**: `test@example.com`
- **Password**: `password123`

You can also switch to **Create Account** mode on the login page to set up a brand new user. Habits created will automatically separate and save under your specific email.


## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
