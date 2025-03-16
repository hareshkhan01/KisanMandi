import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Token {
  token: string
  setToken: (data: string) => void
}

const useTokenStore = create<Token>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        setToken: (data: string) => set(() => ({ token: data })),
      }),
      {
        name: 'token',
      },
    ),
  ),
)

export default useTokenStore