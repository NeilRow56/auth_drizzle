'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { SigninInput, SigninSchema } from '@/validators/signin-validator'
import { signinUserAction } from '@/actions/signin-user-action'

export const SigninForm = () => {
  const form = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
    defaultValues: { email: '', password: '' }
  })
  const { handleSubmit, control, formState, setError } = form
  const submit = async (values: SigninInput) => {
    const res = await signinUserAction(values)

    if (res.success) {
      window.location.href = '/profile'
    } else {
      switch (res.statusCode) {
        case 401:
          setError('password', { message: res.error })
          break
        case 500:

        default:
          const error =
            res.error || 'Internal Server Error. Something went wrong!'
          setError('password', { message: error })
      }
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(submit)}
          className='w-[400px] space-y-4'
          autoComplete='false'
        >
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='e.g. john.smith@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='e.g. ********'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={formState.isSubmitting}
            className='w-full'
          >
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  )
}
