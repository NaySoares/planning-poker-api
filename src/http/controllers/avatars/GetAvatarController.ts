import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAvatarUseCase } from 'use-cases/avatars/GetAvatarUseCase'

export class GetAvatarController {
  async handle(req: Request, res: Response) {
    const getAvatarUseCase = container.resolve(GetAvatarUseCase)

    const avatar = await getAvatarUseCase.execute()

    return res.sendFile(avatar)
  }
}
