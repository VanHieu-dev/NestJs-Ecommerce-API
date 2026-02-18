import { HttpStatus } from '@nestjs/common'

export const ApiError = (
  errors: any,
  statusCode: HttpStatus,
  message: string,
) => {
  return {
    statusCode,
    errors,
    message,
  }
}
