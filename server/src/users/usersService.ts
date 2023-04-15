import { User, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'name' | 'email' | 'rfidCard'>

export default {
  getAll: async (): Promise<User[]> => {
    return await prisma.user.findMany()
  },

  get: async (id: number): Promise<User | null> => {
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    })
  },

  create: async (userCreationParams: UserCreationParams): Promise<User> => {
    return await prisma.user.create({
      data: userCreationParams,
    })
  },
}
