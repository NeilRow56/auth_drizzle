import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <main className='mt-4'>
      <div className='container mx-auto'>
        <div className='text-3xl font-bold tracking-tight'>Sign Up</div>

        <div className='bg-muted my-2 h-1' />
        <p>Verification email has been sent!</p>
        <p>Please check your email to verify your account.</p>

        <div className='bg-muted my-2 h-1' />
        <span>
          Click{' '}
          <Button variant='link' size='sm' className='px-0' asChild>
            <Link href='/'>here</Link>
          </Button>{' '}
          to go back to the home page.
        </span>
        <span>
          <h3>
            This page can be safely closed once your account has been verified
          </h3>
        </span>
      </div>
    </main>
  )
}
