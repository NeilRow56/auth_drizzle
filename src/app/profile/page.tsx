import { auth } from '@/auth'
import { SignoutButton } from '@/components/signout-button'
import { Button } from '@/components/ui/button'
// import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
// import { LockIcon } from 'lucide-react'
import { User } from 'next-auth'
import Link from 'next/link'
// import Link from 'next/link'

const ProfilePage = async () => {
  const session = await auth()

  return (
    <div className='mt-4'>
      <div className='mx-auto max-w-7xl border p-2'>
        <div className='flex items-center justify-between'>
          <h1 className='px-8 text-3xl font-bold tracking-tight'>Profile</h1>
          Admin Button ?????
        </div>
        <div className='bg-muted my-4 h-1' />
        {!!session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
      </div>
    </div>
  )
}

export default ProfilePage

const SignedIn = ({ user }: { user: User }) => {
  return (
    <>
      <div className='flex items-center justify-between px-8'>
        <h2 className='text-2xl font-bold tracking-tight'>User Information</h2>
        UpDate user
      </div>

      <table className='mt-4 table-auto divide-y'>
        <thead>
          <tr className='divide-x'>
            <th className='bg-gray-50 px-6 py-3 text-start'>id</th>
            <th className='bg-gray-50 px-6 py-3 text-start'>name</th>
            <th className='bg-gray-50 px-6 py-3 text-start'>email</th>
            <th className='bg-gray-50 px-6 py-3 text-start'>role</th>
          </tr>
        </thead>

        <tbody>
          <tr className='divide-x'>
            <td className='px-6 py-3'>User ID</td>
            <td
              className={cn('px-6 py-3', {
                'opacity-50': user.name === null
              })}
            >
              {user.name ?? 'NULL'}
            </td>
            <td className='px-6 py-3'>{user.email}</td>
            <td className='px-6 py-3 uppercase'>User role</td>
          </tr>
        </tbody>
      </table>

      <div className='bg-muted my-2 h-1' />
      <SignoutButton />
    </>
  )
}

const SignedOut = () => {
  return (
    <div className='space-y-5 px-8'>
      <h2 className='text-2xl font-bold tracking-tight'>User Not Signed In</h2>

      <Button asChild>
        <Link href='/auth/signin'>Sign In</Link>
      </Button>
    </div>
  )
}
