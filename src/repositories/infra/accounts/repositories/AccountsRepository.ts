import { prisma } from 'lib/prisma'
import { IAccountsRepository } from '../IAccountsRepository'
import { Account } from 'generated/prisma'
import { injectable } from 'tsyringe'
import { ICreateAccountDTO } from 'dtos/ICreateAccountDTO'
import { hash } from 'bcryptjs'

@injectable()
class AccountsRepository implements IAccountsRepository {
  async create({
    accountId,
    providerId,
    password,
    userId,
  }: ICreateAccountDTO): Promise<Account> {
    const passwordHash = await hash(password, 8)

    const account = await prisma.account.create({
      data: {
        id: crypto.randomUUID(),
        accountId,
        providerId,
        userId,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return account
  }
}

export { AccountsRepository }
