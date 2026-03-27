'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { ShoppingCartContext } from '@/app/providers'
import Layout from '@/app/components/Layout'
import OrdersCard from '@/app/components/OrdersCard'

export default function MyOrders() {
  const context = useContext(ShoppingCartContext)

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-11/12 sm:w-96 md:w-full md:max-w-screen-lg mb-4 px-4'>
        <h1 className='font-medium text-lg sm:text-xl md:text-2xl'>My Orders</h1>
      </div>
      <div className='w-11/12 sm:w-96 md:w-full md:max-w-screen-lg px-4 sm:px-0'>
        {
          context?.order?.map((order, index) => (
            <Link key={index} href={`/my-orders/${index}`}>
              <OrdersCard
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts} />
            </Link>
          ))
        }
      </div>
    </Layout>
  )
}
