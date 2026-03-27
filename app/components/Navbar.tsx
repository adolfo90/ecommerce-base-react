'use client'

import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ShoppingCartContext } from '@/app/providers'
import ShoppingCart from './ShoppingCart'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [parsedAccount, setParsedAccount] = useState<any>({})
  const [parsedSignOut, setParsedSignOut] = useState(false)

  useEffect(() => {
    const account = localStorage.getItem('account')
    const signOut = localStorage.getItem('sign-out')
    if (account) setParsedAccount(JSON.parse(account))
    if (signOut) setParsedSignOut(JSON.parse(signOut))
  }, [context?.account, context?.signOut])

  const isActive = (href: string) => {
    return pathname === href ? 'underline underline-offset-4' : ''
  }

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context?.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  const isUserSignOut = context?.signOut || parsedSignOut

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context?.setSignOut(true)
  }

  const handleCategoryClick = (category: string | null) => {
    context?.setSearchByCategory(category || null)
    setIsMenuOpen(false)
    if (category === null) {
      router.push('/')
    } else {
      router.push(`/?category=${category}`)
    }
  }

  const closeMenu = () => setIsMenuOpen(false)

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className='text-black/60 text-sm'>
            {parsedAccount?.email}
          </li>
          <li>
            <Link
              href='/my-orders'
              className={isActive('/my-orders')}>
              My Orders
            </Link>
          </li>
          <li>
            <Link
              href='/my-account'
              className={isActive('/my-account')}>
              My Account
            </Link>
          </li>
          <li>
            <Link
              href='/sign-in'
              onClick={() => handleSignOut()}>
              Sign out
            </Link>
          </li>
        </>
      )
    } else {
      return (
        <li>
          <Link href="/sign-in">
            Sign in
          </Link>
        </li>
      )
    }
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-6 md:px-8 text-sm font-light bg-white border-b border-gray-200'>
      <ul className='flex items-center gap-3 md:gap-6'>
        <li className='font-semibold text-lg'>
          <Link href={`${isUserSignOut ? '/sign-in' : '/'}`} onClick={closeMenu}>
            Shopi
          </Link>
        </li>
        {/* Desktop Menu - Hidden on mobile */}
        <li className='hidden md:block'>
          <button
            onClick={() => handleCategoryClick(null)}
            className={isActive('/')}>
            All
          </button>
        </li>
        <li className='hidden md:block'>
          <button
            onClick={() => handleCategoryClick('clothes')}
            className={pathname.includes('clothes') ? 'underline underline-offset-4' : ''}>
            Clothes
          </button>
        </li>
        <li className='hidden md:block'>
          <button
            onClick={() => handleCategoryClick('electronics')}
            className={pathname.includes('electronics') ? 'underline underline-offset-4' : ''}>
            Electronics
          </button>
        </li>
        <li className='hidden md:block'>
          <button
            onClick={() => handleCategoryClick('furnitures')}
            className={pathname.includes('furnitures') ? 'underline underline-offset-4' : ''}>
            Furnitures
          </button>
        </li>
        <li className='hidden md:block'>
          <button
            onClick={() => handleCategoryClick('toys')}
            className={pathname.includes('toys') ? 'underline underline-offset-4' : ''}>
            Toys
          </button>
        </li>
        <li className='hidden md:block'>
          <button
            onClick={() => handleCategoryClick('others')}
            className={pathname.includes('others') ? 'underline underline-offset-4' : ''}>
            Others
          </button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className='md:hidden flex flex-col gap-1.5 focus:outline-none'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='Toggle menu'>
        <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu - Hidden by default */}
      {isMenuOpen && (
        <ul className='absolute md:hidden top-full left-0 right-0 bg-white border-b border-gray-200 flex flex-col py-4 px-6 gap-4 text-sm z-20'>
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={isActive('/')}>
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('clothes')}
              className={pathname.includes('clothes') ? 'underline underline-offset-4' : ''}>
              Clothes
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('electronics')}
              className={pathname.includes('electronics') ? 'underline underline-offset-4' : ''}>
              Electronics
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('furnitures')}
              className={pathname.includes('furnitures') ? 'underline underline-offset-4' : ''}>
              Furnitures
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('toys')}
              className={pathname.includes('toys') ? 'underline underline-offset-4' : ''}>
              Toys
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('others')}
              className={pathname.includes('others') ? 'underline underline-offset-4' : ''}>
              Others
            </button>
          </li>
          <li className='pt-2 border-t border-gray-200'>
            {renderView()}
          </li>
        </ul>
      )}

      {/* Right side items - Account and Cart */}
      <ul className='hidden md:flex items-center gap-3 md:gap-6'>
        {renderView()}
        <li className='flex items-center'>
          <ShoppingCart />
        </li>
      </ul>

      {/* Mobile Cart */}
      <div className='md:hidden flex items-center'>
        <ShoppingCart />
      </div>
    </nav>
  )
}

export default Navbar
