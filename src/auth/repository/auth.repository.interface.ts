import { ICreateUser } from 'src/interface/user.interface'
import { UserResponse, VerificationCodeType } from 'src/types/type'

export abstract class IAuthRepository {
  abstract createUser(newUser: ICreateUser): Promise<UserResponse>
  abstract findUser(
    uniqueObject: { email: string } | { id: number },
  ): Promise<UserResponse | null>
  abstract createVerificationCode(
    data: Pick<VerificationCodeType, 'email' | 'type' | 'code' | 'expiresAt'>,
  ): Promise<VerificationCodeType>
}
