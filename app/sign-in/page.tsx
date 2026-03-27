'use client'

import { useContext, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCartContext } from '@/app/providers'
import Layout from '@/app/components/Layout'

export default function SignIn() {
  const context = useContext(ShoppingCartContext)
  const router = useRouter()
  const [view, setView] = useState('user-info')
  const form = useRef<HTMLFormElement>(null)
  const [parsedAccount, setParsedAccount] = useState<any>({})

  useEffect(() => {
    const account = localStorage.getItem('account')
    if (account) {
      setParsedAccount(JSON.parse(account))
    }
  }, [])

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context?.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context?.setSignOut(false)
    router.push('/')
  }

  const createAnAccount = (e: React.MouseEvent) => {
    e.preventDefault()
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
    handleSignIn()
  }

  const renderLogIn = () => {
    return (
      <div className='flex flex-col w-11/12 sm:w-80 gap-4'>
        <p className='break-words'>
          <span className='font-light text-sm'>Email: </span>
          <span className='text-sm'>{parsedAccount?.email}</span>
        </p>
        <p className='break-words'>
          <span className='font-light text-sm'>Password: </span>
          <span className='text-sm'>{parsedAccount?.password}</span>
        </p>
        <button
          className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-2'
          onClick={() => handleSignIn()}
          disabled={!hasUserAnAccount}>
          Log in
        </button>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4 cursor-pointer' onClick={() => {}}>Forgot my password</a>
        </div>
        <button
          className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg py-3 w-full'
          onClick={() => setView('create-user-info')}
          disabled={hasUserAnAccount}>
          Sign up
        </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
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
          className='bg-black text-white w-full rounded-lg py-3'
          onClick={(e) => createAnAccount(e)}>
          Create
        </button>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <Layout>
      <h1 className="font-medium text-lg sm:text-xl text-center mb-6 w-11/12 sm:w-80">Welcome</h1>
      {renderView()}
    </Layout>
  )
}
