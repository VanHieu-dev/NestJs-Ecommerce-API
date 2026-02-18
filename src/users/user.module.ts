import { Module } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
    UserService,
  ],
})
export class UserModule {}
