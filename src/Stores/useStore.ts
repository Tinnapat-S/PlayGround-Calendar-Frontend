import { create } from 'zustand'

type ApplicationState = {
  loaded: boolean
  loading: boolean
  initialized: boolean
}

type ApplicationActions = {
  setLoading: (status: boolean) => void
  setInitialized: (status: boolean) => void
}

const initialState: ApplicationState = {
  loaded: false,
  loading: false,
  initialized: false,
}

export const useApplicationStore = create<
  ApplicationState & ApplicationActions
>((set) => ({
  ...initialState,
  setLoading: (status: boolean) => {
    set({ loading: status, loaded: !status })
  },
  setInitialized(status: boolean) {
    set({ initialized: status })
  },
}))
