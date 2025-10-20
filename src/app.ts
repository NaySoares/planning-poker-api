import 'reflect-metadata'
import '@shared/container'

import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { gameSocket } from './sockets/gameSocket'

import express, { NextFunction, Request, Response } from 'express'

import { router } from './http/routes'
import { AppError } from '@shared/errors/AppError'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' },
})

io.on('connection', (socket) => gameSocket(io, socket))

app.use(cors())
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
