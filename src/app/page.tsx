export default function Home() {
  return (
    <main className='mt-4'>
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold tracking-tight'>Welcome</h1>

        <div className='bg-muted my-2 h-1' />
        <h2 className='text-2xl font-bold tracking-tight'>Features</h2>

        <ul className='mt-4 grid grid-cols-2 gap-2'>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            User in Client Components
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            User in Server Components
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Credentials Provider
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Protect Pages
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Signout
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Google OAuth Provider
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Github OAuth Provider
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Auth.js Drizzle Adapter
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Extend Session Information
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Auth.js Extend Types
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Auth.js Session Events
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Update Session (Client)
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Auth.js Session Callbacks
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Custom errors
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Account Linking
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Middleware
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            User Roles
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Admin Dashboard
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Email Verification
          </li>
          <li className='hover:bg-muted line-clamp-1 p-2 break-all shadow'>
            Password Reset
          </li>
        </ul>

        <div className='bg-muted my-2 h-1' />
        <h2 className='text-2xl font-bold tracking-tight'>Created With</h2>

        <ul className='mt-4 grid grid-cols-4 gap-2'>
          <li className='hover:bg-muted p-2 shadow'>Next.js</li>
          <li className='hover:bg-muted p-2 shadow'>Tailwind</li>
          <li className='hover:bg-muted p-2 shadow'>shadcn/ui</li>
          <li className='hover:bg-muted p-2 shadow'>Auth.js</li>
          <li className='hover:bg-muted p-2 shadow'>Drizzle ORM</li>
          <li className='hover:bg-muted p-2 shadow'>NeonDB</li>
          <li className='hover:bg-muted p-2 shadow'>PostgreSQL</li>
          <li className='hover:bg-muted p-2 shadow'>Valibot</li>
          <li className='hover:bg-muted p-2 shadow'>TypeScript</li>
        </ul>
      </div>
    </main>
  )
}
