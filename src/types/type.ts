import {
  RegisterBodySchema,
  SendOTPBodySchema,
  UserSchema,
  VerificationCodeSchema,
} from 'src/auth/auth.model'
import z from 'zod'
import { TypeOfVerificationCode } from '../shared/constant/constant'
export type UserType = z.infer<typeof UserSchema>
export type UserResponse = Omit<UserType, 'password' | 'totpSecret'>
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>
export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>
export type TypeOfVerificationCodeType =
  (typeof TypeOfVerificationCode)[keyof typeof TypeOfVerificationCode]
