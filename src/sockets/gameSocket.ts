import { Server, Socket } from 'socket.io'
import { joinRoomHandler } from './joinRoomHandler'
import { taskAddHandler } from './taskAddHandler'
import { voteSendHandler } from './voteSendHandler'
import { voteRevealHandler } from './voteRevealHandler'
import { playerKickHandler } from './playerKickHandler'
import { playerDisconnectHandler } from './playerDisconnectHandler'
import { taskRemoveHandler } from './taskRemoveHandler'
import { playerMakerMasterHandler } from './playerMakerMasterHandler'

export function gameSocket(io: Server, socket: Socket) {
  console.log('🧩 New connection:', socket.id)

  // Room Handlers
  joinRoomHandler(socket, io)
  playerMakerMasterHandler(socket, io)

  // Task Handlers
  taskAddHandler(socket, io)
  taskRemoveHandler(socket, io)

  // Voting Handlers
  voteSendHandler(socket, io)
  voteRevealHandler(socket, io)

  // Player Handlers
  playerKickHandler(socket, io)
  playerDisconnectHandler(socket, io)
}
