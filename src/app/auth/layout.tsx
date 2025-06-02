export default async function RepairShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mx-auto w-full max-w-7xl items-center'>
      <main className=''>{children}</main>
    </div>
  )
}
