import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRoomUseCase } from 'use-cases/rooms/CreateRoomUseCase'

export class CreateRoomController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' })
    }

    if (!password) {
      return res.status(400).json({ error: 'Senha é obrigatória' })
    }

    const createRoomUseCase = container.resolve(CreateRoomUseCase)

    const response = await createRoomUseCase.execute({
      email,
      password,
    })

    return res.status(201).json(response)
  }
}
