import { ICreateTaskDTO } from 'dtos/ICreateTaskDTO'
import { Task } from 'generated/prisma/edge'

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>
  delete(id: string): Promise<void>
  findTaskById(id: string): Promise<Task | null>
  findTasksByRoomId(roomId: string): Promise<Task[]>
}

export { ITasksRepository }
