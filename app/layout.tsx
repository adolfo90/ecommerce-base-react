import type { Metadata } from 'next'
import { ShoppingCartProvider } from './providers'
import Navbar from './components/Navbar'
import CheckoutSideMenu from './components/CheckoutSideMenu'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shopi - E-commerce Store',
  description: 'Shop exclusive products with Shopi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ShoppingCartProvider>
          <Navbar />
          {children}
          <CheckoutSideMenu />
        </ShoppingCartProvider>
      </body>
    </html>
  )
}
