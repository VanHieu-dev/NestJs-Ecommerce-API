import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
  ) {}
  findAll() {
    return this.userRepo.findAll()
  }
  async getUserById(id: number) {
    const result = await this.userRepo.findUserById(id)
    if (!result) {
      throw new NotFoundException('User khong ton tai')
    }
    return result
  }
}
