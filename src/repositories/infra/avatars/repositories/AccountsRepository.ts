import { IAvatarsRepository } from '../IAvatarsRepository'
import { injectable } from 'tsyringe'
import path from 'path'

@injectable()
class AvatarsRepository implements IAvatarsRepository {
  async getRandomAvatar(): Promise<string> {
    const randomNumber = Math.floor(Math.random() * 3) + 1
    const filename = `avatar_0${randomNumber}.jpg`

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'files',
      filename,
    )

    return filePath
  }
}

export { AvatarsRepository }
