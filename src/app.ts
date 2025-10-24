import 'reflect-metadata'
import '@shared/container'

import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import express, { NextFunction, Request, Response } from 'express'

import { gameSocket } from './sockets/gameSocket'
import { router } from './http/routes'
import { AppError } from '@shared/errors/AppError'

const app = express()
const server = http.createServer(app)

// Configuração do Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'], // frontend Next
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
})

// Eventos de conexão do socket
io.on('connection', (socket) => {
  console.log('🟢 Novo cliente conectado:', socket.id)
  gameSocket(io, socket)
})

// Middlewares Express
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(router)

// Tratamento de erros
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

export { server, io }
