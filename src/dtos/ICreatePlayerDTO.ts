interface ICreatePlayerDTO {
  name: string
  avatar: string
  isMaster: boolean
  roomId: string
  socketId: string
  isOnline?: boolean
}

export { ICreatePlayerDTO }
