import { PrismaClient } from '../../generated/prisma/client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigProps } from 'src/config/configuration'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    private readonly configService: ConfigService<ConfigProps, true>,
  ) {
    const pool = new Pool({
      connectionString: configService.getOrThrow<string>('dbUrl', {
        infer: true,
      }),
    })
    const adapter = new PrismaPg(pool)
    super({ adapter })
  }
  async onModuleInit() {
    // Với Adapter, Prisma sẽ tự kết nối thông qua Pool của 'pg'
    await this.$connect()
    console.log(process.env.DATABASE_URL)
    console.log('✅ Đã kết nối Postgres Local thành công bằng Driver Adapter!')
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
