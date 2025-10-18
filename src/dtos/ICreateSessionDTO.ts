interface ICreateSessionDTO {
  userId: string
  token: string
  expiresAt: Date
  createdAt?: Date
  updatedAt?: Date
}

export { ICreateSessionDTO }
