'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCartContext } from '@/app/providers'
import Layout from '@/app/components/Layout'
import Card from '@/app/components/Card'
import ProductDetail from '@/app/components/ProductDetail'

export default function Home() {
  const context = useContext(ShoppingCartContext)
  const router = useRouter()

  useEffect(() => {
    const account = localStorage.getItem('account')
    const signOut = localStorage.getItem('sign-out')
    
    const parsedAccount = account ? JSON.parse(account) : {}
    const parsedSignOut = signOut ? JSON.parse(signOut) : false
    
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage
    const isUserSignOut = parsedSignOut
    
    if (!hasUserAnAccount || isUserSignOut) {
      router.push('/sign-in')
    }
  }, [router])

  const renderView = () => {
    if (context?.filteredItems && context.filteredItems.length > 0) {
      return (
        context.filteredItems.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div className='text-gray-500 text-center py-8'>We don&apos;t have anything :(</div>
      )
    }
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-11/12 sm:w-96 md:w-full md:max-w-screen-lg mb-4 px-4'>
        <h1 className='font-medium text-lg sm:text-xl md:text-2xl'>Exclusive Products</h1>
      </div>
      <input
        type="text"
        placeholder='Search a product'
        className='rounded-lg border border-black w-11/12 sm:w-96 md:w-full md:max-w-screen-lg p-4 mb-4 focus:outline-none px-4'
        onChange={(event) => context?.setSearchByTitle(event.target.value)} />
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full px-4 sm:px-0 max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}
