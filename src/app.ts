import 'reflect-metadata'
import '@shared/container'

import express, { NextFunction, Request, Response } from 'express'

import { router } from './http/routes'
import { AppError } from '@shared/errors/AppError'

const app = express()

// Cors
app.use((request: Request, response: Response, next: NextFunction) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Accept',
  )
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE',
  )
  next()
})

app.use(express.json())
app.use(router)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      })
    }

    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error = ${err.message}`,
    })
  },
)

export { app }
