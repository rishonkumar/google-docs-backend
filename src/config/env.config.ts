
if(process.env.NODE_ENV === "undefined" || process.env.HOST === "undefined" || process.env.PORT === "undefined" || process.env.DB_HOST === "undefined" || process.env.DB_PORT === "undefined" || process.env.DB_NAME === "undefined" || process.env.DB_USER === "undefined" || process.env.DB_PASSWORD === "undefined") {

    throw new Error("Environment variables are not defined");
}  

const env = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DATABASE: process.env.DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
}

export default env