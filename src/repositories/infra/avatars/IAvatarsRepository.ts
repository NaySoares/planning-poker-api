interface IAvatarsRepository {
  getRandomAvatar(): Promise<string>
}

export { IAvatarsRepository }
