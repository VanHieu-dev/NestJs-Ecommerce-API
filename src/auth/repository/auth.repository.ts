import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.services'
import { IAuthRepository } from './auth.repository.interface'
import { ICreateUser } from 'src/interface/user.interface'
import { UserResponse } from 'src/shared/types/user.type'

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
  findUserByEmail(email: string): Promise<UserResponse | null> {
    return this.prisma.user.findUnique({ where: { email: email } })
  }
}
