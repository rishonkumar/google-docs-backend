declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: "development" | "test" | "production",
            HOST?: string,
            PORT?: string,
            DATABASE_URL?: string,
            USER?: string,
            PASSWORD?: string,
            DB_HOST?: string,
            DB_PORT?: string,
            DATABASE_?: string
        }
    }
}