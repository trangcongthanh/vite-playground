import { LazyExoticComponent } from 'react'
import { create } from 'zustand'

type AppRouteState = {
  components: LazyExoticComponent<() => JSX.Element>[]
  registerComponent: (component: LazyExoticComponent<() => JSX.Element>) => void
}

export const useAppRoutes = create<AppRouteState>((set) => ({
  components: [],
  registerComponent: (component) => set((state) => ({ components: [...state.components, component] })),
}))

export function registerComponent(component: LazyExoticComponent<() => JSX.Element>) {
  useAppRoutes.getState().registerComponent(component)
}
