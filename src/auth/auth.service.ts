import {
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'
import { RoleService } from './roles.service'
import { hash } from 'src/utils/password'
import { AuthRepository } from './repository/auth.repository'
import { ICreateUser } from 'src/interface/user.interface'
import { RegisterBodyType, SendOTPBodyType } from 'src/types/type'
import { generateOTP } from 'src/utils/generateOTP'
import { addMilliseconds } from 'date-fns'
import ms, { StringValue } from 'ms'
import { TypeOfVerificationCode } from 'src/shared/constant/constant'
import { EmailService } from 'src/shared/services/email.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    @Inject('AUTH_REPOSITORY')
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const verificationCode = await this.authRepository.verifyOTP(
        body.email,
        TypeOfVerificationCode.REGISTER,
      )
      if (!verificationCode || verificationCode.code !== body.code) {
        throw new UnprocessableEntityException([
          {
            path: 'Code',
            message: 'Ma OTP Khong hop le',
          },
        ])
      }
      if (verificationCode.expiresAt < new Date()) {
        throw new UnprocessableEntityException([
          {
            path: 'Code',
            message: 'Ma OTP da qua han',
          },
        ])
      }
      const existingUser = await this.authRepository.findUser({
        email: body.email,
      })
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

  async sendOTP(body: SendOTPBodyType) {
    //Dựa vào cái type trong body để biết sẽ làm những gì.
    //Type là : Register
    const user = await this.authRepository.findUser({
      email: body.email,
    })
    if (user) {
      throw new ConflictException('Email da ton tai')
    }

    const code = generateOTP()
    await this.emailService.sendOTP({ email: body.email, code })
    const verificationCode = await this.authRepository.createVerificationCode({
      email: body.email,
      code,
      type: body.type,
      expiresAt: addMilliseconds(
        new Date(),
        ms(process.env.OTP_EXPIRES_IN as StringValue),
      ),
    })
    return verificationCode
  }
}
