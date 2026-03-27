'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '@/app/providers'
import OrderCard from './OrderCard'
import { totalPrice } from '@/app/utils'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  const router = useRouter()

  const handleDelete = (id: number) => {
    const filteredProducts = context?.cartProducts?.filter(product => product.id !== id) || []
    context?.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: context?.cartProducts || [],
      totalProducts: context?.cartProducts?.length || 0,
      totalPrice: totalPrice(context?.cartProducts || [])
    }

    context?.setOrder([...(context?.order || []), orderToAdd])
    context?.setCartProducts([])
    context?.setSearchByTitle(null)
    router.push('/my-orders/last')
  }

  return (
    <>
      {/* Overlay for mobile */}
      {context?.isCheckoutSideMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 md:hidden z-40'
          onClick={() => context?.closeCheckoutSideMenu()}
        />
      )}
      <aside
        className={`${context?.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white w-full sm:w-[360px] h-full sm:h-[calc(100vh-68px)] sm:top-[68px] md:hidden md:w-[360px] md:h-[calc(100vh-68px)] md:top-[68px] md:flex md:z-50`}>
        <div className='flex justify-between items-center p-4 md:p-6'>
          <h2 className='font-medium text-lg md:text-xl'>My Order</h2>
          <div>
            <XMarkIcon
              className='h-6 w-6 text-black cursor-pointer'
              onClick={() => context?.closeCheckoutSideMenu()}></XMarkIcon>
          </div>
        </div>
        <div className='px-4 md:px-6 overflow-y-scroll flex-1'>
          {
            context?.cartProducts?.map(product => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images}
                price={product.price}
                handleDelete={handleDelete}
              />
            ))
          }
        </div>
        <div className='px-4 md:px-6 mb-6'>
          <p className='flex justify-between items-center mb-2'>
            <span className='font-light'>Total:</span>
            <span className='font-medium text-2xl'>${totalPrice(context?.cartProducts || [])}</span>
          </p>
          <button 
            className='bg-black py-3 text-white w-full rounded-lg hover:bg-black/80 transition-colors'
            onClick={() => handleCheckout()}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}

export default CheckoutSideMenu
