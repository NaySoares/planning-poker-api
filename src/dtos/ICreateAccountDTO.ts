interface ICreateAccountDTO {
  id?: string
  accountId: string
  providerId: string
  userId: string
  accessToken?: string
  refreshToken?: string
  idToken?: string
  accessTokenExpiresAt?: string
  refreshTokenExpiresAt?: string
  scope?: string
  password?: string
  createdAt?: string
  updatedAt?: string
}

export { ICreateAccountDTO }
