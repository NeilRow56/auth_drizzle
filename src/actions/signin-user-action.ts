'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 }

export async function signinUserAction(values: unknown): Promise<Res> {
  // The auth logic will be in the Authjs configuration files
  try {
    if (
      typeof values !== 'object' ||
      values === null ||
      Array.isArray(values)
    ) {
      throw new Error('Invalid JSON Object')
    }
    await signIn('credentials', { ...values, redirect: false })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return {
            success: false,
            error: 'Invalid email or password',
            statusCode: 401
          }
        case 'AccessDenied':
          return {
            success: false,
            error:
              'Please verify your email, sign up again to resend verification email',
            statusCode: 401
          }

        default:
          return {
            success: false,
            error: 'Oops. Something went wrong',
            statusCode: 500
          }
      }
    }
    console.error(error)
    return {
      success: false,
      error: 'Internal Server Error. Something went wrong!',
      statusCode: 500
    }
  }
}
