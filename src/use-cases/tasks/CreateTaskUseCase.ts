import { inject, injectable } from 'tsyringe'
import { Task } from 'generated/prisma'
import { ICreateTaskDTO } from 'dtos/ICreateTaskDTO'
import { ITasksRepository } from 'repositories/infra/tasks/ITasksRepository'

@injectable()
class CreateTaskUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ITasksRepository')
    private tasksRepository: ITasksRepository,
  ) {
    /* nothing */
  }

  async execute({ title, description, roomId }: ICreateTaskDTO): Promise<Task> {
    const task = await this.tasksRepository.create({
      title,
      description,
      roomId,
    })

    return task
  }
}

export { CreateTaskUseCase }
