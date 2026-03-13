require('dotenv').config();
const path = require('path');

const isProd = process.env.ENVIRONMENT === 'production';

const connection = isProd
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      port: Number(process.env.DB_PORT) || 5432,
    };

// Caminho absoluto para migrations (ESSENCIAL)
const migrationsDir = path.resolve(__dirname, 'db/migrations');

module.exports = {
  development: {
    client: 'pg',
    connection,
    migrations: {
      directory: migrationsDir,
    },
  },
  production: {
    client: 'pg',
    connection,
    migrations: {
      directory: migrationsDir,
    },
  },
};
