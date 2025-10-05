// arcelor-backend/src/utils/db.js
const { PrismaClient } = require('@prisma/client');
const logger = require('./logger');

// Singleton pattern for Prisma Client
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, prevent hot-reload from creating new instances
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    });

    // Log queries in development
    global.prisma.$on('query', (e) => {
      logger.debug('Query: ' + e.query);
      logger.debug('Duration: ' + e.duration + 'ms');
    });
  }
  prisma = global.prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Database connection closed');
});

module.exports = prisma;



