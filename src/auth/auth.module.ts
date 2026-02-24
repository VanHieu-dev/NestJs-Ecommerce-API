import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { RoleService } from './roles.service'
import { AuthRepository } from './repository/auth.repository'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    RoleService,
    AuthRepository,
    {
      provide: 'AUTH_REPOSITORY',
      useClass: AuthRepository,
    },
  ],
})
export class AuthModule {}
