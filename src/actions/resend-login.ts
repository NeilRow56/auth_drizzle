'use server'

import { signIn } from '@/auth'

export default async function resendLogin(formData: FormData) {
  console.log(formData)
  await signIn('Resend', formData)
}
