import { UserType } from 'src/auth/auth.dto'

export abstract class IUserRepository {
  abstract findAll(): Promise<Omit<UserType, 'password' | 'totpSecret'>[]>
  abstract findUserById(
    id: number,
  ): Promise<Omit<UserType, 'password' | 'totpSecret'> | null>
}
