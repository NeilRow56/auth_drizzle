/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SigninSchema } from './validators/signin-validator'
import * as v from 'valibot'
import { findUserByEmail } from './resources/user-queries'
import * as argon2 from 'argon2'
import { authConfig } from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        let user = null

        const parsedCredentials = v.safeParse(SigninSchema, credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output
          // Look for our user in the database
          user = await findUserByEmail(email)
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
  ],
  trustHost: true
})
