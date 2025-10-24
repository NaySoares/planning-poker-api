import { Task } from 'generated/prisma'
import { ITasksRepository } from 'repositories/infra/tasks/ITasksRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetAllTasksByRoomIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ITasksRepository')
    private tasksRepository: ITasksRepository,
  ) {
    /* nothing */
  }

  async execute({ roomId }: { roomId: string }): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksByRoomId(roomId)

    return tasks
  }
}

export { GetAllTasksByRoomIdUseCase }
