import { prisma } from 'lib/prisma'
import { injectable } from 'tsyringe'
import { ITasksRepository } from '../ITasksRepository'
import { Task } from 'generated/prisma'
import { ICreateTaskDTO } from 'dtos/ICreateTaskDTO'

@injectable()
class TasksRepository implements ITasksRepository {
  async create({ title, description, roomId }: ICreateTaskDTO): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        id: crypto.randomUUID(),
        title,
        description,
        roomId,
      },
    })

    return task
  }

  async delete(id: string): Promise<void> {
    await prisma.task.deleteMany({ where: { id } })
  }

  async findTaskById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    return task || null
  }

  async findTasksByRoomId(roomId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: { roomId },
    })

    return tasks
  }
}

export { TasksRepository }
