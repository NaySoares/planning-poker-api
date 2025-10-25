import { IAccountsRepository } from 'repositories/infra/accounts/IAccountsRepository'
import { AccountsRepository } from 'repositories/infra/accounts/repositories/AccountsRepository'
import { ISessionsRepository } from 'repositories/infra/sessions/ISessionsRepository'
import { SessionsRepository } from 'repositories/infra/sessions/repositories/SessionsRepository'
import { IUsersRepository } from 'repositories/infra/users/IUsersRepository'
import { UsersRepository } from 'repositories/infra/users/repositories/UsersRepository'
import { container } from 'tsyringe'

import '@shared/container/providers'
import { IRoomsRepository } from 'repositories/infra/rooms/IRoomsRepository'
import { RoomsRepository } from 'repositories/infra/rooms/repositories/RoomsRepository'
import { PlayersRepository } from 'repositories/infra/players/repositories/PlayersRepository'
import { IPlayersRepository } from 'repositories/infra/players/IPlayersRepository'
import { ITasksRepository } from 'repositories/infra/tasks/ITasksRepository'
import { TasksRepository } from 'repositories/infra/tasks/repositories/TasksRepository'
import { AvatarsRepository } from 'repositories/infra/avatars/repositories/AccountsRepository'
import { IAvatarsRepository } from 'repositories/infra/avatars/IAvatarsRepository'

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

container.registerSingleton<IRoomsRepository>(
  'IRoomsRepository',
  RoomsRepository,
)

container.registerSingleton<IPlayersRepository>(
  'IPlayersRepository',
  PlayersRepository,
)

container.registerSingleton<ITasksRepository>(
  'ITasksRepository',
  TasksRepository,
)

container.registerSingleton<IAvatarsRepository>(
  'IAvatarsRepository',
  AvatarsRepository,
)
