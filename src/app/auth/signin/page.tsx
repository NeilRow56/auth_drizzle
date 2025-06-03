import { SigninForm } from './_components/signin-form'

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
      </div>
    </div>
  )
}

export default SignUpPage
