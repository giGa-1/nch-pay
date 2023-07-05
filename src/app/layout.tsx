import '@/styles/normalize.css'
import '@/styles/globals.css'

export const metadata = {
  title: 'New Chapter Payments',
  description: 'Made for New Chapter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
