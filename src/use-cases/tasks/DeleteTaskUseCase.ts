import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from 'repositories/infra/tasks/ITasksRepository'

@injectable()
class DeleteTaskUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ITasksRepository')
    private tasksRepository: ITasksRepository,
  ) {
    /* nothing */
  }

  async execute({ taskId }: { taskId: string }): Promise<void> {
    return await this.tasksRepository.delete(taskId)
  }
}

export { DeleteTaskUseCase }
