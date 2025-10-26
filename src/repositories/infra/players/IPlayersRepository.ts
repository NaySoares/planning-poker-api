import { ICreatePlayerDTO } from 'dtos/ICreatePlayerDTO'
import { Player } from 'generated/prisma/edge'

interface IPlayersRepository {
  create(data: ICreatePlayerDTO): Promise<Player>
  delete(id: string): Promise<void>
  findPlayerById(id: string): Promise<Player | null>
  findPlayersByRoomId(roomId: string): Promise<Player[]>
  findPlayersByRoomCode(roomCode: string): Promise<Player[]>
  updateVote(playerId: string, value: number): Promise<void>
  markAsOffline(socketId: string): Promise<void>
  updateByPlayerId(
    playerId: string,
    data: Partial<ICreatePlayerDTO>,
  ): Promise<Player>
}

export { IPlayersRepository }
