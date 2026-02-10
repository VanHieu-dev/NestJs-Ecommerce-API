import { Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.services'

@Module({
  imports: [],
  providers: [PrismaService],
})
export class ShareModule {}
