import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto'
import { ZodResponse } from 'nestjs-zod'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ZodResponse({ type: RegisterResDTO })
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }
}
