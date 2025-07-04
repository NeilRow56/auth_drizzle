import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { USER_ROLES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { findAllUsers } from '@/resources/user-queries'
import { ArrowLeftSquareIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { ChangeUserRoleInput } from './_components/change-user-role-input'
import { ToggleEmailVerifiedInput } from './_components/toggle-email-verified-input'

export default async function Page() {
  const session = await auth()

  if (session?.user?.role !== USER_ROLES.ADMIN) redirect('/profile')

  const users = await findAllUsers()

  return (
    <main className='mt-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='text-primary text-3xl font-bold tracking-tight'>
            Admin Panel
          </h1>
          <ProfileButton />
        </div>

        <div className='bg-muted my-4 h-1' />
        <h2 className='text-primary text-2xl font-bold tracking-tight'>
          All Users
        </h2>

        <div className='bg-muted my-4 h-1' />
        <table className='mt-4 w-full table-auto divide-y'>
          <thead>
            <tr className='divide-x'>
              <th className='bg-primary px-6 py-3 text-start text-white'>id</th>
              <th className='bg-primary px-6 py-3 text-start text-white'>
                name
              </th>
              <th className='bg-primary px-6 py-3 text-start text-white'>
                email
              </th>
              <th className='bg-primary px-6 py-3 text-start text-white'>
                email verified
              </th>
              <th className='bg-primary px-6 py-3 text-start text-white'>
                role
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className={cn('divide-x', {
                  'bg-primary/10': user.role === USER_ROLES.ADMIN
                })}
              >
                <td className='px-6 py-3'>{user.id}</td>
                <td
                  className={cn('px-6 py-3', {
                    'opacity-50': user.name === null
                  })}
                >
                  {user.name ?? 'NULL'}
                </td>
                <td className='px-6 py-3'>{user.email}</td>
                <td className='px-6 py-3'>
                  {/* {!!user.emailVerified ? 'Yes' : 'No'} */}
                  <ToggleEmailVerifiedInput
                    email={user.email}
                    emailVerified={user.emailVerified}
                    isAdmin={user.role === USER_ROLES.ADMIN}
                  />
                </td>
                <td className='px-6 py-3 uppercase'>
                  <ChangeUserRoleInput
                    email={user.email}
                    currentRole={user.role}
                    isAdmin={user.role === USER_ROLES.ADMIN}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

const ProfileButton = () => {
  return (
    <Button size='lg' asChild>
      <Link href='/profile'>
        <ArrowLeftSquareIcon className='mr-2' />
        Profile
      </Link>
    </Button>
  )
}
