import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { JoinRoomUseCase } from 'use-cases/rooms/JoinRoomUseCase'

export class JoinRoomController {
  async handle(req: Request, res: Response) {
    const { name, roomCode } = req.body

    if (!roomCode) {
      return res.status(400).json({ error: 'Código da sala é obrigatório' })
    }

    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' })
    }

    const joinRoomUseCase = container.resolve(JoinRoomUseCase)

    const objctRetorn = await joinRoomUseCase.execute({
      masterId: undefined,
      code: roomCode,
      name,
    })

    return res.json(objctRetorn)
  }
}
