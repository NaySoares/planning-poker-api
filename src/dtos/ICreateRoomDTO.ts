interface ICreateRoomDTO {
  name?: string // necessário para dar join na sala
  email?: string
  password?: string
  masterId?: string
  code?: string
}

export { ICreateRoomDTO }
