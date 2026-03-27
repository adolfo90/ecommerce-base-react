import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import ShoppingCart from '../ShoppingCart'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className='text-black/60'>
            {parsedAccount?.email}
          </li>
          <li>
            <NavLink
              to='/my-orders'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => isActive ? activeStyle : undefined }
            onClick={() => handleSignOut()}>
            Sign in
          </NavLink>
        </li>
      )
    }
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-6 md:px-8 text-sm font-light bg-white border-b border-gray-200'>
      <ul className='flex items-center gap-3 md:gap-6'>
        <li className='font-semibold text-lg'>
          <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`} onClick={closeMenu}>
            Shopi
          </NavLink>
        </li>
        {/* Desktop Menu - Hidden on mobile */}
        <li className='hidden md:block'>
          <NavLink
            to='/'
            onClick={() => { context.setSearchByCategory(); closeMenu() }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li className='hidden md:block'>
          <NavLink
            to='/clothes'
            onClick={() => { context.setSearchByCategory('clothes'); closeMenu() }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Clothes
          </NavLink>
        </li>
        <li className='hidden md:block'>
          <NavLink
            to='/electronics'
            onClick={() => { context.setSearchByCategory('electronics'); closeMenu() }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li className='hidden md:block'>
          <NavLink
            to='/furnitures'
            onClick={() => { context.setSearchByCategory('furnitures'); closeMenu() }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Furnitures
          </NavLink>
        </li>
        <li className='hidden md:block'>
          <NavLink
            to='/toys'
            onClick={() => { context.setSearchByCategory('toys'); closeMenu() }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Toys
          </NavLink>
        </li>
        <li className='hidden md:block'>
          <NavLink
            to='/others'
            onClick={() => { context.setSearchByCategory('others'); closeMenu() }}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
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
        <ul className='absolute md:hidden top-full left-0 right-0 bg-white border-b border-gray-200 flex flex-col py-4 px-6 gap-4 text-sm'>
          <li>
            <NavLink
              to='/'
              onClick={() => { context.setSearchByCategory(); closeMenu() }}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/clothes'
              onClick={() => { context.setSearchByCategory('clothes'); closeMenu() }}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/electronics'
              onClick={() => { context.setSearchByCategory('electronics'); closeMenu() }}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/furnitures'
              onClick={() => { context.setSearchByCategory('furnitures'); closeMenu() }}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Furnitures
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/toys'
              onClick={() => { context.setSearchByCategory('toys'); closeMenu() }}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Toys
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/others'
              onClick={() => { context.setSearchByCategory('others'); closeMenu() }}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Others
            </NavLink>
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
