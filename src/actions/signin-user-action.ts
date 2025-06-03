'use server'

import { signIn } from '@/auth'

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
    console.error(error)
    return {
      success: false,
      error: 'Internal Server Error. Something went wrong!',
      statusCode: 500
    }
  }
}
