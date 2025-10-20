import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRoomUseCase } from 'use-cases/rooms/CreateRoomUseCase'

export class CreateRoomController {
  async handle(req: Request, res: Response) {
    const { masterId } = req.body

    if (!masterId) {
      return res.status(400).json({ error: 'masterId é obrigatório' })
    }

    const createRoomUseCase = container.resolve(CreateRoomUseCase)

    const room = await createRoomUseCase.execute({
      masterId,
    })

    return res.status(201).json(room)
  }
}
