import { Button } from '@/components/ui/button'
import { SigninForm } from './_components/signin-form'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div className='mt-4'>
      <div className='container'>
        <h1 className='text-3xl font-bold tracking-tight'>Sign In</h1>
        <div className='bg-muted my-4 h-1' />
        {/* Sign in form */}

        <SigninForm />

        {/* OAuth Links */}

        {/* Go To Signin Link */}
        <div className='bg-muted my-4 h-1' />
        <p>
          Don&apos;t have an account? Click{' '}
          <Button variant='link' size='sm' className='px-0' asChild>
            <Link href='/auth/signup' className='text-red-500'>
              here
            </Link>
          </Button>{' '}
          to sign up.
        </p>

        {/* Forgot Password Dialog */}
      </div>
    </div>
  )
}

export default SignUpPage
