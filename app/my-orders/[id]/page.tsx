'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '@/app/providers'
import Layout from '@/app/components/Layout'
import OrderCard from '@/app/components/OrderCard'

export default function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const params = useParams()
  
  let index = parseInt(params.id as string) || 0
  if (params.id === 'last') {
    index = (context?.order?.length || 1) - 1
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-11/12 sm:w-96 md:w-full md:max-w-screen-lg mb-6 px-4'>
        <Link href='/my-orders' className='absolute left-0 sm:left-auto'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1 className='font-medium text-lg sm:text-xl'>My Order</h1>
      </div>
      <div className='flex flex-col w-11/12 sm:w-96 md:w-full md:max-w-screen-lg px-4 sm:px-0'>
        {
          context?.order?.[index]?.products?.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
            />
          ))
        }
      </div>
    </Layout>
  )
}
