import { UserType } from 'src/types/type'

export abstract class IUserRepository {
  abstract findAll(): Promise<Omit<UserType, 'password' | 'totpSecret'>[]>
  abstract findUserById(
    id: number,
  ): Promise<Omit<UserType, 'password' | 'totpSecret'> | null>
}
