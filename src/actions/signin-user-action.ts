'use server'

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 }

export async function signinUserAction(values: unknown): Promise<Res> {
  // The auth logic will be in the Authjs configuration files
  console.log(values)
  return { success: true }
}
