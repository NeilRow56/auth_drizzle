'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignupInput, SignupSchema } from '@/validators/signup-validator'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { signupUserAction } from '@/actions/signup-user-action'
import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export const SignupForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const form = useForm<SignupInput>({
    resolver: valibotResolver(SignupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })
  const { handleSubmit, control, formState, setError } = form
  const submit = async (values: SignupInput) => {
    const res = await signupUserAction(values)

    if (res.success) {
      // setSuccess(true)
      router.push('/auth/signup/success')
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested

          for (const key in nestedErrors) {
            setError(key as keyof SignupInput, {
              message: nestedErrors[key]?.[0]
            })
          }
          break
        case 500:
        default:
          const error = res.error || 'Internal Server Error'
          setError('confirmPassword', { message: error })
      }
    }
  }

  if (success) {
    return (
      <Card className='min-w-[300px] bg-green-50 px-4'>
        <p className='tex-center text-primary text-2xl'>
          User successfully created! 🎉
        </p>

        <span className='text-primary'>
          Click{' '}
          <Button variant='link' size='sm' className='px-0' asChild>
            <Link href='/auth/signin' className='text-red-500'>
              here
            </Link>
          </Button>{' '}
          to sign in.
        </span>
      </Card>
    )
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className=''
                    type='text'
                    placeholder='e.g. John Smith'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            {form.formState.isSubmitting ? 'Submitting' : 'Sign up'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
