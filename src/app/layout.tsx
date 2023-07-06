import '@/styles/normalize.css'
import Script from 'next/script';
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
      <Script src='https://static.liqpay.ua/libjs/checkout.js' async></Script>
      <body >{children}</body>
    </html>
  )
}
