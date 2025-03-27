import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface TokenStore {
  token: string
  role: string
  name: string
  userId: string
  setToken: (token: string) => void
  setRole: (role: string) => void
  setName: (name: string) => void
  setUserId: (userId: string) => void
  reset: () => void 
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        role: '',
        name: '',
        userId: '',
        
        setToken: (token: string) => set(() => {
          console.log("Setting token:", token);
          return { token };
        }),
        setRole: (role: string) => set(() => {
          console.log("Setting role:", role);
          return { role };
        }),
        setName: (name: string) => set(() => {
          console.log("Setting name:", name);
          return { name };
        }),
        setUserId: (userId: string) => set(() => {
          console.log("Setting userId:", userId);
          return { userId };
        }),
        reset: () => set(() => ({ token: '', role: '', name: '', userId: '' })), // Ensure all are cleared
      }),
      {
        name: 'user-store',
      },
    ),
  ),
)

export default useTokenStore
