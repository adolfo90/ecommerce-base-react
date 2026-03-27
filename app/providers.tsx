'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    id: number
    name: string
  }
}

export interface CartItem extends Product {
  id: number
}

export interface Order {
  date: string
  products: CartItem[]
  totalProducts: number
  totalPrice: number
}

export interface Account {
  name?: string
  email?: string
  password?: string
}

interface ShoppingCartContextType {
  count: number
  setCount: (count: number) => void
  openProductDetail: () => void
  closeProductDetail: () => void
  isProductDetailOpen: boolean
  productToShow: Product | Record<string, any>
  setProductToShow: (product: Product) => void
  cartProducts: CartItem[]
  setCartProducts: (products: CartItem[]) => void
  isCheckoutSideMenuOpen: boolean
  openCheckoutSideMenu: () => void
  closeCheckoutSideMenu: () => void
  order: Order[]
  setOrder: (orders: Order[]) => void
  items: Product[] | null
  setItems: (items: Product[]) => void
  searchByTitle: string | null
  setSearchByTitle: (search: string | null) => void
  filteredItems: Product[] | null
  searchByCategory: string | null
  setSearchByCategory: (category: string | null) => void
  account: Account
  setAccount: (account: Account) => void
  signOut: boolean
  setSignOut: (signOut: boolean) => void
}

export const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined)

export const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return

  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}))
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
  }
}

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account>({})
  const [signOut, setSignOut] = useState(false)
  const [count, setCount] = useState(0)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const [productToShow, setProductToShow] = useState<Product | Record<string, any>>({})
  const [cartProducts, setCartProducts] = useState<CartItem[]>([])
  const [order, setOrder] = useState<Order[]>([])
  const [items, setItems] = useState<Product[] | null>(null)
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null)
  const [searchByTitle, setSearchByTitle] = useState<string | null>(null)
  const [searchByCategory, setSearchByCategory] = useState<string | null>(null)

  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  useEffect(() => {
    initializeLocalStorage()
    const accountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    
    if (accountInLocalStorage) {
      setAccount(JSON.parse(accountInLocalStorage))
    }
    if (signOutInLocalStorage) {
      setSignOut(JSON.parse(signOutInLocalStorage))
    }
  }, [])

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Failed to fetch products:', error))
  }, [])

  const filteredItemsByTitle = (items: Product[] | null, searchByTitle: string | null) => {
    if (!items || !searchByTitle) return items
    return items.filter(item => 
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    )
  }

  const filteredItemsByCategory = (items: Product[] | null, searchByCategory: string | null) => {
    if (!items || !searchByCategory) return items
    return items.filter(item => 
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    )
  }

  const filterBy = (searchType: string | null, items: Product[] | null, searchByTitle: string | null, searchByCategory: string | null): Product[] | null => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }
    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)?.filter(item => 
        item.title.toLowerCase().includes(searchByTitle?.toLowerCase() || '')
      ) || null
    }
    return items
  }

  useEffect(() => {
    if (searchByTitle && searchByCategory) {
      setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    } else if (searchByTitle && !searchByCategory) {
      setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    } else if (!searchByTitle && searchByCategory) {
      setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    } else {
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }
  }, [items, searchByTitle, searchByCategory])

  const value: ShoppingCartContextType = {
    count,
    setCount,
    openProductDetail,
    closeProductDetail,
    isProductDetailOpen,
    productToShow,
    setProductToShow,
    cartProducts,
    setCartProducts,
    isCheckoutSideMenuOpen,
    openCheckoutSideMenu,
    closeCheckoutSideMenu,
    order,
    setOrder,
    items,
    setItems,
    searchByTitle,
    setSearchByTitle,
    filteredItems,
    searchByCategory,
    setSearchByCategory,
    account,
    setAccount,
    signOut,
    setSignOut,
  }

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
