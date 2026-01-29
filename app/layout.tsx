import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Лулу и Меви - Visual Novel',
  description: 'Интерактивная визуальная новелла о магии и судьбе в Telegram Mini App',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
