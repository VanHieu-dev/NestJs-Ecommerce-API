import { UserResponse } from 'src/auth/auth.dto'
import { IUserRepository } from './user.repository.interface'
import { PrismaService } from 'src/shared/services/prisma.services'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  findUserById(id: number): Promise<UserResponse | null> {
    return this.prisma.user.findUnique({ where: { id: id } })
  }
  findAll(): Promise<UserResponse[]> {
    return this.prisma.user.findMany()
  }
}
