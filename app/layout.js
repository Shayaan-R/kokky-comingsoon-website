import { Baloo_2, Baloo_Bhai_2 } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';

const balooBhai = Baloo_Bhai_2({ 
  subsets: ['latin'], 
  weight: ['700'], 
  variable: '--font-display',
  display: 'swap'
});

const baloo = Baloo_2({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap'
});

export const metadata = {
  title: 'KOKKY - Coming Soon',
  description: 'Something fun and exciting is on the way.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#ff6b81',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${balooBhai.variable} ${baloo.variable}`}>
        <Navbar />
        <ThemeToggle />
        
        <div className="app-background">
            <div className="overlay">
                {children}
            </div>
        </div>
      </body>
    </html>
  );
}
  