import { DrizzleAdapter } from '@auth/drizzle-adapter'
import * as schema from '@/drizzle/schema'
// import Resend from 'next-auth/providers/resend'

import db from './drizzle'

import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens
  }),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/auth/signin' },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request
      // By using !!, you can convert a non-boolean value to a boolean based on its current value.
      const isLoggedIn = !!auth?.user
      const isOnProfile = nextUrl.pathname.startsWith('/profile')
      const isOnProtected = nextUrl.pathname.startsWith('/protected')
      const isOnAuth = nextUrl.pathname.startsWith('/auth')

      if (isOnProfile) {
        if (isLoggedIn) return true
        return Response.redirect(new URL('/auth/signin', nextUrl))
      }
      if (isOnProtected) {
        if (isLoggedIn) return true
        return Response.redirect(new URL('/auth/signin', nextUrl))
      }

      if (isOnAuth) {
        if (!isLoggedIn) return true
        return Response.redirect(new URL('/profile', nextUrl))
      }

      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      if (user?.id) token.id = user.id
      if (user?.role) token.role = user.role

      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role

      return session
    },
    signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        if (user.emailVerified) return true
      }

      return false
    }
  },
  providers: []
} satisfies NextAuthConfig
