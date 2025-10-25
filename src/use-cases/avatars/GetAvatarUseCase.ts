import { inject, injectable } from 'tsyringe'
import { IAvatarsRepository } from 'repositories/infra/avatars/IAvatarsRepository'
import fs from 'fs'
import { AppError } from '@shared/errors/AppError'

@injectable()
class GetAvatarUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('IAvatarsRepository')
    private avatarsRepository: IAvatarsRepository,
  ) {
    /* nothing */
  }

  async execute(): Promise<string> {
    const filePath = await this.avatarsRepository.getRandomAvatar()

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new AppError('Avatar não encontrado')
    }

    return filePath
  }
}

export { GetAvatarUseCase }
