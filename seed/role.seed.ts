import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'
import { hash } from '../src/utils/password'
import { PrismaClient } from 'src/generated/prisma/client'
import { RoleName } from 'src/shared/constant/constant'

// 1. Load biến môi trường
dotenv.config()

// 2. Khởi tạo kết nối (vì bạn dùng Adapter nên bắt buộc phải có bước này)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const main = async () => {
  const roles = await prisma.role.createMany({
    data: [
      { name: RoleName.Admin, description: 'Admin role' },
      { name: RoleName.Client, description: 'Client role' },
      { name: RoleName.Seller, description: 'Seller role' },
    ],
  })

  // BƯỚC 3: Lấy ra Admin Role vừa tạo để lấy ID gán cho User
  const adminRole = await prisma.role.findFirstOrThrow({
    where: { name: RoleName.Admin },
  })

  console.log('👤 Creating admin user...')
  // BƯỚC 4: Băm mật khẩu và tạo Admin
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'
  const hashedPassword = await hash(adminPassword)

  const adminUser = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
      name: process.env.ADMIN_NAME || 'System Admin',
      phoneNumber: process.env.ADMIN_PHONE_NUMBER || '0123456789',
      roleId: adminRole.id,
      status: 'ACTIVE',
    },
  })

  return {
    createdRoleCount: roles.count,
    adminUser,
  }
}

main()
  .then(({ adminUser, createdRoleCount }) => {
    if (createdRoleCount > 0) {
      console.log(`✅ Created ${createdRoleCount} roles`)
      console.log(`✅ Created admin user: ${adminUser?.email}`)
    }
  })
  .catch((err) => {
    console.error('❌ Seed error:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
