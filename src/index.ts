import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { createServer } from 'http'
import cookieSession from 'cookie-session'
import ApiRoutes from './routes'
import { errorHandler, notFound } from './middlewares/error.middleware'
import { log } from './middlewares/logger.middleware'
import { connectDatabase } from './config/db.config'
import { env } from './config/env'
import { initializeSocketIO } from './socket'
import { logger } from './utils/helpers'

const app = express()

app.use(helmet())

// CORS configuration
app.use(cors({
  origin: env.corsOrigin,
  credentials: true
}))

// Body parsing middleware (only once)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Session middleware
app.use(cookieSession({
  name: 'session',
  keys: [env.cookieKey as string],
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  secure: env.nodeEnv === 'production', // Only send over HTTPS in production
  httpOnly: true, // Prevent client-side JS from accessing the cookie
}));

// Request logging middleware (should be before routes)
app.use(log)

// API routes
const api = new ApiRoutes()
app.use('/api', api.router) // Add a prefix to your API routes

// Error handling middleware (should be last)
app.use(notFound)
app.use(errorHandler)

const server = createServer(app)

const start = async () => {
  try {

    await connectDatabase()
    initializeSocketIO(server)

    server.listen(env.port, () => {
      logger.info(`Server is running on port ${env.port}`, 'Server')
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

void start()