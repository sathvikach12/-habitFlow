import { AuthProvider } from './AuthContext';
import { HabitProvider } from './HabitContext';
import './globals.css';

export const metadata = {
  title: 'HabitFlow - Make progress feel natural',
  description: 'A calm daily habit tracker with an AI coach.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <HabitProvider>{children}</HabitProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
