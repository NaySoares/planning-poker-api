import { Request, Response, Router } from 'express'

const rentalRoutes = Router()

rentalRoutes.get('/', (req: Request, res: Response) => {
  res.send('Rental')
})

export { rentalRoutes }
