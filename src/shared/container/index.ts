import { IAccountsRepository } from 'repositories/infra/accounts/IAccountsRepository'
import { AccountsRepository } from 'repositories/infra/accounts/repositories/AccountsRepository'
import { ISessionsRepository } from 'repositories/infra/sessions/ISessionsRepository'
import { SessionsRepository } from 'repositories/infra/sessions/repositories/SessionsRepository'
import { IUsersRepository } from 'repositories/infra/users/IUsersRepository'
import { UsersRepository } from 'repositories/infra/users/repositories/UsersRepository'
import { container } from 'tsyringe'

import '@shared/container/providers'

container.registerSingleton<IUsersRepository>(
  'IUsersRepository',
  UsersRepository,
)

container.registerSingleton<IAccountsRepository>(
  'IAccountsRepository',
  AccountsRepository,
)

container.registerSingleton<ISessionsRepository>(
  'ISessionsRepository',
  SessionsRepository,
)
