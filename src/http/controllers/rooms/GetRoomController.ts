import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetRoomUseCase } from 'use-cases/rooms/GetRoomUseCase'

export class GetRoomController {
  async handle(req: Request, res: Response) {
    const { code } = req.params

    if (!code) {
      return res.status(400).json({ error: 'code é obrigatório' })
    }

    const getRoomUseCase = container.resolve(GetRoomUseCase)

    const room = await getRoomUseCase.execute({
      masterId: undefined,
      code,
    })

    return res.json(room)
  }
}
