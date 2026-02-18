import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.services'
import { RoleService } from './roles.service'
import { hash } from 'src/utils/password'
import { RegisterBodyDTO } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService,
  ) {}

  async register(body: RegisterBodyDTO) {
    try {
      const clientRoleID = await this.roleService.getClientRoleId()
      const hashPassword = await hash(body.password)
      const checkUserExit = await this.prismaService.user.findUnique({
        where: { email: body.email },
      })
      if (checkUserExit) {
        throw new ConflictException('Email da ton tai')
      }
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hashPassword,
          phoneNumber: body.phoneNumber,
          roleId: clientRoleID,
        },
        omit: {
          // password: true,
          totpSecret: true,
        },
      })
      return user
      // return {
      //   ...user,
      //   createdAt: user.createdAt.toISOString(),
      //   updatedAt: user?.updatedAt.toISOString(),
      //   deletedAt: user?.deletedAt?.toISOString() ?? null,
      // }
    } catch (error) {
      console.log('co vao day')
      throw error
    }
  }
}
