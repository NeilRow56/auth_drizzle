export default async function RepairShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='my-36 flex min-h-screen w-full justify-center'>
      {children}
    </main>
  )
}
