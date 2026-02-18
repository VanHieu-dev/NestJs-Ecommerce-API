import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ShareModule } from './shared/share.module'
import { configuration } from './config/configuration'
import { AuthModule } from './auth/auth.module'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import MyZodValidationPipe from './shared/pipes/custom-validation-zod.pipes'
import { HttpExceptionFilter } from './shared/filters/http-exception.filter'
import { UserModule } from './users/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để dùng ở mọi nơi mà không cần import lại
      envFilePath: '.env', // Đường dẫn file (mặc định là .env)
      load: [configuration],
    }),
    ShareModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: MyZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
