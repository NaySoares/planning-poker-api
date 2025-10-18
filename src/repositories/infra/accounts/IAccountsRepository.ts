import { ICreateAccountDTO } from 'dtos/ICreateAccountDTO'
import { Account } from 'generated/prisma/wasm'

interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<Account>
}

export { IAccountsRepository }
