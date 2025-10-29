import { ICreateTaskDTO } from 'dtos/ICreateTaskDTO'
import { Task } from 'generated/prisma/edge'

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>
  findTaskById(id: string): Promise<Task | null>
  findTasksByRoomId(roomId: string): Promise<Task[]>
  delete(taskId: string): Promise<void>
}

export { ITasksRepository }
