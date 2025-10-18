import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { ISessionsRepository } from 'repositories/infra/sessions/ISessionsRepository'

interface IPayload {
  sub: string
  email: string
}

interface IResponse {
  token: string
  refreshToken: string
}

@injectable()
class RefreshTokenUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ISessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('IDayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {
    /* nothing */
  }

  async execute(refreshToken: string): Promise<IResponse> {
    let decoded: IPayload
    try {
      decoded = verify(refreshToken, auth.secret_refresh_token) as IPayload
    } catch {
      throw new AppError('Refresh token inválido!')
    }

    const userId = decoded.sub
    const email = decoded.email

    const userToken = await this.sessionsRepository.findByUserIdAndRefreshToken(
      userId,
      refreshToken,
    )

    if (!userToken) {
      throw new AppError('Refresh token não encontrado!')
    }

    const newRefreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: userId,
      expiresIn: auth.expires_in_refresh_token as unknown as number,
    })

    const refreshTokenExpiresAt = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days,
    )

    await this.sessionsRepository.create({
      userId,
      token: newRefreshToken,
      expiresAt: refreshTokenExpiresAt,
    })

    const newToken = sign({}, auth.secret_token, {
      subject: userId,
      expiresIn: auth.expires_in_token as unknown as number, // isso não faz sentido, mas o typescript reclama se não fizer assim
    })

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    }
  }
}

export { RefreshTokenUserUseCase }
