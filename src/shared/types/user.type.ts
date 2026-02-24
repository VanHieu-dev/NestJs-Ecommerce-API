import { UserType } from 'src/auth/auth.dto'

export type UserResponse = Omit<UserType, 'password' | 'totpSecret'>
