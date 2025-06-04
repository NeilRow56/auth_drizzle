/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SigninSchema } from './validators/signin-validator'
import * as v from 'valibot'
import * as schema from '@/drizzle/schema'
import { findUserByEmail } from './resources/user-queries'
import * as argon2 from 'argon2'
import db from './drizzle'

const nextAuth = NextAuth({
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
    async jwt({ token, user, trigger, session }) {
      console.log(user)
      if (user?.id) token.id = user.id
      if (user?.role) token.role = user.role

      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role

      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output
          // Look for our user in the database
          const user = await findUserByEmail(email)
          if (!user) return null

          if (!user.password) return null

          const passwordsMatch = await argon2.verify(user.password, password)

          if (passwordsMatch) {
            // The passord is renamed to _ so that it does not conflict with the password above. We are return the user without the password information
            const { password: _, ...userWithoutPassword } = user

            return userWithoutPassword
          }
        }

        return null
      }
    })
  ]
})

export const { signIn, signOut, auth, handlers } = nextAuth
