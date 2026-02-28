import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { IAuthRepository } from './auth.repository.interface'
import { ICreateUser } from 'src/interface/user.interface'
import {
  TypeOfVerificationCodeType,
  UserResponse,
  VerificationCodeType,
} from 'src/types/type'

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(newUser: ICreateUser): Promise<UserResponse> {
    const result = await this.prisma.user.create({
      data: newUser,
      omit: {
        totpSecret: true,
      },
    })
    return result
  }
  findUser(
    uniqueObject: { email: string } | { id: number },
  ): Promise<UserResponse | null> {
    return this.prisma.user.findUnique({ where: uniqueObject })
  }
  createVerificationCode(
    data: Pick<VerificationCodeType, 'email' | 'type' | 'code' | 'expiresAt'>,
  ): Promise<VerificationCodeType> {
    return this.prisma.verificationCode.upsert({
      create: data,
      update: {
        code: data.code,
        expiresAt: data.expiresAt,
      },
      where: {
        email_type: {
          email: data.email,
          type: data.type,
        },
      },
    })
  }
  verifyOTP(
    email: string,
    type: TypeOfVerificationCodeType,
  ): Promise<VerificationCodeType | null> {
    return this.prisma.verificationCode.findUnique({
      where: {
        email_type: {
          email: email,
          type: type,
        },
      },
    })
  }
}
