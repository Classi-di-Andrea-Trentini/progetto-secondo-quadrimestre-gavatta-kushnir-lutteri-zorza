export type Root = Root2[]

export interface Root2 {
  id: string
  historyLow: HistoryLow
  deals: Deal[]
}

export interface HistoryLow {
  all: All
  y1: Y1
  m3: M3
}

export interface All {
  amount: number
  amountInt: number
  currency: string
}

export interface Y1 {
  amount: number
  amountInt: number
  currency: string
}

export interface M3 {
  amount: number
  amountInt: number
  currency: string
}

export interface Deal {
  shop: Shop
  price: Price
  regular: Regular
  cut: number
  voucher: any
  storeLow: StoreLow
  flag: string
  drm: Drm[]
  platforms: Platform[]
  timestamp: string
  expiry?: string
  url: string
}

export interface Shop {
  id: number
  name: string
}

export interface Price {
  amount: number
  amountInt: number
  currency: string
}

export interface Regular {
  amount: number
  amountInt: number
  currency: string
}

export interface StoreLow {
  amount: number
  amountInt: number
  currency: string
}

export interface Drm {
  id: number
  name: string
}

export interface Platform {
  id: number
  name: string
}
