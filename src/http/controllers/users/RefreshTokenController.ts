import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefreshTokenUserUseCase } from 'use-cases/users/RefreshTokenUseCase'

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    let token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    if (typeof token === 'string' && token.startsWith('Bearer ')) {
      token = token.split(' ')[1]
    }

    const refreshTokenUseCase = container.resolve(RefreshTokenUserUseCase)

    const tokens = await refreshTokenUseCase.execute(token) // retorna { token, refreshToken }

    return response.status(200).json(tokens)
  }
}

export { RefreshTokenController }
