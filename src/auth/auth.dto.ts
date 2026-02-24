import z from 'zod'
import { RegisterBodySchema, RegisterResSchema, UserSchema } from './auth.model'
import { createZodDto } from 'nestjs-zod'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

export type UserType = z.infer<typeof UserSchema>
