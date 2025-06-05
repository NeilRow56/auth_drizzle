'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { UpdateUserDialog } from '@/app/profile/_dialogs/update-user-dialog'

const UserUpdate = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Register</Button>
      <UpdateUserDialog open={open} setOpen={setOpen} />
    </>
  )
}

export default UserUpdate
