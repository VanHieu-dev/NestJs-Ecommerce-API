export const configuration = () =>
  ({
    port: parseInt(`${process.env.PORT}`, 10) || 3000,
    dbUrl: process.env.DATABASE_URL as string,
  }) as const
export type ConfigProps = ReturnType<typeof configuration>
