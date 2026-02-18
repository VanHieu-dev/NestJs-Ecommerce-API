import { createZodDto } from 'nestjs-zod'
import { UserStatus } from 'src/generated/prisma/enums'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  avatar: z.string().nullable(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
  roleId: z.number(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const RegisterBodySchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3).max(10),
    password: z.string().min(6),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(9).max(10),
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirmPassword must match',
        path: ['confirmPassword'],
      })
    }
  })

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResDTO extends createZodDto(UserSchema) {}
export type UserResponse = z.infer<typeof UserSchema>
