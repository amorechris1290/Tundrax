export default () => ({
  database: {
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    logging: process.env.POSTGRESQL_DB_LOGGING === 'true',
    max: process.env.DATABASE_POOL_MAX,
    min: process.env.DATABASE_POOL_MIN,
    synchronize: process.env.DATABASE_SYNCHRONIZE,
  },
});
