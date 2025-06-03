import { Button } from '@/components/ui/button'
import { SignupForm } from './_components/signup-form'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div className='mt-4'>
      <div className='container'>
        <h1 className='text-3xl font-bold tracking-tight'>Sign Up</h1>
        <div className='bg-muted my-4 h-1' />
        {/* Sign up form */}

        <SignupForm />

        {/* OAuth Links */}

        {/* Go To Signin Link */}
        <div className='bg-muted my-4 h-1' />
        <p>
          Already have an account? Click{' '}
          <Button variant='link' size='sm' className='px-0' asChild>
            <Link href='/auth/signin' className='text-red-500'>
              here
            </Link>
          </Button>{' '}
          to sign in.
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
