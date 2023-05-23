import './styles.css';
import InteractionMonitor from '@/components/InteractionMonitor';
import { Suspense } from 'react'

export const metadata = {
  title: 'Sailoogle',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <InteractionMonitor></InteractionMonitor>
      <body>
        <Suspense fallback={"Loading Data..."}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}