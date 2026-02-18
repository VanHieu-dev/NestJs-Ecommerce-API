import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.services'

@Global()
@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class ShareModule {}
