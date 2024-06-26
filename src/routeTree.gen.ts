/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as appAppLayoutImport } from './routes/(app)/_appLayout'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()
const RegisterLazyImport = createFileRoute('/register')()
const LoginLazyImport = createFileRoute('/login')()
const appAppLayoutNewPageLazyImport = createFileRoute(
  '/(app)/_appLayout/newPage',
)()
const appAppLayoutCalendarLazyImport = createFileRoute(
  '/(app)/_appLayout/calendar',
)()

// Create/Update Routes

const appRoute = appImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const RegisterLazyRoute = RegisterLazyImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const appAppLayoutRoute = appAppLayoutImport.update({
  id: '/_appLayout',
  getParentRoute: () => appRoute,
} as any)

const appAppLayoutNewPageLazyRoute = appAppLayoutNewPageLazyImport
  .update({
    path: '/newPage',
    getParentRoute: () => appAppLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_appLayout.newPage.lazy').then((d) => d.Route),
  )

const appAppLayoutCalendarLazyRoute = appAppLayoutCalendarLazyImport
  .update({
    path: '/calendar',
    getParentRoute: () => appAppLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_appLayout.calendar.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/(app)': {
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_appLayout': {
      preLoaderRoute: typeof appAppLayoutImport
      parentRoute: typeof appRoute
    }
    '/(app)/_appLayout/calendar': {
      preLoaderRoute: typeof appAppLayoutCalendarLazyImport
      parentRoute: typeof appAppLayoutImport
    }
    '/(app)/_appLayout/newPage': {
      preLoaderRoute: typeof appAppLayoutNewPageLazyImport
      parentRoute: typeof appAppLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  LoginLazyRoute,
  RegisterLazyRoute,
  appRoute.addChildren([
    appAppLayoutRoute.addChildren([
      appAppLayoutCalendarLazyRoute,
      appAppLayoutNewPageLazyRoute,
    ]),
  ]),
])

/* prettier-ignore-end */
