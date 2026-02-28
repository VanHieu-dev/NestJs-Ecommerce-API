import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { EmailService } from './services/email.service'

@Global()
@Module({
  imports: [],
  providers: [PrismaService, EmailService],
  exports: [PrismaService, EmailService],
})
export class ShareModule {}
