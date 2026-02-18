import { HttpException, HttpStatus } from '@nestjs/common'
import { createZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'
import { ApiError } from '../api/api.respone'

const MyZodValidationPipe = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: ZodError) => {
    console.log(error)
    const errors = error.issues.map((item) => {
      return {
        filed: item.path.join('.'),
        message: item.message,
      }
    })
    const res = ApiError(
      errors,
      HttpStatus.UNPROCESSABLE_ENTITY,
      'Unprocessable Entity',
    )
    return new HttpException(res, HttpStatus.UNPROCESSABLE_ENTITY)
  },
})

export default MyZodValidationPipe
