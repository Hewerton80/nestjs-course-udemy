module.exports = {
    type: "postgres",
    host : process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    dropSchema: false,
    logging: false,
    migrationsRun: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    cli: {
        migrationsDir: "src/migrations",
    }
}

