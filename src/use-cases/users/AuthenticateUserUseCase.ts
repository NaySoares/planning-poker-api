import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from 'repositories/infra/users/IUsersRepository'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { ISessionsRepository } from 'repositories/infra/sessions/ISessionsRepository'

interface IResponse {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

interface IRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ISessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('IDayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {
    /* nothing */
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Email ou Senha incorretos!')
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new AppError('Email ou Senha incorretos!')
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token as unknown as number, // isso não faz sentido, mas o typescript reclama se não fizer assim
    })

    const refreshTokenExpiresAt = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days,
    )

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token as unknown as number,
    })

    await this.sessionsRepository.create({
      userId: user.id,
      refreshToken,
      expiresAt: refreshTokenExpiresAt,
    })

    const dataReturn: IResponse = {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }

    return dataReturn
  }
}

export { AuthenticateUserUseCase }
