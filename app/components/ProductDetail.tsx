'use client'

import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '@/app/providers'

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)

  return (
    <>
      {/* Overlay for mobile */}
      {context?.isProductDetailOpen && (
        <div
          className='fixed inset-0 bg-black/50 md:hidden z-40'
          onClick={() => context?.closeProductDetail()}
        />
      )}
      <aside
        className={`${context?.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white w-full sm:w-[360px] h-full sm:h-[calc(100vh-68px)] sm:top-[68px] md:hidden md:w-[360px] md:h-[calc(100vh-68px)] md:top-[68px] md:flex md:z-50`}>
        <div className='flex justify-between items-center p-4 md:p-6'>
          <h2 className='font-medium text-lg md:text-xl'>Detail</h2>
          <div>
            <XMarkIcon
              className='h-6 w-6 text-black cursor-pointer'
              onClick={() => context?.closeProductDetail()}></XMarkIcon>
          </div>
        </div>
        <figure className='px-4 md:px-6'>
          <img
            className='w-full h-full rounded-lg'
            src={context?.productToShow.images}
            alt={context?.productToShow.title} />
        </figure>
        <p className='flex flex-col p-4 md:p-6'>
          <span className='font-medium text-2xl mb-2'>${context?.productToShow.price}</span>
          <span className='font-medium text-base'>{context?.productToShow.title}</span>
          <span className='font-light text-sm'>{context?.productToShow.description}</span>
        </p>
      </aside>
    </>
  )
}

export default ProductDetail
