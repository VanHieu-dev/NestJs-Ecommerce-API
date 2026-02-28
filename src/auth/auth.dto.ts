import {
  RegisterBodySchema,
  RegisterResSchema,
  SendOTPBodySchema,
} from './auth.model'
import { createZodDto } from 'nestjs-zod'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}
export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}
