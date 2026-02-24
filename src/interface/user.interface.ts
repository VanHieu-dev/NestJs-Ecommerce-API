import { RegisterBodySchema } from 'src/auth/auth.model'
import z from 'zod'

export interface ICreateUser {
  email: string
  name: string
  password: string
  phoneNumber: string
  roleId: number
}
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
