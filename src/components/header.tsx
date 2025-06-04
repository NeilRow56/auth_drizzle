import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { NavButtonMenu } from './nav-button-menu'
import { HomeIcon, UsersRound } from 'lucide-react'
import { NavButton } from './nav-button'
import { NavbarLinks } from './navbar-links'

// import { NavButtonMenu } from './nav-button.menu'

export function Header() {
  return (
    <header className='animate-slide bg-background sticky top-0 z-20 h-14 border-b p-2'>
      <div className='flex h-10 w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <NavButton href='/tickets' label='Home' icon={HomeIcon} />

          <Link
            href='/'
            className='ml-0 flex items-center justify-center gap-2'
            title='Home'
          >
            <h1 className='m-0 hidden text-xl font-bold sm:block'>
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <NavbarLinks />

          <NavButtonMenu
            icon={UsersRound}
            label='Customers Menu'
            choices={[
              { title: 'Search Customers', href: '/customers' },
              { title: 'New Customer', href: '/customers/form' }
            ]}
          />

          <Button
            variant='ghost'
            size='icon'
            aria-label='LogOut'
            title='LogOut'
            className='rounded-full'
            asChild
          >
            <Link href='/'>Extra</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
