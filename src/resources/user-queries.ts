/* eslint-disable @typescript-eslint/no-unused-vars */
import 'server-only'

import db from '@/drizzle'
import { lower, users } from '@/drizzle/schema'
import { eq, getTableColumns } from 'drizzle-orm'

export const findUserByEmail = async (
  email: string
): Promise<typeof users.$inferSelect | null> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()))
    .then(res => res[0] ?? null)

  return user
}

// type UserWithoutPassword = Omit<typeof users.$inferSelect, 'password'>

// export const findUserById = async (
//   id: string
// ): Promise<UserWithoutPassword> => {
//   const { password, ...rest } = getTableColumns(users)

//   const user = await db
//     .select(rest)
//     .from(users)
//     .where(eq(users.id, id))
//     .then(res => res[0] ?? null)

//   //The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

//   if (!user) throw new Error('User not found.')

//   return user
// }

// export const findUserByAuth = async () => {
//   const session = await auth();

//   const sessionUserId = session?.user?.id;
//   if (!sessionUserId) throw new Error("Unauthorized");

//   const { password, ...rest } = getTableColumns(users);

//   const user = await db
//     .select(rest)
//     .from(users)
//     .where(eq(users.id, sessionUserId))
//     .then((res) => res[0] ?? null);

//   if (!user) throw new Error("User not found.");

//   return user;
// };
