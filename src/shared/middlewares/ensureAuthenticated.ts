import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from 'repositories/infra/users/repositories/UsersRepository'
import auth from '@config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('Token ausente', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload

    const userRepository = new UsersRepository()

    const user = await userRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não existe!', 401)
    }

    request.user = {
      id: userId,
    }

    next()
  } catch {
    throw new AppError('Token inválido!', 401)
  }
}
