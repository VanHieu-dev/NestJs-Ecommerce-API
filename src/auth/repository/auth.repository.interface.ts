import { ICreateUser } from 'src/interface/user.interface'
import { UserResponse } from 'src/shared/types/user.type'

export abstract class IAuthRepository {
  abstract createUser(newUser: ICreateUser): Promise<UserResponse>
  abstract findUserByEmail(email: string): Promise<UserResponse | null>
}
