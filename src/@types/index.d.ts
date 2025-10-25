import { Prisma } from 'generated/prisma'

export type RoomWithRelations = Prisma.RoomGetPayload<{
  include: { players: true; tasks: true }
}> & { playerId?: string }
