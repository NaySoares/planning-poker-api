import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from 'use-cases/users/CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUsersUseCase = container.resolve(CreateUserUseCase)

    const user = await createUsersUseCase.execute({
      name,
      email,
      password,
    })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
