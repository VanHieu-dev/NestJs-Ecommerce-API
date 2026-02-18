import { UserResponse } from 'src/auth/auth.dto'

export abstract class IUserRepository {
  abstract findAll(): Promise<UserResponse[]>
  abstract findUserById(id: number): Promise<UserResponse | null>
}
