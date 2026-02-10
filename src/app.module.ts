import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ShareModule } from './shared/share.module'
import { configuration } from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để dùng ở mọi nơi mà không cần import lại
      envFilePath: '.env', // Đường dẫn file (mặc định là .env)
      load: [configuration],
    }),
    ShareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
