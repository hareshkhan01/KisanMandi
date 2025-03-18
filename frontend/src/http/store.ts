import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface TokenStore {
  token: string
  role: string
  name: string
  setToken: (token: string) => void
  setRole: (role: string) => void
  setName: (name: string) => void
  reset: () => void 
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        role: '',
        name: '',
        setToken: (token: string) => set(() => ({ token })),
        setRole: (role: string) => set(() => ({ role })),
        setName: (name: string) => set(() => ({ name })),
        reset: () => set(() => ({ token: '', role: '', name: '' })), 
      }),
      {
        name: 'user-store', 
      },
    ),
  ),
)

export default useTokenStore
