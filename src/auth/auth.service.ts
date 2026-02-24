import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { RoleService } from './roles.service'
import { hash } from 'src/utils/password'
import { AuthRepository } from './repository/auth.repository'
import { ICreateUser, RegisterBodyType } from 'src/interface/user.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    @Inject('AUTH_REPOSITORY')
    private readonly authRepository: AuthRepository,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const existingUser = await this.authRepository.findUserByEmail(body.email)
      if (existingUser) {
        throw new ConflictException('Email da ton tai')
      }
      const clientRoleID = await this.roleService.getClientRoleId()
      const hashPassword = await hash(body.password)

      const newUser: ICreateUser = {
        email: body.email,
        name: body.name,
        password: hashPassword,
        phoneNumber: body.phoneNumber,
        roleId: clientRoleID,
      }
      return await this.authRepository.createUser(newUser)
    } catch (error) {
      console.log('co vao day')
      throw error
    }
  }
}
