'use client'

import { useContext, useState, useRef, useEffect } from 'react'
import { ShoppingCartContext } from '@/app/providers'
import Layout from '@/app/components/Layout'

export default function MyAccount() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const [parsedAccount, setParsedAccount] = useState<any>({})
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const account = localStorage.getItem('account')
    if (account) {
      setParsedAccount(JSON.parse(account))
    }
  }, [])

  const editAccount = () => {
    if (!form.current) return
    
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context?.setAccount(data as any)
  }

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-11/12 sm:w-80 gap-4'>
        <p>
          <span className='font-light text-sm'>Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className='border border-black rounded-lg mt-6 py-3 hover:bg-gray-50 transition-colors'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-11/12 sm:w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Peter"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="hi@helloworld.com"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password:</label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="******"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <button
          type="button"
          className='bg-black text-white w-full rounded-lg py-3 hover:bg-black/80 transition-colors'
          onClick={() => { setView('user-info'); editAccount() }}>
          Save
        </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>
      <h1 className="font-medium text-lg sm:text-xl text-center mb-6 w-11/12 sm:w-80">My Account</h1>
      {renderView()}
    </Layout>
  )
}
