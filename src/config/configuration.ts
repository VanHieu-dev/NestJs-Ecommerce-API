export const configuration = () =>
  ({
    port: parseInt(`${process.env.PORT}`, 10) || 3000,
    dbUrl: process.env.DATABASE_URL as string,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPhone: process.env.ADMIN_PHONE_NUMBER,
  }) as const
export type ConfigProps = ReturnType<typeof configuration>
