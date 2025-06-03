/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SigninSchema } from './validators/signin-validator'
import * as v from 'valibot'
import { findUserByEmail } from './resources/user-queries'
import * as argon2 from 'argon2'

const nextAuth = NextAuth({
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/auth/signin' },
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
