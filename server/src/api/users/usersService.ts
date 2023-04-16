import { AccessToken, User } from '@prisma/client'
import prisma from '../../prismaClient'
import bcrypt from 'bcrypt'
import { authScopes, makeJwtToken } from '../../authentication'

// A post request should not contain an id.
export type UserCreationParams = Pick<
  User,
  'name' | 'email' | 'rfidCard' | 'password'
>

export type UserAuthorizationParams = {
  email: string
  password: string
}

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

  authorize: async (
    userAuthParams: UserAuthorizationParams
  ): Promise<AccessToken | null> => {
    const user = await prisma.user.findFirst({
      where: {
        email: userAuthParams.email,
      },
    })

    if (user == null) return null

    const passwordMatch = await bcrypt.compare(
      userAuthParams.password,
      user.password
    )
    if (!passwordMatch) return null

    // +24 hours
    const expire = new Date(Date.now() + 86400 * 1000)

    const jwtToken = makeJwtToken(user.id, authScopes.user, '1d')

    const authToken = await prisma.accessToken.create({
      data: {
        expire: expire,
        token: jwtToken,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return authToken
  },
}
