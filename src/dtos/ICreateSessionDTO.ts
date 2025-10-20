interface ICreateSessionDTO {
  userId: string
  refreshToken: string
  expiresAt: Date
  createdAt?: Date
  updatedAt?: Date
}

export { ICreateSessionDTO }
